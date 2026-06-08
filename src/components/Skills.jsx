import React, { useEffect, useState, useRef } from 'react';
import { Code2, Monitor, Database, Wrench } from 'lucide-react';

const Skills = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code2 size={22} />,
      skills: [
        { name: 'C', level: 80 },
        { name: 'Java', level: 80 },
        { name: 'JavaScript', level: 80 },
        { name: 'Python', level: 75 }
      ]
    },
    {
      title: 'Web Technologies',
      icon: <Monitor size={22} />,
      skills: [
        { name: 'HTML5', level: 80 },
        { name: 'CSS3', level: 80 },
        { name: 'React.js', level: 80 },
        { name: 'Node.js', level: 75 }
      ]
    },
    {
      title: 'Database Management',
      icon: <Database size={22} />,
      skills: [
        { name: 'MySQL', level: 80 },
        { name: 'Oracle SQL', level: 80 }
      ]
    },
    {
      title: 'Tools & AI Technologies',
      icon: <Wrench size={22} />,
      skills: [
        { name: 'Git & GitHub', level: 80 },
        { name: 'VS Code', level: 80 },
        { name: 'AI Coding Tools', level: 80 }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section id="skills" className="section container" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">
          My technical stack and tools that I utilize to bring ideas to life.
        </p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="skills-category">
            <div className="category-header">
              <span style={{ 
                color: 'var(--color-primary)', 
                background: 'var(--color-primary-light)',
                padding: '10px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {category.icon}
              </span>
              <h3>{category.title}</h3>
            </div>
            
            <div className="skills-list">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span style={{ color: 'var(--color-primary)' }}>{skill.level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div 
                      className="skill-bar-fill"
                      style={{ width: animate ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
