import React from 'react';
import { useAuth } from '../../auth/useAuth.jsx';
import './header.css';

import LogoProplan from '../../assets/img/logo_proplan.png';

const Header = () => {
  const { user } = useAuth();
  return (
    <div className="header">
      <img src={LogoProplan} alt="logo" />
      {user && <h2>Hola! {user.name.split(' ')[0]}</h2>}
    </div>
  );
};

export default Header;
