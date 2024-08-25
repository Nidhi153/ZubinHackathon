import React from 'react';

const Navbar = () => {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '15px'
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px'
  };

  return (
    <nav style={navbarStyle}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>MyApp</div>
      <div style={navLinksStyle}>
        <a href="/" style={linkStyle}>Home</a>
        <a href="/about" style={linkStyle}>About</a>
        <a href="/services" style={linkStyle}>Services</a>
        <a href="/contact" style={linkStyle}>Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
