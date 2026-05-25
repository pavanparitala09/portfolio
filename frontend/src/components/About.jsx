import React, { useState, useEffect } from 'react';
import { FiCode, FiLayers, FiZap, FiAward } from 'react-icons/fi';
import profileImg from '../assets/profile.jpg';
import './About.css';

const stats = [
  { icon: <FiCode />, value: '5+', label: 'Projects Built' },
  { icon: <FiLayers />, value: 'Full', label: 'Stack Developer' },
  { icon: <FiZap />, value: '100%', label: 'Passion' },
  { icon: <FiAward />, value: 'IT', label: 'Student' },
];

const About = () => {
  const [bio, setBio] = useState(null);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public/bio');
        const data = await res.json();
        setBio(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBio();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  if (!bio) return null;

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
                alt={bio.name}
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
              {bio.aboutHeadline ? (
                <>
                  {bio.aboutHeadline.split(' ').map((word, i, arr) => 
                    i === Math.floor(arr.length / 2) ? <span key={i}>{word} </span> : word + ' '
                  )}
                </>
              ) : (
                <>Passionate about building <span>impactful</span> digital experiences</>
              )}
            </h3>
            
            {bio.aboutPara1 && <p className="about-para" dangerouslySetInnerHTML={{__html: bio.aboutPara1.replace(bio.name, `<strong>${bio.name}</strong>`)}}></p>}
            {bio.aboutPara2 && <p className="about-para">{bio.aboutPara2}</p>}
            {bio.aboutPara3 && <p className="about-para">{bio.aboutPara3}</p>}

            <div className="about-code-block">
              <div className="code-header">
                <span className="code-dot red" />
                <span className="code-dot yellow" />
                <span className="code-dot green" />
                <span className="code-filename">about.json</span>
              </div>
              <pre className="code-content">
{`{
  "name": "${bio.name}",
  "role": "${bio.roles && bio.roles[0] ? bio.roles[0] : 'Developer'}",
  "location": "Hyderabad",
  "projects": "5+",
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
