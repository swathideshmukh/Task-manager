import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Task Manager</h3>
          <p className="footer-description">
            Stay organized and boost your productivity with our simple yet powerful task management solution.
          </p>
        </div>
        
        <div className="footer-section">
          <p className="footer-copyright">
            © {currentYear} Task Manager. Created by Swathi deshmukh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
