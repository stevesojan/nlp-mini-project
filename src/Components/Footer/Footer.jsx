import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-[#2C3E50] border-t-4 border-[#E74C3C] mt-auto py-6">
      <Container className="max-w-7xl mx-auto px-4">
        <div className="text-center text-gray-300">
          <p className="text-sm font-medium mb-2">
            © 2025 VIT Bhopal University - NLP Mini Project
          </p>
          <p className="text-xs font-light opacity-90">
            Department of Computer Science & Engineering<br />
            Developed as part of Natural Language Processing Course
          </p>
          <div className="mt-3">
            <a 
              href="https://vitbhopal.ac.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#E74C3C] hover:text-[#ff6b5b] text-xs transition-colors"
            >
              Visit University Website
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;