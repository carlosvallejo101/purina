import React from 'react';
import './header.css';

import LogoProplan from '../../assets/img/logo_proplan.png';

const Header = () => {
  return (
    <div className="header">
      <img src={LogoProplan} alt="logo" />
    </div>
  );
};

export default Header;
