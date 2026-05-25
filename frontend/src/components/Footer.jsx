import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-logo" onClick={scrollToTop}>
          <span className="logo-bracket">&lt;</span>Dev<span className="logo-bracket">/&gt;</span>
        </div>

        <p className="footer-copy">
          <span>Paritala Pavan Kumar</span> &nbsp;·&nbsp; {new Date().getFullYear()}
        </p>

        <div className="footer-socials">
          <a href="https://github.com/pavanparitala09" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://www.linkedin.com/in/pavankumar-paritala-aa733a29a" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
