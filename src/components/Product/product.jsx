import React, { useState } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { IconButton } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { useAuth } from '../../auth/useAuth.jsx';
import axios from 'axios';
import { backend } from '../../config';
import Swal from 'sweetalert2';
import './product.css';
import { useHistory } from 'react-router-dom';

const Product = ({ image, data }) => {
  const { user } = useAuth();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    if (e.target.id === 'product') {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = async () => {
    try {
      const { status } = await axios.post(
        `${backend.url}/api/users/${user.id}`,
        {
          gift: data.slug,
        }
      );
      if (status === 200) {
        handleClose();
        Swal.fire(
          '¡Genial!',
          'Hemos reservado tu premio especialmente para ti',
          'success'
        ).then(() => {
          history.push('/progress');
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="product" id="product" onClick={handleOpen}>
      {data.isSelected && (
        <div className="icon">
          <IconButton>
            <CheckCircleIcon fontSize="large" style={{ color: '#9DF229' }} />
          </IconButton>
        </div>
      )}
      <img src={image} alt={image} />
      <Modal open={open} onClose={handleClose} style={{ overflow: 'scroll' }}>
        <div className={'product__modal'}>
          <img src={image} alt={image} />
          <div className="modal__info">
            <h2 className="modal__title">{data.title}</h2>
            <div>{data.description}</div>
          </div>
          <div className="modal__bottom">
            <button className="button button--success" onClick={handleSelect}>
              Quiero este premio
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Product;
