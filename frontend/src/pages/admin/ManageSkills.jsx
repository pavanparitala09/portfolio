import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/api';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    category: '', iconName: 'FiLayout', itemsText: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/public/skills`);
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    // Parse itemsText to array of objects
    // Format expected: React:85, Node.js:80
    const items = formData.itemsText.split(',').map(item => {
      const [name, level] = item.split(':');
      return { name: name.trim(), level: parseInt(level) || 0 };
    });

    const payload = { category: formData.category, iconName: formData.iconName, items };
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_BASE_URL}/api/admin/skills/${editingId}` : `${API_BASE_URL}/api/admin/skills`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setFormData({ category: '', iconName: 'FiLayout', itemsText: '' });
        setEditingId(null);
        fetchSkills();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    const itemsText = skill.items.map(i => `${i.name}:${i.level}`).join(', ');
    setFormData({
      category: skill.category,
      iconName: skill.iconName,
      itemsText
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/skills/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ category: '', iconName: 'FiLayout', itemsText: '' });
  };

  return (
    <div>
      <h2>Manage Skills</h2>
      <div className="admin-card">
        <h3>{editingId ? 'Edit Skill Category' : 'Add New Category'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Category Name</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="admin-form-input" required />
          </div>
          <div className="admin-form-group">
            <label>Icon Component Name (e.g., FiLayout, FiDatabase, FiServer, FiTerminal)</label>
            <input type="text" name="iconName" value={formData.iconName} onChange={handleChange} className="admin-form-input" required />
          </div>
          <div className="admin-form-group">
            <label>Skills (Format: Name:Level, Name:Level)</label>
            <textarea name="itemsText" value={formData.itemsText} onChange={handleChange} className="admin-form-input" rows="3" placeholder="React:85, JavaScript:90" required />
          </div>
          <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'} Category</button>
          {editingId && <button type="button" className="btn btn-outline" onClick={cancelEdit} style={{marginLeft: '10px'}}>Cancel</button>}
        </form>
      </div>

      <div className="admin-card">
        <h3>Existing Skill Categories</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Icon</th>
              <th>Items Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map(s => (
              <tr key={s._id}>
                <td>{s.category}</td>
                <td>{s.iconName}</td>
                <td>{s.items?.length || 0}</td>
                <td>
                  <button className="admin-action-btn edit-btn" onClick={() => handleEdit(s)}>Edit</button>
                  <button className="admin-action-btn delete-btn" onClick={() => handleDelete(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSkills;
