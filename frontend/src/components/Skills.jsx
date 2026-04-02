import React from 'react';
import {
  FiCode, FiDatabase, FiServer, FiGlobe,
  FiGitBranch, FiSmartphone, FiLayout, FiTerminal
} from 'react-icons/fi';
import './Skills.css';

const skills = [
  {
    category: 'Frontend',
    icon: <FiLayout />,
    items: [
      { name: 'React.js', level: 85 },
      { name: 'JavaScript (ES6+)', level: 88 },
      { name: 'HTML5 & CSS3', level: 90 },
      { name: 'React Native', level: 70 },
    ],
  },
  {
    category: 'Backend',
    icon: <FiServer />,
    items: [
      { name: 'Node.js', level: 82 },
      { name: 'Express.js', level: 80 },
      { name: 'REST APIs', level: 85 },
      { name: 'Python', level: 65 },
    ],
  },
  {
    category: 'Database',
    icon: <FiDatabase />,
    items: [
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 70 },
      { name: 'Mongoose ODM', level: 78 },
      { name: 'Redis', level: 50 },
    ],
  },
  {
    category: 'Tools & Others',
    icon: <FiTerminal />,
    items: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'VS Code', level: 95 },
      { name: 'Postman', level: 80 },
      { name: 'Linux / CLI', level: 72 },
    ],
  },
];

const techTags = [
  'React', 'Node.js', 'MongoDB', 'Express', 'JavaScript',
  'HTML5', 'CSS3', 'Git', 'REST API', 'Python', 'React Native', 'MySQL',
];

const Skills = () => {
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
                <span className="skill-group-icon">{group.icon}</span>
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
