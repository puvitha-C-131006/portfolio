import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import MockupShowcase from './components/MockupShowcase';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);

  const isEmbedded = window.location.search.includes('embed=true');

  // Check admin status on load
  useEffect(() => {
    const adminToken = localStorage.getItem('admin-token');
    if (adminToken === 'mock-jwt-token-puvitha-portfolio') {
      setIsAdmin(true);
    }
  }, []);

  // Section Observer to set active nav item
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];
    const observers = [];

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        {
          rootMargin: '-30% 0px -60% 0px' // Trigger active state when section takes up the middle of viewport
        }
      );

      observer.observe(el);
      observers.push({ observer, el });
    });

    return () => {
      observers.forEach(({ observer, el }) => observer.unobserve(el));
    };
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('admin-token', token);
    setIsAdmin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setIsAdmin(false);
  };

  const handleContactScroll = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Navbar 
        activeSection={activeSection}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      <main style={{ marginTop: '80px' }}>
        <Hero onContactClick={handleContactScroll} />
        <About />
        <Skills />
        <Projects isAdmin={isAdmin} />
        <Achievements />
        <Certifications />
        <Contact />
        <AdminPanel 
          isAdmin={isAdmin}
          isLoginModalOpen={isLoginModalOpen}
          onCloseLoginModal={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </main>

      <Footer />

      {/* Showcase Device Overlay */}
      {showShowcase && !isEmbedded && (
        <MockupShowcase onClose={() => setShowShowcase(false)} />
      )}

      {/* Floating Action Toggle Button */}
      {!isEmbedded && !showShowcase && (
        <button 
          className="showcase-badge-btn" 
          onClick={() => setShowShowcase(true)}
          aria-label="View responsive device mockups"
        >
          <span>💻 Device Showcase</span>
        </button>
      )}
    </>
  );
}

export default App;
