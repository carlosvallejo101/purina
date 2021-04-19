import React from 'react';
import './footer.css';

import LogoConquista from '../../assets/img/logo_conquista.png';
import Logout from '../Logout/logout.jsx';

const Footer = () => {
  return (
    <footer className="footer">
      <Logout />
      <div className="footer__line"></div>
      <img className="footer__logo" src={LogoConquista} alt="logo_conquista" />
    </footer>
  );
};

export default Footer;
