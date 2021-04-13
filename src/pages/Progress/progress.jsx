import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import './progress.css';
import { useAuth } from '../../auth/useAuth.jsx';

import Wrapper from '../../components/Wrapper/wrapper.jsx';
import Home from '../Home/home.jsx';

import OptiAge from '../../assets/img/optiage.png';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#96D93B',
  },
}))(LinearProgress);

const Progress = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [progressValue] = useState(50);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    if (progressValue < 10) {
      setQuote('Apenas empiezas, ¡Ánimo!');
    }
    if (progressValue >= 10 && progressValue < 40) {
      setQuote('Vas por buen camino');
    }
    if (progressValue >= 40 && progressValue < 60) {
      setQuote('¡Ya estás por la mitad!');
    }
    if (progressValue >= 60 && progressValue < 80) {
      setQuote('¡El premio es casi tuyo!');
    }
    if (progressValue >= 80 && progressValue < 90) {
      setQuote('¡El premio es casi tuyo!');
    }
    if (progressValue >= 90) {
      setQuote('¡La meta está cerca!');
    }
  }, [progressValue]);

  return user ? (
    user.roles.includes('User') ? (
      <Wrapper>
        <div>
          <div className="progress__data">
            <div>
              <h3 className="progress__quote--white">
                Tu esfuerzo se transformará en este premio:
              </h3>
              <img src={OptiAge} alt={OptiAge} />
            </div>
            <div className="card progress__info">
              <h2 className="card__title">Tu Avance</h2>
              <div className="invoice-box">
                <table cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr className="item">
                      <td>Objetivo: </td>
                      <td>5630 </td>
                    </tr>
                    <tr className="heading">
                      <td>Mes</td>
                      <td>Resultado</td>
                    </tr>
                    <tr className="item">
                      <td>Abril</td>
                      <td>320</td>
                    </tr>
                    <tr className="item">
                      <td>Mayo</td>
                      <td>320</td>
                    </tr>
                    <tr className="item">
                      <td>Junio</td>
                      <td>320</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="progress__bar">
                <p className="progress__quote">{quote}</p>
                <BorderLinearProgress
                  variant="determinate"
                  value={progressValue}
                  thickness={50}
                />
              </div>
            </div>
          </div>
          <div className="progress__button">
            <button className="button" onClick={() => history.push('/home')}>
              Quiero cambiar de premio
            </button>
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

export default Progress;
