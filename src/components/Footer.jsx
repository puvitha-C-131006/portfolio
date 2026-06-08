import React from 'react';
import { ArrowUp } from 'lucide-react';

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

const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3 style={{ 
              fontFamily: 'var(--font-secondary)',
              fontSize: '1.25rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Puvitha C
            </h3>
            <p style={{ fontSize: '0.9rem', marginTop: '4px', lineHeight: '1.6' }}>
              Full Stack Developer | Cyber Security Enthusiast | Engineering Student<br />
              Dedicated to developing innovative software solutions and continuously improving technical skills.
            </p>
            <div style={{ marginTop: '16px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-dim)' }}>
               <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '2px' }}>Contact</strong>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <span role="img" aria-label="location">📍</span> Hosur, Tamil Nadu
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <span role="img" aria-label="email">✉️</span> <a href="mailto:puvithasaraswathi@gmail.com" style={{ transition: 'color var(--transition-fast)' }} className="contact-link">puvithasaraswathi@gmail.com</a>
               </div>
            </div>
          </div>

          <div className="footer-socials">
            <a 
              href="https://github.com/puvitha-C-131006" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/puvitha-c-b86633335?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
