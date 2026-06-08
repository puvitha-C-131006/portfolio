import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  technologies: {
    type: [String],
    default: []
  },
  githubLink: {
    type: String,
    trim: true,
    default: ''
  },
  liveLink: {
    type: String,
    trim: true,
    default: ''
  },
  image: {
    type: String,
    trim: true,
    default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop' // beautiful coding default image
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Avoid model recompilation errors in hot-reloading environments (like Next.js/Vercel)
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
