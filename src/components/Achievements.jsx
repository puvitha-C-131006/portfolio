import { Award, Globe, Calendar, Server, BookOpen } from 'lucide-react';

const Achievements = () => {
  const achievementsList = [
    {
      title: "Academic Projects Completed",
      desc: "Successfully designed and developed multiple academic projects focusing on real-world problems and algorithmic efficiency.",
      icon: <Award size={28} />
    },
    {
      title: "Full Stack Development Skills",
      desc: "Acquired strong proficiency in both frontend and backend technologies to build scalable and secure applications.",
      icon: <Server size={28} />
    },
    {
      title: "Problem Solving Skills",
      desc: "Demonstrated strong analytical and problem-solving abilities through complex coding challenges and logical design.",
      icon: <Calendar size={28} />
    },
    {
      title: "Responsive Web Applications Built",
      desc: "Created highly responsive and interactive web interfaces optimized for seamless user experiences across all devices.",
      icon: <Globe size={28} />
    },
    {
      title: "Continuous Learning and Technology Exploration",
      desc: "Dedicated to continuously learning new technologies, tools, and best practices in cyber security and modern development.",
      icon: <BookOpen size={28} />
    }
  ];

  return (
    <section id="achievements" className="section container" style={{ paddingTop: '40px' }}>
      <div className="section-header">
        <h2 className="section-title">Achievements</h2>
        <p className="section-subtitle">
          Key milestones, accomplishments, and focus areas in my academic and technical journey.
        </p>
      </div>

      <div className="achievements-grid">
        {achievementsList.map((ach, idx) => (
          <div key={idx} className="achievement-card">
            <div className="achievement-icon-wrapper">
              {ach.icon}
            </div>
            <h3>{ach.title}</h3>
            <p>{ach.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
