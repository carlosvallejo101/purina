import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

import { backendSQL } from '../../config';
import { useAuth } from '../../auth/useAuth.jsx';
import './header-dealer.css';
// import LogoProplan from '../../assets/img/logo_proplan.png';
import LogoConquista from '../../assets/img/logo_conquista-dealer.png';

const DealerHeader = ({ dealerInfo }) => {
  const { user } = useAuth();
  const {
    isInStore,
    availablePoints,
    remainingPoints,
    chosenAwards,
    cart,
    setCart,
    setUser,
  } = dealerInfo;

  const showDialog = () => {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Una vez hecho el pedido no podrás cambiarlo.',
      icon: 'warning',
      type: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#a5dc86',
      confirmButtonColor: '#00953B',
      confirmButtonText: 'Si, enviar pedido.',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) confirmRequest();
      if (result.dismiss) declineRequest();
    });
  };

  const confirmRequest = () => {
    if (cart && user) {
      cart.map((cartItem) => {
        const item = {
          awardId: cartItem.id,
          participantId: user.id,
        };
        console.log('item', item);
        axios
          .post(`${backendSQL.url}/participant-requests`, item)
          .then((res) => {
            localStorage.setItem('purinaCart', JSON.stringify([]));
            setCart([]);
            setUser(user);
            Swal.fire(
              '¡Pedido enviado!',
              'Tu pedido ha sido enviado exitosamente',
              'success'
            );
          })
          .catch((e) => {
            console.log(e);
            Swal.fire(
              'Error',
              'Lo sentimos, hubo un error, inténtalo más tarde.',
              'error'
            );
          });
      });
    }
  };

  const declineRequest = () => {
    console.log('Pedido rechazado');
  };

  return (
    <div className="header-dealer">
      <img src={LogoConquista} alt="logo" />
      <div className="header-info">
        {user && <h2>Hola! {user.name.split(' ')[0]}</h2>}
        <p>Puntos Disponibles: {availablePoints}</p>
        {!isInStore ? (
          <Link className="dealer-store__button" to="/store">
            Visitar Tienda
          </Link>
        ) : (
          <>
            <p>Puntos Restantes: {remainingPoints}</p>
            <p>Premios Seleccionados: {chosenAwards}</p>
            {cart && cart.length > 0 && (
              <>
                <button
                  className="dealer-store__button--confirm"
                  onClick={showDialog}
                >
                  Finalizar Pedido
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DealerHeader;
