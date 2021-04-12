import React, { useState } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { IconButton } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import './product.css';

const Product = ({ image, data }) => {
  // const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="product">
      {data.isSelected && (
        <div className="icon">
          <IconButton>
            <CheckCircleIcon fontSize="large" style={{ color: '#9DF229' }} />
          </IconButton>
        </div>
      )}
      <img src={image} alt={image} onClick={handleOpen} />
      <Modal open={open} onClose={handleClose}>
        <div className={'product__modal'}>
          <img src={image} alt={image} />
          <div className="modal__info">
            <h2 className="modal__title">{data.title}</h2>
            <div>{data.description}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Product;
