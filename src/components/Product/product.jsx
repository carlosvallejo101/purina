import React, { useState } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { IconButton } from '@material-ui/core';
import './product.css';

const Product = ({ image }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div className="product">
      <div className="icon">
        <IconButton>
          <CheckCircleIcon fontSize="large" style={{ color: '#9DF229' }} />
        </IconButton>
      </div>
      <img src={image} alt={image} />
    </div>
  );
};

export default Product;
