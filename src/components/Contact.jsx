import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ 
        type: 'error', 
        message: 'Could not connect to the backend server. Please try again later.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section container">
      <div className="section-header">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-panel">
          <div>
            <h3>Contact Details</h3>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.95rem' }}>
              Feel free to use the details below or fill in the form to get in touch.
            </p>
          </div>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <div className="contact-icon-box">
                <Mail size={20} />
              </div>
              <div className="contact-info-details">
                <h4>Email Address</h4>
                <a href="mailto:puvithasaraswathi@gmail.com">puvithasaraswathi@gmail.com</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-box">
                <Phone size={20} />
              </div>
              <div className="contact-info-details">
                <h4>Phone Number</h4>
                <a href="tel:+919363926866">+91 9363926866</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-box">
                <MapPin size={20} />
              </div>
              <div className="contact-info-details">
                <h4>Location</h4>
                <p>Hosur, Tamil Nadu, India</p>
              </div>
            </div>
          </div>

          <div className="hero-socials" style={{ marginTop: '16px' }}>
            <span>FIND ME ON</span>
            <a 
              href="https://github.com/puvitha-C-131006" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/puvitha-c-b86633335?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>

        <div className="contact-form-panel">
          <form onSubmit={handleSubmit}>
            {status.message && (
              <div className={`form-status ${status.type === 'success' ? 'success' : 'error'}`}>
                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{status.message}</span>
              </div>
            )}

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="contact-name">Your Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  className="form-control"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address *</label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-control"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                className="form-control"
                placeholder="Job Inquiry / Collaboration"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                className="form-control"
                placeholder="Your message details..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={loading}
            >
              <Send size={18} />
              <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
