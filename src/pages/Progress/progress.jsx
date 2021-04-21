import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import './progress.css';
import { useAuth } from '../../auth/useAuth.jsx';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import { backend } from '../../config';
import { getQuote } from '../../helpers/getQuote';

import Wrapper from '../../components/Wrapper/wrapper.jsx';
import Home from '../Home/home.jsx';

import OptiAge from '../../assets/img/optiage.png';
import OptiDerma from '../../assets/img/optiderma.png';
import OptiEnrich from '../../assets/img/optienrich.png';
import OptiFit from '../../assets/img/optifit.png';
import OptiFortis from '../../assets/img/optifortis.png';
import OptiHealth from '../../assets/img/optihealth.png';
import OptiStart from '../../assets/img/optistart.png';
import OptiAgeSupport from '../../assets/img/optiage_support.png';
import OptiDermaSupport from '../../assets/img/optiderma_support.png';
import OptiEnrichSupport from '../../assets/img/optienrich_support.png';
import OptiFitSupport from '../../assets/img/optifit_support.png';
import OptiFortisSupport from '../../assets/img/optifortis_support.png';
import OptiHealthSupport from '../../assets/img/optihealth_support.png';
import OptiStartSupport from '../../assets/img/optistart_support.png';

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
  const [progressValue, setProgressValue] = useState(0);
  const [data, setData] = useState();

  useEffect(() => {
    async function getGift() {
      if (user) {
        const { data } = await axios.get(`${backend.url}/api/users/${user.id}`);
        const total = data.resultsNormalSupport.reduce((acum, result) => {
          return acum + result.value;
        }, 0);
        const objective = data.objectivesNormalSupport.reduce(
          (acum, result) => {
            return acum + result.value;
          },
          0
        );
        setData({
          ...data,
          total,
          objective,
          remaining: objective - total,
        });
        setProgressValue(((total * 100) / objective).toFixed(0));
      }
    }
    getGift();
  }, [user]);

  // let quote = useGetQuote(progressValue);

  return user ? (
    user.roles.includes('Normal') || user.roles.includes('Support') ? (
      data ? (
        <Wrapper>
          <div className="progress">
            <div className="progress__data">
              <div className="progress__data-left">
                <h3 className="progress__quote--white">
                  Tu esfuerzo se transformará en este premio:
                </h3>
                <img src={renderGift(data.gift)} alt={OptiAge} />
                <div className="progress__button">
                  <button
                    className="button"
                    onClick={() => history.push('/home')}
                  >
                    Quiero cambiar de premio
                  </button>
                </div>
              </div>
              <div className="card progress__info">
                <h2 className="card__title">Tu Avance</h2>
                <div className="invoice-box">
                  <table cellPadding={0} cellSpacing={0}>
                    <thead>
                      <tr className="item">
                        <td>Tu objetivo trimestral: </td>
                        <td>
                          <NumberFormat
                            value={data.objective}
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
                            value={data.total}
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
                            value={data.remaining}
                            thousandSeparator={true}
                            prefix={'$ '}
                            displayType={'text'}
                          />
                        </td>
                      </tr>
                      <tr className="heading">
                        <td>Mes</td>
                        <td>Resultado</td>
                      </tr>
                      {data.resultsNormalSupport.map((result, index) => {
                        let resultClassName = 'item';
                        if (index === data.resultsNormalSupport.length - 1) {
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
                <div className="progress__bar">
                  <p className="progress__quote">
                    {getQuote(parseInt(progressValue))}
                  </p>
                  <div className="progress__bar-container">
                    <div>
                      <BorderLinearProgress
                        variant="determinate"
                        value={parseInt(progressValue)}
                        thickness={50}
                      />
                    </div>
                    <p>{progressValue}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      ) : (
        <p>Cargando...</p>
      )
    ) : (
      <Home />
    )
  ) : (
    <p>Cargando</p>
  );
};

const renderGift = (slug) => {
  switch (slug) {
    case 'optiage':
      return OptiAge;
    case 'optiderma':
      return OptiDerma;
    case 'optienrich':
      return OptiEnrich;
    case 'optifit':
      return OptiFit;
    case 'optifortis':
      return OptiFortis;
    case 'optihealth':
      return OptiHealth;
    case 'optistart':
      return OptiStart;
    case 'optiage-support':
      return OptiAgeSupport;
    case 'optiderma-support':
      return OptiDermaSupport;
    case 'optienrich-support':
      return OptiEnrichSupport;
    case 'optifit-support':
      return OptiFitSupport;
    case 'optifortis-support':
      return OptiFortisSupport;
    case 'optihealth-support':
      return OptiHealthSupport;
    case 'optistart-support':
      return OptiStartSupport;
    default:
      return OptiAge;
  }
};

export default Progress;
