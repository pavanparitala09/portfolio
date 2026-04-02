import React from 'react';
import { FiCode, FiLayers, FiZap, FiAward } from 'react-icons/fi';
import profileImg from '../assets/profile.jpg';
import './About.css';

const stats = [
  { icon: <FiCode />, value: '5+', label: 'Projects Built' },
  { icon: <FiLayers />, value: 'Full', label: 'Stack Developer' },
  { icon: <FiZap />, value: '100%', label: 'Passion' },
  { icon: <FiAward />, value: 'CS', label: 'Student' },
];

const About = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// about me</span>
          <h2 className="section-title">
            Who Am <span>I?</span>
          </h2>
          <div className="accent-line" />
        </div>

        <div className="about-grid">
          {/* Left - profile photo + stats */}
          <div className="about-photo-col">
            <div className="about-photo-wrapper">
              <img
                src={profileImg}
                alt="Paritala Pavan Kumar"
                className="about-photo"
              />
              <div className="about-photo-accent" />
            </div>

            <div className="stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - content */}
          <div className="about-text">
            <div className="about-tag">
              <span className="tag-bracket">&lt;</span> Developer <span className="tag-bracket">/&gt;</span>
            </div>
            <h3 className="about-headline">
              Passionate about building <span>impactful</span> digital experiences
            </h3>
            <p className="about-para">
              I'm <strong>Paritala Pavan Kumar</strong>, a Computer Science student and
              passionate Full Stack Developer. I love turning complex problems into
              elegant, user-friendly solutions using modern web technologies.
            </p>
            <p className="about-para">
              From crafting responsive frontends with React to architecting robust
              backend systems with Node.js and MongoDB, I thrive across the entire
              web stack. I'm always eager to learn new technologies and best practices.
            </p>
            <p className="about-para">
              When I'm not coding, I enjoy exploring open-source projects, contributing
              to developer communities, and continuously sharpening my problem-solving skills.
            </p>

            <div className="about-code-block">
              <div className="code-header">
                <span className="code-dot red" />
                <span className="code-dot yellow" />
                <span className="code-dot green" />
                <span className="code-filename">about.json</span>
              </div>
              <pre className="code-content">
{`{
  "name": "Paritala Pavan Kumar",
  "role": "Full Stack Developer",
  "status": "Student",
  "location": "India",
  "projects": 5,
  "available": true
}`}
              </pre>
            </div>

            <div className="about-cta">
              <a href="/resume.pdf" className="btn btn-primary" download>
                Download Resume
              </a>
              <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
                Let's Talk
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
