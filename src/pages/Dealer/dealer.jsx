import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import LockIcon from '@material-ui/icons/Lock';
import { withStyles } from '@material-ui/core/styles';
import './dealer.css';

import OptiStart from '../../assets/img/optistart.png';

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

const Dealer = () => {
  return (
    <div className="progress">
      <div className="progress__data">
        <div className="card progress__info">
          <h2 className="card__title">Tu Avance</h2>
          <div className="dealer-awards">
            <div className="award-container">
              <h3>Purina</h3>
              <div className="award-info">
                <div className="award-progress">
                  <table className="award-table">
                    <thead>
                      <tr className="item">
                        <td>Tu objetivo trimestral: </td>
                        <td>600</td>
                      </tr>
                      <tr className="item">
                        <td>Resultado acumulado: </td>
                        <td>600</td>
                      </tr>
                      <tr className="item last">
                        <td>Te falta: </td>
                        <td>0</td>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="award-visual">
                  <div className="award-visual__img">
                    <img src={OptiStart} alt={OptiStart} />
                    <div className="award-visual__hover">
                      <BeenhereIcon
                        style={{
                          fill: '#96D93B',
                          fontSize: '50px',
                        }}
                      />
                    </div>
                  </div>
                  <div className="progress__bar-container">
                    <div>
                      <BorderLinearProgress
                        variant="determinate"
                        value={100}
                        thickness={50}
                      />
                    </div>
                    <p>100%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="award-container">
              <h3>Ladrina</h3>
              <div className="award-info">
                <div className="award-progress">
                  <table className="award-table">
                    <thead>
                      <tr className="item">
                        <td>Tu objetivo trimestral: </td>
                        <td>600</td>
                      </tr>
                      <tr className="item">
                        <td>Resultado acumulado: </td>
                        <td>300</td>
                      </tr>
                      <tr className="item last">
                        <td>Te falta: </td>
                        <td>200</td>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="award-visual">
                  <div className="award-visual__img">
                    <img src={OptiStart} alt={OptiStart} />
                  </div>
                  <div className="progress__bar-container">
                    <div>
                      <BorderLinearProgress
                        variant="determinate"
                        value={30}
                        thickness={50}
                      />
                    </div>
                    <p>30%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="award-container">
              <h3>Extra</h3>
              <div className="award-info">
                <div className="award-progress">
                  <table className="award-table">
                    <thead>
                      <tr className="item">
                        <td>Tu objetivo trimestral: </td>
                        <td>600</td>
                      </tr>
                      <tr className="item">
                        <td>Resultado acumulado: </td>
                        <td>0</td>
                      </tr>
                      <tr className="item last">
                        <td>Te falta: </td>
                        <td>600</td>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="award-visual">
                  <div className="award-visual__img">
                    <img src={OptiStart} alt={OptiStart} />
                    <div className="award-visual__hover">
                      <LockIcon
                        style={{
                          fill: '#c53333',
                          fontSize: '50px',
                        }}
                      />
                    </div>
                  </div>
                  <div className="progress__bar-container">
                    <div>
                      <BorderLinearProgress
                        variant="determinate"
                        value={0}
                        thickness={50}
                      />
                    </div>
                    <p>0%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dealer;
