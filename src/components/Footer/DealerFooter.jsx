import React from 'react';

import './dealer-footer.css';
import Logout from '../Logout/logout.jsx';
import FondoFooter from '../../assets/svg/triangulo-dealer.svg';

const DealerFooter = () => {
  return (
    <footer className="dealer-footer">
      <Logout superpose={true} />
      <img
        className="dealer-footer__logo"
        src={FondoFooter}
        alt="logo_conquista"
      />
    </footer>
  );
};

export default DealerFooter;
