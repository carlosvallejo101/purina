import React, { useState } from 'react';
import './results.css';

import Wrapper from '../../components/Wrapper/wrapper.jsx';

const Results = () => {
  const classTitle = 'tabs__title';
  const classTitleActive = 'tabs__title tabs__title--active';
  const [currentTab, setCurrentTab] = useState('objetivos');

  const toggleTab = () => {
    switch (currentTab) {
      case 'objetivos':
        return <Objetivos />;
      case 'resultados':
        return <Resultados />;
      default:
        return null;
    }
  };
  return (
    <Wrapper>
      <div className="results">
        <h2 className="results__title">Cargar Resultados</h2>
        <div className="results__body">
          <div className="tabs">
            <div className="tabs__container">
              <h3
                onClick={() => setCurrentTab('objetivos')}
                className={
                  currentTab === 'objetivos' ? classTitleActive : classTitle
                }
              >
                Objetivos
              </h3>
              <h3
                onClick={() => setCurrentTab('resultados')}
                className={
                  currentTab === 'resultados' ? classTitleActive : classTitle
                }
              >
                Resultados
              </h3>
            </div>
            {toggleTab()}
          </div>
          <div>
            <div className="results__table">
              <table cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr className="item">
                    <td>Objetivo Total: </td>
                    <td>5630 </td>
                  </tr>
                  <tr className="item last">
                    <td>Objetivo Trimestral: </td>
                    <td>693 </td>
                  </tr>
                  <tr className="item last">
                    <td></td>
                  </tr>
                  <tr className="heading">
                    <td>Usuario</td>
                    <td>Abril</td>
                    <td>Mayo</td>
                    <td>Junio</td>
                  </tr>
                  <tr className="item">
                    <td>Usuario Uno</td>
                    <td>320</td>
                    <td>320</td>
                    <td>320</td>
                  </tr>
                  <tr className="item">
                    <td>Usuario Dos</td>
                    <td>320</td>
                    <td>320</td>
                    <td>320</td>
                  </tr>
                  <tr className="item">
                    <td>Usuario Tres</td>
                    <td>320</td>
                    <td>320</td>
                    <td>320</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Objetivos = () => {
  return (
    <div>
      <div className="card card--small-padding">
        {/* <h2 className="card__title">Ingresa</h2> */}
        <div>
          <div className="label-container">
            <label>Objetivo Trimestral</label>
            <input type="number" />
          </div>
          <div className="label-container">
            <label>Objetivo Mensual</label>
            <input type="number" />
          </div>
          <button className="button">Guardar</button>
        </div>
      </div>
    </div>
  );
};

const Resultados = () => {
  return (
    <div>
      <div className="card card--small-padding">
        <div>
          <div className="label-container">
            <label>Mes</label>
            <input type="text" />
          </div>
          <div className="label-container">
            <label>Usuario</label>
            <input />
          </div>
          <div className="label-container">
            <label>Objetivo alcanzado</label>
            <input />
          </div>
          <button className="button">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default Results;
