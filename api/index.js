import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Project from './models/Project.js';
import Contact from './models/Contact.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Initial Default Projects Data
const defaultProjects = [
  {
    title: "Timetable Generator",
    description: "An automated web-based scheduling system for academic institutions. Dynamically resolves conflicts between faculty timings, classrooms, and class batches, generating optimized weekly timetables with interactive grid displays.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "MongoDB"],
    githubLink: "https://github.com/puvitha-C-131006",
    liveLink: "",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop",
    featured: true
  },
  {
    title: "TN Tourist Guide",
    description: "A comprehensive travel platform for showcasing Tamil Nadu's heritage and tourist destinations. Offers categorized guides for temples, hill stations, and historical sites, integrated maps, and personalized itinerary planners.",
    technologies: ["React.js", "Express.js", "Node.js", "MongoDB"],
    githubLink: "https://github.com/puvitha-C-131006",
    liveLink: "",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
    featured: true
  },
  {
    title: "Phishing Email Detector",
    description: "A security tool powered by Machine Learning that identifies phishing emails. Utilizes NLP and classification algorithms to analyze email headers, text content, and suspicious links to report credibility metrics.",
    technologies: ["Python", "Flask", "React.js", "Scikit-Learn", "NLP"],
    githubLink: "https://github.com/puvitha-C-131006",
    liveLink: "",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    featured: true
  }
];

// Helper to seed database if empty
const seedDatabase = async () => {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(defaultProjects);
      console.log('Database seeded with default projects');
    }
  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
};

// Establish database connection on startup
let dbConnectionPromise = null;
const getDB = async () => {
  if (!dbConnectionPromise) {
    dbConnectionPromise = connectDB().then(async (conn) => {
      if (conn) {
        await seedDatabase();
      }
      return conn;
    });
  }
  return dbConnectionPromise;
};

// Call getDB immediately to start connection
getDB();

// --- API ROUTES ---

// Health Check / Welcome Route
app.get('/api', (req, res) => {
  res.json({
    status: 'success',
    message: 'Puvitha C Portfolio API is online',
    dbConnected: !!process.env.MONGODB_URI
  });
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === adminPassword) {
    return res.json({
      success: true,
      token: 'mock-jwt-token-puvitha-portfolio',
      message: 'Logged in successfully'
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid password. Try "admin123" or set ADMIN_PASSWORD.'
    });
  }
});

// GET All Projects
app.get('/api/projects', async (req, res) => {
  try {
    const conn = await getDB();
    if (!conn) {
      // Return default projects if database is not configured
      console.log('Returning static fallback projects (Database not connected)');
      return res.json({
        success: true,
        source: 'static-fallback',
        data: defaultProjects
      });
    }
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      source: 'database',
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving projects',
      error: error.message,
      fallbackData: defaultProjects
    });
  }
});

// POST Create Project
app.post('/api/projects', async (req, res) => {
  try {
    const conn = await getDB();
    if (!conn) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Cannot perform write operations.'
      });
    }

    const { title, description, technologies, githubLink, liveLink, image, featured } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    const project = new Project({
      title,
      description,
      technologies: Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim()).filter(Boolean),
      githubLink,
      liveLink,
      image: image || undefined,
      featured: !!featured
    });

    await project.save();
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});

// PUT Update Project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const conn = await getDB();
    if (!conn) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Cannot perform write operations.'
      });
    }

    const { title, description, technologies, githubLink, liveLink, image, featured } = req.body;
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (technologies !== undefined) {
      updateData.technologies = Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim()).filter(Boolean);
    }
    if (githubLink !== undefined) updateData.githubLink = githubLink;
    if (liveLink !== undefined) updateData.liveLink = liveLink;
    if (image !== undefined) updateData.image = image;
    if (featured !== undefined) updateData.featured = !!featured;

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
});

// DELETE Project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const conn = await getDB();
    if (!conn) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Cannot perform write operations.'
      });
    }

    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
});

// POST Submit Contact Form
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    const conn = await getDB();
    if (!conn) {
      // Mock saving if database is offline
      console.log('Database not connected. Simulating saving message:', { name, email, subject, message });
      return res.json({
        success: true,
        source: 'mock',
        message: 'Message received! (Development Mode: saved in-memory)'
      });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    res.status(201).json({
      success: true,
      source: 'database',
      message: 'Thank you! Your message has been sent successfully.',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
});

// GET All Contact Messages (For Admin panel)
app.get('/api/contacts', async (req, res) => {
  try {
    const conn = await getDB();
    if (!conn) {
      return res.json({
        success: true,
        source: 'mock',
        data: [
          {
            name: "Recruiter Admin",
            email: "recruiter@techcorp.com",
            subject: "Job Opportunity",
            message: "This is a placeholder message. Connect MongoDB to receive actual messages from your portfolio contact form!",
            createdAt: new Date()
          }
        ]
      });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      source: 'database',
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving contact messages',
      error: error.message
    });
  }
});

// Express Listener (only used when running server directly, Vercel loads app as a serverless function)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
