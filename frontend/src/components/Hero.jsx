import React, { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowRight, FiMail } from 'react-icons/fi';
import profileImg from '../assets/profile.jpg';
import './Hero.css';

const Hero = () => {
  const [bio, setBio] = useState(null);
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

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

  useEffect(() => {
    if (!bio || !bio.roles || bio.roles.length === 0) return;
    
    const TYPING_TEXTS = bio.roles;
    const current = TYPING_TEXTS[textIndex];
    if (!current) return;

    const speed = deleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setTextIndex((t) => (t + 1) % TYPING_TEXTS.length);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, textIndex, bio]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  if (!bio) return <section id="hero" className="hero"><div className="container hero-content">Loading...</div></section>;

  return (
    <section id="hero" className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-glow" />

      <div className="container hero-content">
        {/* Left column */}
        <div className="hero-left">
          {/* Available badge */}
          <div className="available-badge">
            <span className="badge-line" />
            <span className="badge-text">AVAILABLE FOR WORK</span>
            <span className="badge-dot" />
          </div>

          {/* Name */}
          <p className="hero-greeting">HELLO, I'M</p>
          <h1 className="hero-name">{bio.name || 'Paritala Pavan Kumar'}</h1>

          {/* Typing role */}
          <div className="hero-role">
            <span className="role-arrow">&gt;</span>
            <span className="role-text">{displayed}</span>
            <span className="role-cursor">|</span>
          </div>

          {/* Description */}
          <p className="hero-desc">
            {bio.description || 'I build high-performance web applications...'}
          </p>

          {/* CTA */}
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              View My Work <FiArrowRight />
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
              Contact Me
            </button>
          </div>

          {/* Social */}
          <div className="hero-socials">
            <div className="social-icons">
              {bio.github && (
                <a href={bio.github} target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                  <FiGithub />
                </a>
              )}
              {bio.linkedin && (
                <a href={bio.linkedin.startsWith('http') ? bio.linkedin : `https://${bio.linkedin}`} target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                  <FiLinkedin />
                </a>
              )}
            </div>
            {bio.email && (
              <a href={`mailto:${bio.email}`} className="hero-email">
                <FiMail size={14} />
                {bio.email}
              </a>
            )}
          </div>
        </div>

        {/* Right column — profile photo */}
        <div className="hero-right">
          <div className="hero-photo-wrapper">
            <div className="hero-photo-ring" />
            <div className="hero-photo-ring hero-photo-ring--2" />
            <img
              src={profileImg}
              alt={bio.name}
              className="hero-photo"
            />
            {/* Floating badges */}
            <div className="hero-float-badge top-badge">
              <span className="float-icon">⚡</span>
              <span>Full Stack Dev</span>
            </div>
            <div className="hero-float-badge bottom-badge">
              <span className="float-icon">🚀</span>
              <span>5+ Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
