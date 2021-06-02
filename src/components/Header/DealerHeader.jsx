import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth.jsx';
import './header-dealer.css';

import LogoProplan from '../../assets/img/logo_proplan.png';

const DealerHeader = ({ dealerInfo }) => {
  const { user } = useAuth();
  const { isInStore, availablePoints, remainingPoints, chosenAwards } =
    dealerInfo;
  return (
    <div className="header-dealer">
      <img src={LogoProplan} alt="logo" />
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
            <p>Premios escogidos: {chosenAwards}</p>
            <Link className="dealer-store__button" to="/home">
              Finalizar Pedido
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default DealerHeader;
