import React, { useState } from 'react';
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { API_BASE_URL } from '../config/api';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.msg || 'Something went wrong. Please try again.');
      }
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// get in touch</span>
          <h2 className="section-title">
            Let's <span>Connect</span>
          </h2>
          <div className="accent-line" />
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h3 className="contact-info-title">Have a project in mind?</h3>
            <p className="contact-info-desc">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of something amazing. Drop me a message!
            </p>

            <div className="contact-details">
              <a href="mailto:pavankumarparitala2580@gmail.com" className="contact-detail">
                <span className="detail-icon"><FiMail /></span>
                <div>
                  <span className="detail-label">Email</span>
                  <span className="detail-value">pavankumarparitala2580@gmail.com</span>
                </div>
              </a>
              <div className="contact-detail">
                <span className="detail-icon"><FiMapPin /></span>
                <div>
                  <span className="detail-label">Location</span>
                  <span className="detail-value">Hyderabad</span>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <a href="https://github.com/pavanparitala09" target="_blank" rel="noreferrer" className="contact-social">
                <FiGithub /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/pavankumar-paritala-aa733a29a" target="_blank" rel="noreferrer" className="contact-social">
                <FiLinkedin /> LinkedIn
              </a>
            </div>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Pavan Kumar"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project Collaboration"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {status === 'success' && (
              <div className="form-toast success">
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="form-toast error">
                ❌ {errMsg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending…' : <><FiSend /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
