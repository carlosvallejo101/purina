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
import { formatNumber } from '../../helpers/formatNumber';

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

import ProgressBar from '../../components/ProgressBar/ProgressBar.jsx';
import QuarterlyTable from './components/QuarterlyTable.jsx';
import MonthlyTable from './components/MonthlyTable.jsx';

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

  const classTitle = 'tabs__title';
  const classTitleActive = 'tabs__title tabs-full__title--active';
  const [currentTab, setCurrentTab] = useState('abril');

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
        setProgressValue(formatNumber((total * 100) / objective, 0, 100));
      }
    }
    getGift();
    // eslint-disable-next-line
  }, [user]);

  const toggleTab = () => {
    switch (currentTab) {
      case 'trimestre':
        return <QuarterlyTable data={data} progressValue={progressValue} />;
      case 'abril':
        return <MonthlyTable month={0} data={data} />;
      case 'mayo':
        return <MonthlyTable month={1} data={data} />;
      case 'junio':
        return <MonthlyTable month={2} data={data} />;
      default:
        return null;
    }
  };

  return user ? (
    user.roles.includes('Normal') || user.roles.includes('Support') ? (
      data ? (
        <Wrapper>
          <div className="progress">
            <div className="progress__type progress__data">
              <div>
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
                  <div className="tabs">
                    <div className="tabs__container">
                      <h3
                        onClick={() => setCurrentTab('trimestre')}
                        className={
                          currentTab === 'trimestre'
                            ? classTitleActive
                            : classTitle
                        }
                      >
                        Trimestre
                      </h3>
                      <h3
                        onClick={() => setCurrentTab('abril')}
                        className={
                          currentTab === 'abril' ? classTitleActive : classTitle
                        }
                      >
                        Abril
                      </h3>
                      <h3
                        onClick={() => setCurrentTab('mayo')}
                        className={
                          currentTab === 'mayo' ? classTitleActive : classTitle
                        }
                      >
                        Mayo
                      </h3>
                      <h3
                        onClick={() => setCurrentTab('junio')}
                        className={
                          currentTab === 'junio' ? classTitleActive : classTitle
                        }
                      >
                        Junio
                      </h3>
                    </div>
                  </div>
                  {toggleTab()}
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
