import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import LockIcon from '@material-ui/icons/Lock';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import { useGetQuote } from '../../../helpers/hooks/useGetQuote';
import './dealer.css';
import axios from 'axios';
import { backend } from '../../../config';
import { useAuth } from '../../../auth/useAuth.jsx';

import Wrapper from '../../../components/Wrapper/wrapper.jsx';
import OptiStart from '../../../assets/img/optistart.png';

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
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [progressValues] = useState({
    purina: 100,
    ladrina: 30,
    extra: 0,
  });

  useEffect(() => {
    async function getUserInfo() {
      if (user) {
        const { data } = await axios.get(`${backend.url}/api/users/${user.id}`);
        setData({
          ...data,
        });
      }
    }
    getUserInfo();
  }, [user]);

  return data ? (
    <Wrapper>
      <div className="dealer">
        <div className="progress__data">
          <div className="card progress__info card--dealer">
            <h2 className="card__title card__title--white">Tu Avance</h2>
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
                    <div className="invoice-box">
                      <table cellPadding={0} cellSpacing={0}>
                        <thead>
                          <tr className="heading">
                            <td>Mes</td>
                            <td>Resultado</td>
                          </tr>
                          {data.resultsDealer.purina.map((result, index) => {
                            let resultClassName = 'item';
                            if (
                              index ===
                              data.resultsDealer.purina.length - 1
                            ) {
                              resultClassName = 'item last';
                            }
                            return (
                              <tr className={resultClassName} key={index}>
                                <td>{result.month}</td>
                                <td>
                                  <NumberFormat
                                    value={result.value}
                                    thousandSeparator={true}
                                    prefix={'$ '}
                                    displayType={'text'}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </thead>
                      </table>
                    </div>
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
                    <div className="progress__bar progress__bar--dealer">
                      <p className="progress__quote">
                        {/* {useGetQuote(progressValues.purina)} */}
                        Testing
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
                    <div className="invoice-box">
                      <table cellPadding={0} cellSpacing={0}>
                        <thead>
                          <tr className="heading">
                            <td>Mes</td>
                            <td>Resultado</td>
                          </tr>
                          {data.resultsDealer.ladrina.map((result, index) => {
                            let resultClassName = 'item';
                            if (
                              index ===
                              data.resultsDealer.ladrina.length - 1
                            ) {
                              resultClassName = 'item last';
                            }
                            return (
                              <tr className={resultClassName} key={index}>
                                <td>{result.month}</td>
                                <td>
                                  <NumberFormat
                                    value={result.value}
                                    thousandSeparator={true}
                                    prefix={'$ '}
                                    displayType={'text'}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </thead>
                      </table>
                    </div>
                  </div>
                  <div className="award-visual">
                    <div className="award-visual__img">
                      <img src={OptiStart} alt={OptiStart} />
                    </div>
                    <div className="progress__bar">
                      <p className="progress__quote">
                        {/* {useGetQuote(progressValues.ladrina)} */}
                        Testing 2
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
                <h3>Gatsy</h3>
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
                    <div className="invoice-box">
                      <table cellPadding={0} cellSpacing={0}>
                        <thead>
                          <tr className="heading">
                            <td>Mes</td>
                            <td>Resultado</td>
                          </tr>
                          {data.resultsDealer.gatsy.map((result, index) => {
                            let resultClassName = 'item';
                            if (index === data.resultsDealer.gatsy.length - 1) {
                              resultClassName = 'item last';
                            }
                            return (
                              <tr className={resultClassName} key={index}>
                                <td>{result.month}</td>
                                <td>
                                  <NumberFormat
                                    value={result.value}
                                    thousandSeparator={true}
                                    prefix={'$ '}
                                    displayType={'text'}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </thead>
                      </table>
                    </div>
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
                        {/* {useGetQuote(progressValues.extra)} */}
                        Testing 3
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
  ) : (
    <p>Cargando...</p>
  );
};

export default Dealer;
