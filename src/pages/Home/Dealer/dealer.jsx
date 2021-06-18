import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import LockIcon from '@material-ui/icons/Lock';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import { getQuote } from '../../../helpers/getQuote';
import './dealer.css';
import axios from 'axios';
import { backendSQL } from '../../../config';
import { useAuth } from '../../../auth/useAuth.jsx';

import DealerWrapper from '../../../components/Wrapper/DealerWrapper.jsx';
import { getRemaining } from '../../../helpers/getRemaining';
import { getMonthName } from '../../../helpers/getMonthName';
import { formatNumber } from '../../../helpers/formatNumber';

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
    backgroundColor: '#00953B',
  },
}))(LinearProgress);

const Dealer = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ user: 1 });
  const [currentPoints, setCurrentPoints] = useState(null);
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

  useEffect(() => {
    async function getUserInfo() {
      if (user) {
        const currentMonth = new Date().getMonth() + 1;
        const { data: objectives } = await axios.get(
          `${backendSQL.url}/objectives?month=${currentMonth}&participantId=${user.id}`
        );

        let objectivePurina,
          objectiveLadrina,
          objectiveGatsy = 0;
        let totalPurina,
          totalLadrina,
          totalGatsy = 0;
        let remainingPurina,
          remainingLadrina,
          remainingGatsy = 0;

        objectives.forEach((objective) => {
          switch (objective.type) {
            case 'PURINA':
              objectivePurina = objective.value;
              totalPurina = objective.result.value;
              remainingPurina = getRemaining(objectivePurina, totalPurina);
              return;
            case 'LADRINA':
              objectiveLadrina = objective.value;
              totalLadrina = objective.result.value;
              remainingLadrina = getRemaining(objectiveLadrina, totalLadrina);
              return;
            case 'GATSY':
              objectiveGatsy = objective.value;
              totalGatsy = objective.result.value;
              remainingGatsy = getRemaining(objectiveGatsy, totalGatsy);
              return;
            default:
              return setData({ ...data });
          }
        });

        setData({
          ...data,
          totalPurina,
          totalLadrina,
          totalGatsy,
          objectivePurina,
          objectiveLadrina,
          objectiveGatsy,
          remainingPurina,
          remainingLadrina,
          remainingGatsy,
        });
        setProgressValues({
          purina: formatNumber((totalPurina * 100) / objectivePurina, 0, 100),
          ladrina: formatNumber(
            (totalLadrina * 100) / objectiveLadrina,
            0,
            100
          ),
          gatsy: formatNumber((totalGatsy * 100) / objectiveGatsy, 0, 100),
        });
        setWasObjectiveReached({
          purina: totalPurina >= objectivePurina ? true : false,
          ladrina:
            totalPurina >= objectivePurina && totalLadrina >= objectiveLadrina
              ? true
              : false,
          gatsy:
            totalPurina >= objectivePurina &&
            totalLadrina >= objectiveLadrina &&
            totalGatsy >= objectiveGatsy
              ? true
              : false,
        });
      }
    }
    getUserInfo();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (user) {
      axios
        .get(`${backendSQL.url}/transactions/points/${user.id}`)
        .then(({ data: points }) => {
          setCurrentPoints(points);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user]);

  return data ? (
    <DealerWrapper
      isDealer={true}
      dealerInfo={{ isInStore: false, availablePoints: currentPoints }}
    >
      <div className="dealer">
        <div className="progress__data progress__data--slim">
          <div className="card progress__info--dealer card--dealer">
            <h2 className="card__title card__title--blue">Tu Avance</h2>
            <div className="month-info">
              <p>Mes: {getMonthName(new Date().getMonth() + 1)}</p>
            </div>
            <div className="dealer-awards">
              <div className="award-container">
                {wasObjectiveReached.purina ? (
                  <BeenhereIcon
                    style={{
                      fill: '#00953B',
                      fontSize: '50px',
                    }}
                    className="hover-icon"
                  />
                ) : (
                  <LockIcon
                    style={{
                      fill: '#c53333',
                      fontSize: '50px',
                    }}
                    className="hover-icon"
                  />
                )}
                <h3>Dog Chow + Cat Chow</h3>
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
                  </div>
                  <div className="award-visual">
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
                {wasObjectiveReached.ladrina ? (
                  <BeenhereIcon
                    style={{
                      fill: '#00953B',
                      fontSize: '50px',
                    }}
                    className="hover-icon"
                  />
                ) : (
                  <LockIcon
                    style={{
                      fill: '#c53333',
                      fontSize: '50px',
                    }}
                    className="hover-icon"
                  />
                )}
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
                  </div>
                  <div className="award-visual">
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
                {wasObjectiveReached.gatsy ? (
                  <BeenhereIcon
                    style={{
                      fill: '#00953B',
                      fontSize: '50px',
                    }}
                    className="hover-icon"
                  />
                ) : (
                  <LockIcon
                    style={{
                      fill: '#c53333',
                      fontSize: '50px',
                    }}
                    className="hover-icon"
                  />
                )}
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
                  </div>
                  <div className="award-visual">
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
            </div>
          </div>
        </div>
      </div>
    </DealerWrapper>
  ) : (
    <p>Cargando...</p>
  );
};

export default Dealer;
