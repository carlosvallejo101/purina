import React from 'react';

import Header from '../Header/header.jsx';

const Wrapper = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="wrapper__body">{children}</div>
    </div>
  );
};

export default Wrapper;
