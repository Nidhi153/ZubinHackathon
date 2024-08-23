import React from 'react';

const Header = ({title}) => {
  return (
    <div className="header-image">
        <img src="./banner.png" alt="Banner" style={{ width: '100%' }} />
        <div className="centered-title">{title}</div>
    </div>
  );
};

export default Header;
