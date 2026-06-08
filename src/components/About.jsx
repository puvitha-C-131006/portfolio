import React from 'react';
import { BookOpen, Target, Award, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section container">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          My background, career goals, and educational journey.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p className="about-bio">
            I am a dedicated software developer and cyber security professional passionate about creating robust and modern web applications. My goal is to build innovative full-stack solutions and contribute to secure digital ecosystems. I specialize in developing scalable web applications, secure database systems, and leveraging smart technologies.
          </p>

          <div className="personal-info-card">
            <div className="personal-info-grid">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">Puvitha C</span>
              </div>
              <div className="info-item">
                <span className="info-label">Degree:</span>
                <span className="info-value">B.E. Computer Science and Engineering (Cyber Security)</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location:</span>
                <span className="info-value">Hosur, Tamil Nadu, India</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">
                  <a href="mailto:puvithasaraswathi@gmail.com">puvithasaraswathi@gmail.com</a>
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Freelance:</span>
                <span className="info-value"><span className="freelance-badge">Available</span></span>
              </div>
              <div className="info-item">
                <span className="info-label">Languages:</span>
                <span className="info-value">Tamil, English</span>
              </div>
            </div>

            <div className="interests-wrapper">
              <span className="interests-label">Areas of Interest:</span>
              <div className="interests-tags">
                <span className="interest-tag">Web Development</span>
                <span className="interest-tag">AI Tools</span>
                <span className="interest-tag">Cyber Security</span>
                <span className="interest-tag">Open Source</span>
                <span className="interest-tag">UI Design</span>
              </div>
            </div>
          </div>

          <div className="career-objective-card">
            <h3>
              <Target size={20} />
              <span>Career Objective</span>
            </h3>
            <p>
              "To secure a challenging position in the software industry where I can apply my 
              technical knowledge, enhance my development skills, and contribute to organizational 
              growth while continuously learning emerging technologies."
            </p>
          </div>
        </div>

        <div className="education-card">
          <h3>
            <BookOpen size={24} style={{ color: 'var(--color-primary)' }} />
            <span>Education</span>
          </h3>
          
          <div className="education-timeline">
            <div className="education-item">
              <div className="education-degree">B.E. CSE (Cyber Security)</div>
              <div className="education-college">Adhiyamaan College of Engineering</div>
              <div className="education-loc" style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <MapPin size={14} />
                <span>Tamil Nadu, India</span>
              </div>
              <div className="education-duration" style={{ marginTop: 4 }}>
                <strong>Status:</strong> Present
              </div>
            </div>

            <div className="education-item">
              <div className="education-degree">Higher Secondary (12th)</div>
              <div className="education-college">Tamil Nadu State Board</div>
              <div className="education-duration" style={{ marginTop: 4 }}>
                2023 - 2024
              </div>
            </div>

            <div className="education-item">
              <div className="education-degree">Secondary School (10th)</div>
              <div className="education-college">Tamil Nadu State Board</div>
              <div className="education-duration" style={{ marginTop: 4 }}>
                2021 - 2022
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
