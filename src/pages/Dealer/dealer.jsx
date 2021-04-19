import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import LockIcon from '@material-ui/icons/Lock';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import { useGetQuote } from '../../helpers/hooks/useGetQuote';
import './dealer.css';

import Wrapper from '../../components/Wrapper/wrapper.jsx';
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
  const [progressValues] = useState({
    purina: 100,
    ladrina: 30,
    extra: 0,
  });

  return (
    <Wrapper>
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
                          <td>
                            <NumberFormat
                              value={6000}
                              thousandSeparator={true}
                              prefix={'$ '}
                              displayType={'text'}
                            />
                          </td>
                        </tr>
                        <tr className="item">
                          <td>Resultado acumulado: </td>
                          <td>
                            <NumberFormat
                              value={6000}
                              thousandSeparator={true}
                              prefix={'$ '}
                              displayType={'text'}
                            />
                          </td>
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
                    <div className="progress__bar">
                      <p className="progress__quote">
                        {useGetQuote(progressValues.purina)}
                      </p>
                      <div className="progress__bar-container">
                        <div>
                          <BorderLinearProgress
                            variant="determinate"
                            value={progressValues.purina}
                            thickness={50}
                          />
                        </div>
                        <p>{progressValues.purina}%</p>
                      </div>
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
                          <td>
                            <NumberFormat
                              value={7000}
                              thousandSeparator={true}
                              prefix={'$ '}
                              displayType={'text'}
                            />
                          </td>
                        </tr>
                        <tr className="item">
                          <td>Resultado acumulado: </td>
                          <td>
                            <NumberFormat
                              value={1200}
                              thousandSeparator={true}
                              prefix={'$ '}
                              displayType={'text'}
                            />
                          </td>
                        </tr>
                        <tr className="item last">
                          <td>Te falta: </td>
                          <td>
                            <NumberFormat
                              value={5800}
                              thousandSeparator={true}
                              prefix={'$ '}
                              displayType={'text'}
                            />
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div className="award-visual">
                    <div className="award-visual__img">
                      <img src={OptiStart} alt={OptiStart} />
                    </div>
                    <div className="progress__bar">
                      <p className="progress__quote">
                        {useGetQuote(progressValues.ladrina)}
                      </p>
                      <div className="progress__bar-container">
                        <div>
                          <BorderLinearProgress
                            variant="determinate"
                            value={progressValues.ladrina}
                            thickness={50}
                          />
                        </div>
                        <p>{progressValues.ladrina}%</p>
                      </div>
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
                          <td>
                            <NumberFormat
                              value={9000}
                              thousandSeparator={true}
                              prefix={'$ '}
                              displayType={'text'}
                            />
                          </td>
                        </tr>
                        <tr className="item">
                          <td>Resultado acumulado: </td>
                          <td>
                            <NumberFormat
                              value={0}
                              thousandSeparator={true}
                              prefix={'$ '}
                              displayType={'text'}
                            />
                          </td>
                        </tr>
                        <tr className="item last">
                          <td>Te falta: </td>
                          <td>
                            <NumberFormat
                              value={9000}
                              thousandSeparator={true}
                              prefix={'$ '}
                              displayType={'text'}
                            />
                          </td>
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
                    <div className="progress__bar">
                      <p className="progress__quote">
                        {useGetQuote(progressValues.extra)}
                      </p>
                      <div className="progress__bar-container">
                        <div>
                          <BorderLinearProgress
                            variant="determinate"
                            value={progressValues.extra}
                            thickness={50}
                          />
                        </div>
                        <p>{progressValues.extra}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dealer;
