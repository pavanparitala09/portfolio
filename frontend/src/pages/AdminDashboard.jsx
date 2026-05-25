import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <span className="logo-bracket">&lt;</span>
            Dev
            <span className="logo-bracket">/&gt;</span>
          </div>
          <p>Admin Portal</p>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin/messages" className={({isActive}) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
            Messages
          </NavLink>
          <NavLink to="/admin/bio" className={({isActive}) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
            Manage Bio
          </NavLink>
          <NavLink to="/admin/projects" className={({isActive}) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
            Manage Projects
          </NavLink>
          <NavLink to="/admin/skills" className={({isActive}) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
            Manage Skills
          </NavLink>
        </nav>
        <div className="admin-sidebar-actions">
          <button onClick={handleLogout} className="btn btn-outline logout-btn">Logout</button>
          <button onClick={() => navigate('/')} className="btn btn-primary back-home-btn">Go to Portfolio</button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
