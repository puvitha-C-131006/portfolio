import React, { useState, useEffect } from 'react';
import { Download, Mail, ArrowRight } from 'lucide-react';

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

const Hero = ({ onContactClick }) => {
  const [typedText, setTypedText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = [
    'Full Stack Developer',
    'Cyber Security Enthusiast',
    'Engineering Student'
  ];

  useEffect(() => {
    const activeTitle = titles[titleIndex];
    let typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex === activeTitle.length) {
      // Hold complete title
      typingSpeed = 2000;
      setIsDeleting(true);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      typingSpeed = 500;
    }

    const timer = setTimeout(() => {
      setTypedText(
        isDeleting
          ? activeTitle.substring(0, charIndex - 1)
          : activeTitle.substring(0, charIndex + 1)
      );
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex]);

  return (
    <section id="home" className="section container">
      <div className="hero-wrapper">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>Puvitha C</span>
          </h1>
          <div className="hero-subtitle">
            <span>{typedText}</span>
            <span style={{ animation: 'blink 1s infinite', color: 'var(--color-primary)' }}>|</span>
          </div>
          <p className="hero-intro">
            Dedicated Full Stack Developer and Cyber Security Enthusiast with a strong foundation in modern web technologies and software architecture. I specialize in building secure, scalable applications and am passionate about leveraging technology to solve complex, real-world problems.
          </p>
          <div className="hero-btns">
            <a 
              href="/Puvitha_C_Resume.pdf" 
              download="Puvitha_C_Resume.pdf" 
              className="btn btn-primary"
            >
              <Download size={18} />
              <span>Download Resume</span>
            </a>
            <button 
              className="btn btn-outline" 
              onClick={onContactClick}
            >
              <Mail size={18} />
              <span>Contact Me</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="hero-socials">
            <span>CONNECT WITH ME</span>
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
        
        <div className="hero-visual">
          <div className="hero-image-container">
            <img 
              src="/profile.png" 
              alt="Puvitha C" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 3,
                position: 'relative'
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Keyframe additions in-component style */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
