import React from 'react';

import './dealer-footer.css';
// import LogoConquista from '../../assets/img/logo_conquista.png';
import LogoConquista from '../../assets/img/LOGOS_PURINA.png';
import Logout from '../Logout/logout.jsx';
import FondoFooter from '../../assets/svg/triangulo-dealer.svg';

const DealerFooter = () => {
  return (
    <footer className="dealer-footer">
      {/* <Logout /> */}
      {/* <div className="dealer-footer__line"></div> */}
      <img
        className="dealer-footer__logo"
        // src={LogoConquista}
        src={FondoFooter}
        alt="logo_conquista"
      />
    </footer>
  );
};

export default DealerFooter;
