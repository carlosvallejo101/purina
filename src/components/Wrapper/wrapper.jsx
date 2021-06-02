import React from 'react';

import Header from '../Header/header.jsx';
import HeaderDealer from '../Header/DealerHeader';
import Footer from '../Footer/footer.jsx';

const Wrapper = ({ children, isDealer = false, dealerInfo }) => {
  return (
    <div className="wrapper">
      {isDealer ? <HeaderDealer dealerInfo={dealerInfo} /> : <Header />}
      {/* <Header /> */}
      <div className="wrapper__body">{children}</div>
      <Footer />
    </div>
  );
};

export default Wrapper;
