import React, { useState } from 'react';
import './results.css';
import { useAuth } from '../../auth/useAuth.jsx';

import Wrapper from '../../components/Wrapper/wrapper.jsx';
import Home from '../Home/home.jsx';
import LoadNormal from './LoadNormal/loadNormal.jsx';
import LoadSupport from './LoadSupport/loadSupport.jsx';
import LoadDealer from './LoadDealer/loadDealer.jsx';

const Results = () => {
  const { user } = useAuth();
  const classTitle = 'tabs__title';
  const classTitleActive = 'tabs__title tabs-full__title--active';
  const [currentTab, setCurrentTab] = useState('Dealer');

  const toggleTab = () => {
    switch (currentTab) {
      case 'Normal':
        return <LoadNormal />;
      case 'Support':
        return <LoadSupport />;
      case 'Dealer':
        return <LoadDealer />;
      default:
        return null;
    }
  };
  return user ? (
    user.roles.includes('Admin') ? (
      <Wrapper>
        <div className="results">
          <h2 className="results__title card__title--white">
            Carga de Información
          </h2>
          <div className="results__body">
            <div className="tabs">
              <div className="tabs__container">
                <h3
                  onClick={() => setCurrentTab('Normal')}
                  className={
                    currentTab === 'Normal' ? classTitleActive : classTitle
                  }
                >
                  Común
                </h3>
                <h3
                  onClick={() => setCurrentTab('Support')}
                  className={
                    currentTab === 'Support' ? classTitleActive : classTitle
                  }
                >
                  Soporte
                </h3>
                <h3
                  onClick={() => setCurrentTab('Dealer')}
                  className={
                    currentTab === 'Dealer' ? classTitleActive : classTitle
                  }
                >
                  Distribuidores
                </h3>
              </div>
              {toggleTab()}
            </div>
          </div>
        </div>
      </Wrapper>
    ) : (
      <Home />
    )
  ) : (
    <p>Cargando</p>
  );
};

export default Results;
