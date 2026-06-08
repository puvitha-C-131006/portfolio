import React, { useState, useEffect } from 'react';
import { ExternalLink, Edit3, Trash2, PlusCircle, RefreshCw } from 'lucide-react';
import ProjectModal from './ProjectModal';

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

const fallbackProjects = [
  {
    _id: "fb1",
    title: "TN Tourist Guide App",
    description: "A comprehensive tourist guide application for Tamil Nadu, featuring district-wise navigation, category filters, and detailed travel information.",
    technologies: ["React.js", "Node.js", "Express", "MongoDB"],
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=600&auto=format&fit=crop",
    featured: true,
    liveLink: "https://github.com/puvitha-C-131006"
  },
  {
    _id: "fb2",
    title: "Phishing Email Detector",
    description: "An intelligent security tool that analyzes emails to detect potential phishing threats and protect users using machine learning algorithms.",
    technologies: ["Python", "Machine Learning", "Flask", "React.js"],
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=600&auto=format&fit=crop",
    featured: true,
    liveLink: "https://github.com/puvitha-C-131006"
  },
  {
    _id: "fb3",
    title: "Personal Portfolio Website",
    description: "A responsive personal portfolio website to showcase skills, projects, achievements, and contact information, with an admin panel.",
    technologies: ["React.js", "Node.js", "MongoDB", "CSS"],
    image: "https://images.unsplash.com/photo-1507238692062-110ce3aec3ac?q=80&w=600&auto=format&fit=crop",
    featured: false,
    liveLink: "https://github.com/puvitha-C-131006"
  },
  {
    _id: "fb4",
    title: "Smart Timetable Generator",
    description: "An automated scheduling application using genetic algorithms to generate conflict-free academic timetables for departments, professors, and sections.",
    technologies: ["React.js", "Node.js", "Express", "MongoDB", "Genetic Algorithms"],
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop",
    featured: true,
    liveLink: "https://github.com/puvitha-C-131006"
  }
];

const Projects = ({ isAdmin }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [crudStatus, setCrudStatus] = useState({ type: '', message: '' });

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      } else {
        // Fallback on success=false
        setProjects(fallbackProjects);
      }
    } catch (err) {
      console.warn('API Error, using fallback projects:', err);
      // Seamlessly fall back so the portfolio mockup looks professional
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAddModal = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleModalSubmit = async (payload) => {
    handleModalClose();
    setCrudStatus({ type: 'info', message: 'Saving project...' });
    
    try {
      const url = selectedProject 
        ? `/api/projects/${selectedProject._id}`
        : '/api/projects';
      
      const method = selectedProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setCrudStatus({ 
          type: 'success', 
          message: selectedProject ? 'Project updated successfully!' : 'Project added successfully!' 
        });
        fetchProjects();
      } else {
        setCrudStatus({ 
          type: 'error', 
          message: data.message || 'Operation failed.' 
        });
      }
    } catch (err) {
      setCrudStatus({ 
        type: 'error', 
        message: 'Could not connect to the API to save the project.' 
      });
    }

    setTimeout(() => setCrudStatus({ type: '', message: '' }), 5000);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    setCrudStatus({ type: 'info', message: 'Deleting project...' });

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (data.success) {
        setCrudStatus({ type: 'success', message: 'Project deleted successfully!' });
        fetchProjects();
      } else {
        setCrudStatus({ type: 'error', message: data.message || 'Failed to delete project.' });
      }
    } catch (err) {
      setCrudStatus({ type: 'error', message: 'Could not connect to API to delete project.' });
    }

    setTimeout(() => setCrudStatus({ type: '', message: '' }), 5000);
  };

  return (
    <section id="projects" className="section container">
      <div className="section-header">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          A collection of software projects, web applications, and technical builds.
        </p>
      </div>

      <div className="projects-header-actions">
        {isAdmin && (
          <button className="btn btn-primary btn-sm" onClick={handleOpenAddModal}>
            <PlusCircle size={16} />
            <span>Add New Project</span>
          </button>
        )}
        
        {error && (
          <button className="btn btn-secondary btn-sm" onClick={fetchProjects}>
            <RefreshCw size={14} />
            <span>Retry Connection</span>
          </button>
        )}
      </div>

      {crudStatus.message && (
        <div className={`form-status ${crudStatus.type === 'success' ? 'success' : crudStatus.type === 'error' ? 'error' : 'success'}`} style={{ marginBottom: '24px' }}>
          <span>{crudStatus.message}</span>
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '60px 0' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--color-border)',
            borderTopColor: 'var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: 'var(--color-text-dim)' }}>Fetching projects from database...</p>
        </div>
      ) : error ? (
        <div style={{
          padding: '32px',
          borderRadius: '16px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>{error}</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
            Please make sure you have started your backend server (<code>node api/index.js</code> or <code>npm run dev</code> backend proxy) 
            and set up your MongoDB URI in environment variables.
          </p>
        </div>
      ) : projects.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--color-text-dim)', padding: '40px' }}>
          No projects found. Add your first project using the admin dashboard!
        </p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id || project.title} className="project-card">
              <div className="project-image-wrapper">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-img" 
                  onError={(e) => {
                    // fall back to default unsplash coding image if link is broken
                    e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop';
                  }}
                />
                {project.featured && (
                  <span className="project-featured-badge">Featured</span>
                )}
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="project-tech">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
                
                <div className="project-links">
                  <div className="project-links-group">
                    {/* Live Demo link removed */}
                  </div>
                  
                  {isAdmin && (
                    <div className="admin-actions">
                      <button 
                        className="btn btn-secondary btn-sm" 
                        style={{ padding: '6px' }}
                        onClick={() => handleOpenEditModal(project)}
                        title="Edit Project"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        className="btn btn-danger btn-sm" 
                        style={{ padding: '6px' }}
                        onClick={() => handleDeleteProject(project._id)}
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;
