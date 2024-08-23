import React from 'react';
import Image from 'next/image';
import banner from "../../../assets/banner.png"

const titleStyle = {
  fontSize: '40px'
};

const Header = ({title}) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
    <Image src={banner} alt='User Icon' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        width: '50%',
        height: '50%',
        backgroundColor: 'rgba(255, 255, 255)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '15px',
      }}
    >
    <h1 style={titleStyle}>{title}</h1>
    </div>
  </div>
  );
};

export default Header;
