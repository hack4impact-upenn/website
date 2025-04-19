import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Spring, animated } from 'react-spring/renderprops.cjs';
import ActionButton from '../actionButton';
import BlockQuote from '../blockQuote';

const NonprofitScroll = ({projects}) => {
  const [scrollY, setScrollY] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const firstPageRef = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    // Update page height after component mounts
    if (firstPageRef.current) {
      setPageHeight(firstPageRef.current.clientHeight);
    }
    
    // Handle scroll events
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Handle resize events
    const handleResize = () => {
      if (firstPageRef.current) {
        setPageHeight(firstPageRef.current.clientHeight);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate rotation based on scroll position
  const globeRotation = scrollY * 0.5; // Adjust multiplier for rotation speed
  
  // Calculate page 2 opacity based on scroll position
  const page2Opacity = Math.min(1, Math.max(0, (scrollY - pageHeight * 0.5) / (pageHeight * 0.3)));
  
  // Auto-scroll to second page when globe completes a certain rotation
  // But only do this once, and only if the user is actively scrolling down
  useEffect(() => {
    if (globeRotation > 180 && scrollY < pageHeight && !hasAutoScrolled) {
      // Smooth scroll to second page
      window.scrollTo({
        top: pageHeight,
        behavior: 'smooth'
      });
      setHasAutoScrolled(true);
    }
    
    // Reset the auto-scroll flag if user scrolls back to the top
    if (scrollY < pageHeight * 0.3) {
      setHasAutoScrolled(false);
    }
  }, [globeRotation, pageHeight, scrollY, hasAutoScrolled]);
  
  return (
    <div className="scroll-container">
      {/* First Page - Software Development */}
      <div ref={firstPageRef} className="page first-page">
        <Container fluid>
          <div className="banner-section text-center">
            <h1 className="display-6 mb-5">We build software for nonprofits.</h1>
            
            <div className="global-illustration mb-4">
              <div
                ref={globeRef}
                className="globe-container"
                style={{ 
                  transform: `rotate(${globeRotation}deg)`,
                  minHeight: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img 
                  src="/images/banner_sample.svg" 
                  alt="Banner Sample" 
                  style={{ 
                    maxWidth: "100%",
                    height: "auto",
                    display: "block"
                  }} 
                />
              </div>
            </div>
            
            <Row className="justify-content-center">
              <Col md={8} lg={6}>
                <p className="text-muted">
                  Each semester, we work with three to five non-profits with the opportunity to build a great product that solves a
                  core need. We work in small groups led by a product manager and technical lead to scope and develop the
                  application, taking into account our clients' requirements and suggestions
                </p>
              </Col>
            </Row>
            
            <div className="scroll-indicator">
              <div className="mouse">
                <div className="wheel"></div>
              </div>
              <p>Scroll to learn more</p>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Second Page - Technology Support */}
      <div 
        className="page second-page" 
        style={{ 
          opacity: page2Opacity,
          visibility: page2Opacity > 0.1 ? 'visible' : 'hidden',
          pointerEvents: page2Opacity > 0.5 ? 'auto' : 'none' // Only allow interaction when mostly visible
        }}
      >
        <Container fluid>
          <div className="support-section">
            <Row className="align-items-center">
              <Col lg={6} className="text-section">
                <h1 className="display-7 mb-4">Not sure how technology can support your nonprofit?</h1>
              
                <p className="lead mb-4">
                  Answer a few quick questions, and we'll suggest potential software solutions hack4impact has built for other nonprofits.
                </p>

                <div style={{ marginTop: '2rem' }}>
                  <ActionButton 
                    white 
                    link="/clients/quizpage"
                  >
                    Start
                  </ActionButton>
                </div>

                {/* Back to top button */}
                <div className="mt-4">
                  <button 
                    className="btn btn-link text-muted"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <span className="mr-2">↑</span> Back to top
                  </button>
                </div>
              </Col>
              
              <Col lg={6} className="testimonial-section">
                <div className="involved-container">
                  <div className="testimonial-image-container">
                    <img
                      src="/images/philly_food_finder.jpg"
                      className="img-fluid testimonial-image"
                      alt="Philadelphia Mayor's Recognition"
                    />
                  </div>
                  <BlockQuote
                    text="Working with Hack4Impact was easy, efficient and incredibly productive. They were quick to understand what we were looking to achieve and made the app even better and simpler to use than what I had imagined."
                    author="- Bernardo H. Motta, Ph.D."
                    position="Faculty Coordinator of the USFSP Neighborhood News Bureau"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      
      <style jsx>{`
        .scroll-container {
          position: relative;
          overflow-x: hidden;
          height: auto;
          min-height: 200vh; /* Ensure there's always room to scroll */
        }
        
        .page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .first-page {
          background-color: #ffffff;
          position: sticky;
          top: 0;
          z-index: 2;
        }
        
        .second-page {
          background-color: #f8f9fa;
          position: relative;
          z-index: 1;
        }
        
        .banner-section, .support-section {
          width: 100%;
        }
        
        .global-illustration {
          max-width: 500px;
          margin: 0 auto;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .globe-container {
          transition: transform 0.1s ease-out;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        
        .globe-image {
          max-width: 100%;
          height: auto;
        }
        
        h1 {
          font-weight: 700;
          color: #333;
        }
        
        .text-muted {
          line-height: 1.6;
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          animation: fadeInOut 2s infinite;
        }
        
        .mouse {
          width: 30px;
          height: 50px;
          border: 2px solid #333;
          border-radius: 15px;
          margin: 0 auto 10px;
          position: relative;
        }
        
        .wheel {
          width: 4px;
          height: 8px;
          background: #333;
          border-radius: 2px;
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          animation: scroll 1.5s infinite;
        }
        
        .logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #3498db;
        }
        
        .testimonial-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 1.5rem;
        }
        
        .testimonial-image {
          border-radius: 4px;
          width: 100%;
        }
        
        blockquote {
          font-size: 0.95rem;
          color: #555;
        }
        
        @keyframes scroll {
          0% { opacity: 1; top: 10px; }
          100% { opacity: 0; top: 30px; }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .testimonial-section {
          padding: 1rem;
        }

        .involved-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          padding: 1.5rem;
          max-width: 400px;
          margin: 0 auto;
        }

        .testimonial-image-container {
          margin-bottom: 1.5rem;
          border-radius: 4px;
          overflow: hidden;
        }

        .testimonial-image {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default NonprofitScroll;