import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import LockIcon from '@material-ui/icons/Lock';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import { getQuote } from '../../../helpers/getQuote';
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
  const [data, setData] = useState({ user: 1 });
  const [progressValues, setProgressValues] = useState({
    purina: 0,
    ladrina: 0,
    gatsy: 0,
  });
  const [wasObjectiveReached, setWasObjectiveReached] = useState({
    purina: false,
    ladrina: false,
    gatsy: false,
  });

  // useEffect(() => {
  //   async function getUserInfo() {
  //     if (user) {
  //       const { data } = await axios.get(`${backend.url}/api/users/${user.id}`);
  //       const totalPurina = data.resultsDealer.purina.reduce((acum, result) => {
  //         return acum + result.value;
  //       }, 0);
  //       const totalLadrina = data.resultsDealer.ladrina.reduce(
  //         (acum, result) => {
  //           return acum + result.value;
  //         },
  //         0
  //       );
  //       const totalGatsy = data.resultsDealer.gatsy.reduce((acum, result) => {
  //         return acum + result.value;
  //       }, 0);
  //       const objectivePurina = data.objectivesDealer.purina.reduce(
  //         (acum, result) => {
  //           return acum + result.value;
  //         },
  //         0
  //       );
  //       const objectiveLadrina = data.objectivesDealer.ladrina.reduce(
  //         (acum, result) => {
  //           return acum + result.value;
  //         },
  //         0
  //       );
  //       const objectiveGatsy = data.objectivesDealer.gatsy.reduce(
  //         (acum, result) => {
  //           return acum + result.value;
  //         },
  //         0
  //       );
  //       setData({
  //         ...data,
  //         totalPurina,
  //         totalLadrina,
  //         totalGatsy,
  //         objectivePurina,
  //         objectiveLadrina,
  //         objectiveGatsy,
  //         remainingPurina:
  //           objectivePurina - totalPurina < 0
  //             ? 0
  //             : objectivePurina - totalPurina,
  //         remainingLadrina:
  //           objectiveLadrina - totalLadrina < 0
  //             ? 0
  //             : objectiveLadrina - totalLadrina,
  //         remainingGatsy:
  //           objectiveGatsy - totalGatsy < 0 ? 0 : objectiveGatsy - totalGatsy,
  //       });
  //       setProgressValues({
  //         purina:
  //           ((totalPurina * 100) / objectivePurina).toFixed(0) >= 100
  //             ? 100
  //             : ((totalPurina * 100) / objectivePurina).toFixed(0),
  //         ladrina:
  //           ((totalLadrina * 100) / objectiveLadrina).toFixed(0) >= 100
  //             ? 100
  //             : ((totalLadrina * 100) / objectiveLadrina).toFixed(0),
  //         gatsy:
  //           ((totalGatsy * 100) / objectiveGatsy).toFixed(0) >= 100
  //             ? 100
  //             : ((totalGatsy * 100) / objectiveGatsy).toFixed(0),
  //       });
  //       setWasObjectiveReached({
  //         purina: totalPurina >= objectivePurina ? true : false,
  //         ladrina:
  //           totalPurina >= objectivePurina && totalLadrina >= objectiveLadrina
  //             ? true
  //             : false,
  //         gatsy:
  //           totalPurina >= objectivePurina &&
  //           totalLadrina >= objectiveLadrina &&
  //           totalGatsy >= objectiveGatsy
  //             ? true
  //             : false,
  //       });
  //     }
  //   }
  //   getUserInfo();
  // }, [user]);

  return data ? (
    <Wrapper>
      <div className="dealer">
        <div className="progress__data">
          <div className="card progress__info--dealer card--dealer">
            <h2 className="card__title card__title--white">Tu Avance</h2>
            {/* <div className="dealer-awards">
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
                              value={data.objectivePurina}
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
                              value={data.totalPurina}
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
                              value={data.remainingPurina}
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
                      {wasObjectiveReached.purina ? (
                        <div className="award-visual__hover">
                          <BeenhereIcon
                            style={{
                              fill: '#96D93B',
                              fontSize: '50px',
                            }}
                          />
                        </div>
                      ) : (
                        <div className="award-visual__hover award-visual__hover--locked">
                          <LockIcon
                            style={{
                              fill: '#c53333',
                              fontSize: '50px',
                            }}
                          />{' '}
                        </div>
                      )}
                    </div>
                    <div className="progress__bar progress__bar--dealer">
                      <p className="progress__quote">
                        {getQuote(progressValues.purina)}
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
                              value={data.objectiveLadrina}
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
                              value={data.totalLadrina}
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
                              value={data.remainingLadrina}
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
                      {wasObjectiveReached.ladrina ? (
                        <div className="award-visual__hover">
                          <BeenhereIcon
                            style={{
                              fill: '#96D93B',
                              fontSize: '50px',
                            }}
                          />
                        </div>
                      ) : (
                        <div className="award-visual__hover award-visual__hover--locked">
                          <LockIcon
                            style={{
                              fill: '#c53333',
                              fontSize: '50px',
                            }}
                          />{' '}
                        </div>
                      )}
                    </div>
                    <div className="progress__bar">
                      <p className="progress__quote">
                        {getQuote(progressValues.ladrina)}
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
                              value={data.objectiveGatsy}
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
                              value={data.totalGatsy}
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
                              value={data.remainingGatsy}
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
                      {wasObjectiveReached.gatsy ? (
                        <div className="award-visual__hover">
                          <BeenhereIcon
                            style={{
                              fill: '#96D93B',
                              fontSize: '50px',
                            }}
                          />
                        </div>
                      ) : (
                        <div className="award-visual__hover award-visual__hover--locked">
                          <LockIcon
                            style={{
                              fill: '#c53333',
                              fontSize: '50px',
                            }}
                          />{' '}
                        </div>
                      )}
                    </div>
                    <div className="progress__bar">
                      <p className="progress__quote">
                        {getQuote(progressValues.gatsy)}
                      </p>
                      <div className="progress__bar-container">
                        <div>
                          <BorderLinearProgress
                            variant="determinate"
                            value={progressValues.gatsy}
                            thickness={50}
                          />
                        </div>
                        <p>{progressValues.gatsy}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Wrapper>
  ) : (
    <p>Cargando...</p>
  );
};

export default Dealer;
