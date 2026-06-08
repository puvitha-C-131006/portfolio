import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, X, RotateCcw, Smartphone, Laptop, Sparkles } from 'lucide-react';

const MockupShowcase = ({ onClose }) => {
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [laptopWidth, setLaptopWidth] = useState(640);
  const [phoneWidth, setPhoneWidth] = useState(250);

  const laptopContainerRef = useRef(null);
  const phoneContainerRef = useRef(null);
  const laptopIframeRef = useRef(null);
  const phoneIframeRef = useRef(null);

  // Measure containers to calculate iframe scaling factors
  useEffect(() => {
    const handleResize = () => {
      if (laptopContainerRef.current) {
        setLaptopWidth(laptopContainerRef.current.clientWidth);
      }
      if (phoneContainerRef.current) {
        setPhoneWidth(phoneContainerRef.current.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    // Extra timeout to ensure layout is settled
    const timer = setTimeout(handleResize, 300);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Compute scales based on target responsive design viewport sizes
  // Laptop target viewport is 1280px wide (Desktop standard)
  const laptopTargetWidth = 1280;
  const laptopScale = laptopWidth / laptopTargetWidth;
  const laptopHeight = laptopWidth * (10 / 16); // 16:10 aspect ratio

  // Phone target viewport is 375px wide (Mobile standard)
  const phoneTargetWidth = 375;
  const phoneScale = phoneWidth / phoneTargetWidth;
  const phoneHeight = phoneWidth * (18.5 / 9); // 9:18.5 aspect ratio

  // Auto Scroll logic
  useEffect(() => {
    if (!autoScroll) return;

    let direction = 1; // 1 for down, -1 for up
    let currentScroll = scrollProgress;

    const interval = setInterval(() => {
      currentScroll += direction * 0.0015; // smooth scrolling increment

      if (currentScroll >= 1) {
        currentScroll = 1;
        direction = -1; // reverse to up
      } else if (currentScroll <= 0) {
        currentScroll = 0;
        direction = 1; // reverse to down
      }

      setScrollProgress(currentScroll);

      // Apply scroll to both iframes
      try {
        if (laptopIframeRef.current && laptopIframeRef.current.contentWindow) {
          const doc = laptopIframeRef.current.contentDocument || laptopIframeRef.current.contentWindow.document;
          if (doc) {
            const maxScroll = doc.documentElement.scrollHeight - doc.documentElement.clientHeight;
            laptopIframeRef.current.contentWindow.scrollTo(0, maxScroll * currentScroll);
          }
        }
      } catch (e) {
        // Cross-origin fallback (should not occur since same origin)
      }

      try {
        if (phoneIframeRef.current && phoneIframeRef.current.contentWindow) {
          const doc = phoneIframeRef.current.contentDocument || phoneIframeRef.current.contentWindow.document;
          if (doc) {
            const maxScroll = doc.documentElement.scrollHeight - doc.documentElement.clientHeight;
            phoneIframeRef.current.contentWindow.scrollTo(0, maxScroll * currentScroll);
          }
        }
      } catch (e) {
        // Cross-origin fallback
      }
    }, 16);

    return () => clearInterval(interval);
  }, [autoScroll, scrollProgress]);

  const resetScroll = () => {
    setAutoScroll(false);
    setScrollProgress(0);
    try {
      if (laptopIframeRef.current?.contentWindow) {
        laptopIframeRef.current.contentWindow.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (phoneIframeRef.current?.contentWindow) {
        phoneIframeRef.current.contentWindow.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (e) {}
  };

  const getEmbedUrl = () => {
    return `${window.location.origin}${window.location.pathname}?embed=true`;
  };

  return (
    <div className="showcase-overlay">
      <div className="showcase-header">
        <h1 className="showcase-title">Responsive Design Mockup</h1>
        <p className="showcase-desc">
          Compare the portfolio website rendered on both Desktop and Mobile viewports.
          Hover over each device to interact or use the automatic showcase controls.
        </p>

        <div className="showcase-controls">
          <button 
            className="showcase-btn showcase-btn-primary"
            onClick={() => setAutoScroll(!autoScroll)}
          >
            {autoScroll ? <Pause size={16} /> : <Play size={16} />}
            <span>{autoScroll ? 'Pause Demo' : 'Auto Scroll Demo'}</span>
          </button>
          
          <button 
            className="showcase-btn showcase-btn-secondary"
            onClick={resetScroll}
          >
            <RotateCcw size={16} />
            <span>Reset View</span>
          </button>

          <button 
            className="showcase-btn showcase-btn-secondary"
            onClick={onClose}
            style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
          >
            <X size={16} />
            <span>Exit Showcase</span>
          </button>
        </div>
      </div>

      <div className="showcase-workspace">
        {/* Laptop Mockup */}
        <div className="laptop-device">
          <div 
            className="laptop-screen" 
            ref={laptopContainerRef}
            style={{ height: `${laptopHeight}px` }}
          >
            <div className="laptop-glare"></div>
            <div className="laptop-screen-inner">
              <iframe
                ref={laptopIframeRef}
                src={getEmbedUrl()}
                title="Desktop Portfolio View"
                className="laptop-screen-iframe"
                style={{
                  width: `${laptopTargetWidth}px`,
                  height: `${100 / laptopScale}%`,
                  transform: `scale(${laptopScale})`,
                  transformOrigin: 'top left',
                }}
              />
            </div>
          </div>
          <div className="laptop-base"></div>
        </div>

        {/* Smartphone Mockup */}
        <div className="phone-device">
          <div className="phone-case">
            <div className="phone-notch"></div>
            <div className="phone-glare"></div>
            <div 
              className="phone-screen"
              ref={phoneContainerRef}
              style={{ height: `${phoneHeight}px` }}
            >
              <div className="phone-screen-inner">
                <iframe
                  ref={phoneIframeRef}
                  src={getEmbedUrl()}
                  title="Mobile Portfolio View"
                  className="phone-screen-iframe"
                  style={{
                    width: `${phoneTargetWidth}px`,
                    height: `${100 / phoneScale}%`,
                    transform: `scale(${phoneScale})`,
                    transformOrigin: 'top left',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockupShowcase;
