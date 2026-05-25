import React, { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import './Projects.css';

const FILTERS = ['all', 'web', 'mobile'];

const Projects = () => {
  const [active, setActive] = useState('all');
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public/projects');
        const data = await res.json();
        setAllProjects(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  const filtered =
    active === 'all'
      ? allProjects
      : allProjects.filter((p) => p.category === active);

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
            <div key={p._id || p.id} className={`project-card ${p.featured ? 'featured' : ''}`}>
              {p.featured && <span className="featured-badge">Featured</span>}
              {p.image && (
                <div className="project-image-wrap">
                  <img src={p.image} alt={p.title} className="project-image" />
                </div>
              )}
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
                {p.tags && p.tags.map((t) => (
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
