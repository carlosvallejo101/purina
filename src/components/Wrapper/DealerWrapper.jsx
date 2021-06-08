import React from 'react';

import './dealer-wrapper.css';
import Header from '../Header/header.jsx';
import HeaderDealer from '../Header/DealerHeader';
import Footer from '../Footer/DealerFooter';

const DealerWrapper = ({ children, isDealer = false, dealerInfo }) => {
  return (
    <div className="dealer-wrapper">
      {isDealer ? <HeaderDealer dealerInfo={dealerInfo} /> : <Header />}
      <div className="dealer-wrapper__body">{children}</div>
      <Footer />
    </div>
  );
};

export default DealerWrapper;
