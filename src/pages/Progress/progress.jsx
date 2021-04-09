import React from 'react';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import './progress.css';

import Wrapper from '../../components/Wrapper/wrapper.jsx';

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
  return (
    <Wrapper>
      <div>
        <div className="progress__data">
          <img src={OptiAge} alt={OptiAge} />
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
              <BorderLinearProgress
                variant="determinate"
                value={90}
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
  );
};

export default Progress;
