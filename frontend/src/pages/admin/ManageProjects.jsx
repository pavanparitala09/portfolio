import React, { useEffect, useState } from 'react';
import { API_BASE_URL, getImageUrl } from '../../config/api';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', tags: '', category: 'web', image: '', github: '', live: '', featured: false
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(''); // 'success', 'error', or 'loading'

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/public/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('adminToken');
    const uploadData = new FormData();
    uploadData.append('image', file);

    setUploading(true);
    setUploadStatus('loading');

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData
      });

      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, image: data.imageUrl }));
        setUploadStatus('success');
      } else {
        setUploadStatus('error');
        alert(data.msg || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const payload = { ...formData, tags: formData.tags.split(',').map(t => t.trim()) };
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_BASE_URL}/api/admin/projects/${editingId}` : `${API_BASE_URL}/api/admin/projects`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setFormData({ title: '', description: '', tags: '', category: 'web', image: '', github: '', live: '', featured: false });
        setEditingId(null);
        setUploadStatus('');
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      ...project,
      tags: project.tags.join(', ')
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', tags: '', category: 'web', image: '', github: '', live: '', featured: false });
    setUploadStatus('');
  };

  return (
    <div>
      <h2>Manage Projects</h2>
      <div className="admin-card">
        <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="admin-form-input" required />
          </div>
          <div className="admin-form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="admin-form-input" required rows="3" />
          </div>
          <div className="admin-form-group">
            <label>Tags (comma separated)</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="admin-form-input" />
          </div>
          <div className="admin-form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="admin-form-input">
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label>Project Image</label>
            <div className="file-upload-wrapper">
              <div className="image-preview-box">
                {formData.image ? (
                  <img src={getImageUrl(formData.image)} alt="Preview" />
                ) : (
                  <div className="image-preview-placeholder">No image selected</div>
                )}
              </div>
              <div style={{ flexGrow: 1 }}>
                <input 
                  type="text" 
                  name="image" 
                  value={formData.image} 
                  onChange={handleChange} 
                  className="admin-form-input" 
                  placeholder="Image URL or upload file below..."
                />
                <div className="file-upload-btn-container" style={{ marginTop: '8px' }}>
                  <div className="file-upload-btn" style={{ padding: '10px 14px', cursor: 'pointer' }}>
                    {uploading ? 'Uploading...' : 'Choose Local Image'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      disabled={uploading} 
                      style={{ opacity: 0, position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                    />
                  </div>
                </div>
                {uploadStatus === 'loading' && <p className="upload-status loading">Uploading your file...</p>}
                {uploadStatus === 'success' && <p className="upload-status success">Uploaded successfully!</p>}
                {uploadStatus === 'error' && <p className="upload-status error">Upload failed. Please try again.</p>}
              </div>
            </div>
          </div>
          <div className="admin-form-group">
            <label>GitHub Link</label>
            <input type="text" name="github" value={formData.github} onChange={handleChange} className="admin-form-input" />
          </div>
          <div className="admin-form-group">
            <label>Live Link</label>
            <input type="text" name="live" value={formData.live} onChange={handleChange} className="admin-form-input" />
          </div>
          <div className="admin-form-group">
            <label>
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
              {' '} Featured Project
            </label>
          </div>
          <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'} Project</button>
          {editingId && <button type="button" className="btn btn-outline" onClick={cancelEdit} style={{marginLeft: '10px'}}>Cancel</button>}
        </form>
      </div>

      <div className="admin-card">
        <h3>Existing Projects</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>{p.featured ? 'Yes' : 'No'}</td>
                <td>
                  <button className="admin-action-btn edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="admin-action-btn delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProjects;
