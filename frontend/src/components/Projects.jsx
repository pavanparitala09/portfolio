import React, { useState } from 'react';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import './Projects.css';

const FILTERS = ['all', 'web', 'mobile'];

const ALL_PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration using Stripe.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    category: 'web',
    github: 'https://github.com/pavankumarparitala2580',
    live: '',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, drag-and-drop functionality, and team workspaces.',
    tags: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    category: 'web',
    github: 'https://github.com/pavankumarparitala2580',
    live: '',
    featured: true,
  },
  {
    id: 3,
    title: 'Food Delivery App',
    description:
      'A React Native mobile app for food ordering with real-time order tracking, restaurant listings, and integrated payment gateway.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Google Maps API'],
    category: 'mobile',
    github: 'https://github.com/pavankumarparitala2580',
    live: '',
    featured: false,
  },
  {
    id: 4,
    title: 'Student Result Portal',
    description:
      'A web portal for students to view exam results, track academic performance, and download grade cards with admin management.',
    tags: ['React', 'Express', 'MongoDB', 'JWT', 'PDF'],
    category: 'web',
    github: 'https://github.com/pavankumarparitala2580',
    live: '',
    featured: false,
  },
  {
    id: 5,
    title: 'Fitness Tracker Mobile App',
    description:
      'A cross-platform mobile application to track workouts, log daily nutrition, view progress charts, and set fitness goals.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Charts'],
    category: 'mobile',
    github: 'https://github.com/pavankumarparitala2580',
    live: '',
    featured: false,
  },
];

const Projects = () => {
  const [active, setActive] = useState('all');

  const filtered =
    active === 'all'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// my work</span>
          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>
          <div className="accent-line" />
        </div>

        {/* Filter tabs */}
        <div className="filter-tabs">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${active === f ? 'active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f === 'all' ? 'All' : f === 'web' ? 'Web' : 'Mobile'}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects-grid">
          {filtered.map((p) => (
            <div key={p.id} className={`project-card ${p.featured ? 'featured' : ''}`}>
              {p.featured && <span className="featured-badge">Featured</span>}
              <div className="project-header">
                <div className="project-icon">
                  <FiCode />
                </div>
                <div className="project-links">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                      title="GitHub"
                    >
                      <FiGithub />
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                      title="Live Demo"
                    >
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.description}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span key={t} className="project-tag">
                    {t}
                  </span>
                ))}
              </div>

              {/* Visible action buttons at the bottom */}
              <div className="project-actions">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-action-btn github-btn"
                  >
                    <FiGithub /> GitHub
                  </a>
                )}
                {p.live ? (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="project-action-btn live-btn"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                ) : (
                  <span className="project-action-btn live-btn disabled">
                    <FiExternalLink /> Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
