import React from 'react';

import Header from '../Header/header.jsx';
import Footer from '../Footer/footer.jsx';

const Wrapper = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="wrapper__body">{children}</div>
      <Footer />
    </div>
  );
};

export default Wrapper;
