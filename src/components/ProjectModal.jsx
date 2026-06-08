import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, onSubmit, project = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [image, setImage] = useState('');
  const [featured, setFeatured] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setDescription(project.description || '');
      setTechnologies(Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies || '');
      setGithubLink(project.githubLink || '');
      setLiveLink(project.liveLink || '');
      setImage(project.image || '');
      setFeatured(project.featured || false);
    } else {
      // Reset form for "Add"
      setTitle('');
      setDescription('');
      setTechnologies('');
      setGithubLink('');
      setLiveLink('');
      setImage('');
      setFeatured(false);
    }
    setError('');
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and Description are required.');
      return;
    }
    
    // Parse technologies comma-separated string
    const techArray = technologies
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      description,
      technologies: techArray,
      githubLink,
      liveLink,
      image: image.trim() || undefined,
      featured
    };

    onSubmit(payload);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{project ? 'Edit Project Details' : 'Add New Project'}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div className="form-status error" style={{ marginBottom: '16px' }}>
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="modal-project-title">Project Title *</label>
              <input
                id="modal-project-title"
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Smart Timetable Generator"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="modal-project-description">Project Description *</label>
              <textarea
                id="modal-project-description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A detailed explanation of the project, features, and target audience..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="modal-project-technologies">Technologies (comma separated) *</label>
              <input
                id="modal-project-technologies"
                type="text"
                className="form-control"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="e.g. React.js, Node.js, MongoDB, Express"
                required
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="modal-project-github">GitHub Repository URL</label>
                <input
                  id="modal-project-github"
                  type="url"
                  className="form-control"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-project-live">Live Demo Link</label>
                <input
                  id="modal-project-live"
                  type="url"
                  className="form-control"
                  value={liveLink}
                  onChange={(e) => setLiveLink(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="modal-project-image">Cover Image URL</label>
              <input
                id="modal-project-image"
                type="url"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', marginTop: '4px' }}>
                Leave empty for a beautiful code background placeholder.
              </span>
            </div>

            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <input
                id="modal-project-featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="modal-project-featured" style={{ cursor: 'pointer', userSelect: 'none' }}>
                Mark as Featured Project
              </label>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              {project ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
