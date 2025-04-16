import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import logo from "../../assets/VITLogoEmblem.png"

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" className="bg-[#2C3E50] border-b-4 border-[#E74C3C]">
      <Container className="max-w-7xl mx-auto">
        <Navbar.Brand 
          href="#home" 
          className="flex items-center gap-4 text-white hover:text-white no-underline"
        >
          <img
            src={logo}
            alt="VIT Bhopal Logo"
            className="h-10 "
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-wide">VIT Bhopal University</span>
            <span className="text-sm font-medium text-gray-300">NLP Text-Voice Converter</span>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;