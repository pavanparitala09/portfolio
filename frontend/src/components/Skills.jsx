import React, { useState, useEffect } from 'react';
import {
  FiCode, FiDatabase, FiServer, FiGlobe,
  FiGitBranch, FiSmartphone, FiLayout, FiTerminal
} from 'react-icons/fi';
import './Skills.css';

const iconMap = {
  FiLayout: <FiLayout />,
  FiServer: <FiServer />,
  FiDatabase: <FiDatabase />,
  FiTerminal: <FiTerminal />,
  FiCode: <FiCode />,
  FiGlobe: <FiGlobe />,
  FiGitBranch: <FiGitBranch />,
  FiSmartphone: <FiSmartphone />
};

const techTags = [
  'React', 'Node.js', 'MongoDB', 'Express', 'JavaScript',
  'HTML5', 'CSS3', 'Git', 'REST API', 'Python', 'React Native', 'MySQL',
];

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public/skills');
        const data = await res.json();
        setSkills(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// my skills</span>
          <h2 className="section-title">
            Tech <span>Stack</span>
          </h2>
          <div className="accent-line" />
        </div>

        {/* Skill categories */}
        <div className="skills-grid">
          {skills.map((group, i) => (
            <div key={i} className="skill-group">
              <div className="skill-group-header">
                <span className="skill-group-icon">
                  {iconMap[group.iconName] || <FiCode />}
                </span>
                <h3 className="skill-group-title">{group.category}</h3>
              </div>
              <div className="skill-bars">
                {group.items.map((skill, j) => (
                  <div key={j} className="skill-bar-item">
                    <div className="skill-bar-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-pct">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="tech-tags">
          {techTags.map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
