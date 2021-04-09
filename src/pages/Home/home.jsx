import React from 'react';
import { useHistory } from 'react-router-dom';
import './home.css';

import Wrapper from '../../components/Wrapper/wrapper.jsx';
import Product from '../../components/Product/product.jsx';

import OptiAge from '../../assets/img/optiage.png';
import OptiDerma from '../../assets/img/optiderma.png';
import OptiEnrich from '../../assets/img/optienrich.png';
import OptiFit from '../../assets/img/optifit.png';
import OptiFortis from '../../assets/img/optifortis.png';
import OptiHealth from '../../assets/img/optihealth.png';
import OptiStart from '../../assets/img/optistart.png';

const products = [
  OptiAge,
  OptiDerma,
  OptiEnrich,
  OptiFit,
  OptiFortis,
  OptiHealth,
  OptiStart,
];

const Home = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <div>
        <h2 className="card__title">Home</h2>
        <div className="products">
          {products.map((product) => (
            <Product image={product} key={product} />
          ))}
        </div>
        <div className="home__button">
          <button className="button" onClick={() => history.push('/progress')}>
            Guardar
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
