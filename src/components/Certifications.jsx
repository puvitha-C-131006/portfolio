import React from 'react';
import { ShieldCheck, Award, Shield, Key, Network, CheckCircle } from 'lucide-react';

const Certifications = () => {
  const certificationsList = [
    {
      title: "Enterprises Networking Fundamentals",
      provider: "Department of CSE (Cyber Security), Adhiyamaan College of Engineering & Arka Technologies",
      date: "Feb 25, 2026 - Mar 04, 2026",
      desc: "Completed value-added training on core networking concepts, routing protocols, and enterprise network architectures.",
      icon: <Network size={28} />,
      badge: "Networking"
    },
    {
      title: "HackEdge 1.0: Cybersecurity for Future Defenders",
      provider: "Adhiyamaan College of Engineering & SecForgTek Solutions",
      date: "Oct 27, 2025 - Oct 31, 2025",
      desc: "FutureReady Add-On Accelerator Course covering network defense, cyber threat mitigation, and defense-in-depth principles.",
      credentialId: "ACE - CSE CS 043",
      icon: <ShieldCheck size={28} />,
      badge: "Cyber Security"
    },
    {
      title: "Programming In Java",
      provider: "NPTEL Online Certification (IIT Kharagpur - Funded by MoE, Govt. of India)",
      date: "Jul - Oct 2025 (12-Week Course)",
      desc: "Successfully completed with a consolidated score of 69% (Elite Grade) covering advanced object-oriented programming concepts in Java.",
      credentialId: "Roll No: NPTEL25CS110S461500427",
      icon: <Award size={28} />,
      badge: "Elite Grade"
    },
    {
      title: "Threat Modeling",
      provider: "Infosys Springboard",
      date: "August 11, 2025",
      desc: "Course training on standard threat modeling frameworks, STRIDE methodologies, identifying software vulnerabilities, and security threat mitigations.",
      icon: <Key size={28} />,
      badge: "Security Analysis"
    },
    {
      title: "Fundamentals of Information Security",
      provider: "Infosys Springboard",
      date: "December 09, 2024",
      desc: "Introduction to information security principles, confidentiality, integrity, availability (CIA triad), and security compliance guidelines.",
      icon: <Shield size={28} />,
      badge: "Information Security"
    }
  ];

  return (
    <section id="certifications" className="section container" style={{ paddingTop: '40px' }}>
      <div className="section-header">
        <h2 className="section-title">Certifications</h2>
        <p className="section-subtitle">
          Professional credentials, specialized training, and course completions in Software Engineering and Cyber Security.
        </p>
      </div>

      <div className="certifications-grid">
        {certificationsList.map((cert, idx) => (
          <div key={idx} className="certification-card">
            <div className="certification-header-card">
              <div className="certification-icon-wrapper">
                {cert.icon}
              </div>
              <span className="certification-badge">{cert.badge}</span>
            </div>
            
            <div className="certification-body">
              <h3 className="certification-title">{cert.title}</h3>
              <p className="certification-provider">{cert.provider}</p>
              <p className="certification-desc">{cert.desc}</p>
            </div>

            <div className="certification-footer">
              <div className="certification-date">{cert.date}</div>
              {cert.credentialId && (
                <div className="certification-id">
                  <span>ID: </span><code>{cert.credentialId.replace("Roll No: ", "")}</code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
