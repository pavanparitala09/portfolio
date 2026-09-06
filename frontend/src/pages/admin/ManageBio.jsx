import React, { useEffect, useState } from 'react';
import { API_BASE_URL, getImageUrl } from '../../config/api';

const ManageBio = () => {
  const [bio, setBio] = useState({
    name: '',
    roles: '',
    description: '',
    aboutHeadline: '',
    aboutPara1: '',
    aboutPara2: '',
    aboutPara3: '',
    email: '',
    github: '',
    linkedin: '',
    avatar: ''
  });
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(''); // 'loading' | 'success' | 'error'

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/public/bio`);
        const data = await res.json();
        if (data && data.name) {
          setBio({
            ...data,
            roles: data.roles ? data.roles.join(', ') : '',
            avatar: data.avatar || ''
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBio();
  }, []);

  const handleChange = (e) => {
    setBio({ ...bio, [e.target.name]: e.target.value });
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
        setBio((prev) => ({ ...prev, avatar: data.imageUrl }));
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
    setMessage('');
    try {
      const token = localStorage.getItem('adminToken');
      const payload = { ...bio, roles: bio.roles.split(',').map((r) => r.trim()) };
      const res = await fetch(`${API_BASE_URL}/api/admin/bio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setMessage('Bio updated successfully!');
      } else {
        setMessage('Failed to update bio.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error updating bio.');
    }
  };

  return (
    <div>
      <h2>Manage Bio & Hero</h2>
      <div className="admin-card">
        {message && <p style={{ color: 'green', marginBottom: '10px' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Profile Picture (Cloudinary)</label>
            <div className="file-upload-wrapper">
              <div className="image-preview-box">
                {bio.avatar ? (
                  <img src={getImageUrl(bio.avatar)} alt="Profile Preview" />
                ) : (
                  <div className="image-preview-placeholder">No photo uploaded</div>
                )}
              </div>
              <div style={{ flexGrow: 1 }}>
                <input
                  type="text"
                  name="avatar"
                  value={bio.avatar || ''}
                  onChange={handleChange}
                  className="admin-form-input"
                  placeholder="Image URL or upload file below..."
                />
                <div className="file-upload-btn-container" style={{ marginTop: '8px' }}>
                  <div className="file-upload-btn" style={{ padding: '10px 14px', cursor: 'pointer' }}>
                    {uploading ? 'Uploading to Cloudinary...' : 'Choose Profile Picture'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      style={{ opacity: 0, position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                    />
                  </div>
                </div>
                {uploadStatus === 'loading' && <p className="upload-status loading">Uploading to Cloudinary...</p>}
                {uploadStatus === 'success' && <p className="upload-status success">Uploaded to Cloudinary successfully!</p>}
                {uploadStatus === 'error' && <p className="upload-status error">Upload failed. Please try again.</p>}
              </div>
            </div>
          </div>

          <div className="admin-form-group">
            <label>Name</label>
            <input type="text" name="name" value={bio.name} onChange={handleChange} className="admin-form-input" required />
          </div>
          <div className="admin-form-group">
            <label>Roles (comma separated for typing effect)</label>
            <input type="text" name="roles" value={bio.roles} onChange={handleChange} className="admin-form-input" />
          </div>
          <div className="admin-form-group">
            <label>Hero Description</label>
            <textarea name="description" value={bio.description} onChange={handleChange} className="admin-form-input" rows="3" />
          </div>
          <div className="admin-form-group">
            <label>About Headline</label>
            <input type="text" name="aboutHeadline" value={bio.aboutHeadline} onChange={handleChange} className="admin-form-input" />
          </div>
          <div className="admin-form-group">
            <label>About Paragraph 1</label>
            <textarea name="aboutPara1" value={bio.aboutPara1} onChange={handleChange} className="admin-form-input" rows="3" />
          </div>
          <div className="admin-form-group">
            <label>About Paragraph 2</label>
            <textarea name="aboutPara2" value={bio.aboutPara2} onChange={handleChange} className="admin-form-input" rows="3" />
          </div>
          <div className="admin-form-group">
            <label>About Paragraph 3</label>
            <textarea name="aboutPara3" value={bio.aboutPara3} onChange={handleChange} className="admin-form-input" rows="3" />
          </div>
          <div className="admin-form-group">
            <label>Email</label>
            <input type="email" name="email" value={bio.email} onChange={handleChange} className="admin-form-input" />
          </div>
          <div className="admin-form-group">
            <label>GitHub URL</label>
            <input type="text" name="github" value={bio.github} onChange={handleChange} className="admin-form-input" />
          </div>
          <div className="admin-form-group">
            <label>LinkedIn URL</label>
            <input type="text" name="linkedin" value={bio.linkedin} onChange={handleChange} className="admin-form-input" />
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ManageBio;
