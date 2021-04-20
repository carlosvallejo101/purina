import React, { useEffect, useState } from 'react';
import '../Normal/normal.css';
import { useAuth } from '../../../auth/useAuth.jsx';
import axios from 'axios';
import { backend } from '../../../config';

import Wrapper from '../../../components/Wrapper/wrapper.jsx';
import Results from '../../Results/results.jsx';
import Product from '../../../components/Product/product.jsx';

import OptiAgeSupport from '../../../assets/img/optiage_support.png';
import OptiDermaSupport from '../../../assets/img/optiderma_support.png';
import OptiEnrichSupport from '../../../assets/img/optienrich_support.png';
import OptiFitSupport from '../../../assets/img/optifit_support.png';
import OptiFortisSupport from '../../../assets/img/optifortis_support.png';
import OptiHealthSupport from '../../../assets/img/optihealth_support.png';
import OptiStartSupport from '../../../assets/img/optistart_support.png';

const Home = () => {
  const { user } = useAuth();
  const [selectedGift, setSelectedGift] = useState(null);

  useEffect(() => {
    async function getGift() {
      if (user) {
        const { data } = await axios.get(`${backend.url}/api/users/${user.id}`);
        const selectedGif = data.gift;
        setSelectedGift(selectedGif);
      }
    }
    getGift();
  }, [user]);

  const products = [
    {
      image: OptiAgeSupport,
      data: {
        slug: 'optiage-support',
        title: 'OptiAge',
        description: (
          <div>
            <div>
              <h5 className="product__title">Sofá Reclinable</h5>
              <ul className="product__description">
                <li>Giratoria 360°</li>
                <li>Mecedora</li>
                <li>Reclinable</li>
              </ul>
            </div>
          </div>
        ),
        isSelected: selectedGift === 'optiage-support' ? true : false,
      },
    },
    {
      image: OptiDermaSupport,
      data: {
        slug: 'optiderma-support',
        title: 'OptiDerma',
        description: (
          <div>
            <div>
              <h5 className="product__title">Colchón Continental de Lujo</h5>
              <ul className="product__description">
                <li>2 1/2 Plaza</li>
                <li>Gris</li>
                <li>160 x 200 x 029</li>
              </ul>
            </div>
          </div>
        ),
        isSelected: selectedGift === 'optiderma-support' ? true : false,
      },
    },
    {
      image: OptiStartSupport,
      data: {
        slug: 'optistart-support',
        title: 'OptiStart',
        description: (
          <div>
            <div>
              <h5 className="product__title">Tablet XTRATECH</h5>
              <ul className="product__description">
                <li>RAM 2GB</li>
                <li>Almacenamiento 32GB</li>
                <li>Puerto microSD hasta 128GB</li>
                <li>Cámara 5MP + 5MP</li>
                <li>Pantalla 10.1" 800x1280 IPS / 450nits</li>
              </ul>
            </div>
          </div>
        ),
        isSelected: selectedGift === 'optistart-support' ? true : false,
      },
    },
    {
      image: OptiFitSupport,
      data: {
        slug: 'optifit-support',
        title: 'OptiFit',
        description: (
          <div>
            <div>
              <h5 className="product__title">Horno Tostador Cuisinart</h5>
              <ul className="product__description">
                <li>Airfryer</li>
                <li>Regulación temperatura</li>
                <li>Temporizador</li>
              </ul>
            </div>
          </div>
        ),
        isSelected: selectedGift === 'optifit-support' ? true : false,
      },
    },
    {
      image: OptiFortisSupport,
      data: {
        slug: 'optifortis-support',
        title: 'OptiFortis',
        description: (
          <div>
            <div>
              <h5 className="product__title">Hospedate Tanusas</h5>
              <ul className="product__description">
                <li>2 personas</li>
                <li>1 noche</li>
                <li>Hospedaje, instalaciones, desayuno</li>
              </ul>
            </div>
          </div>
        ),
        isSelected: selectedGift === 'optifortis-support' ? true : false,
      },
    },
    {
      image: OptiHealthSupport,
      data: {
        slug: 'optihealth-support',
        title: 'OptiHealth',
        description: (
          <div>
            <div>
              <h5 className="product__title">Portátil HP 240</h5>
              <ul className="product__description">
                <li>G7 Celeron N4020</li>
                <li>4GB DDR4</li>
                <li>500GB HDD</li>
                <li>3C Batería</li>
                <li>14 Pulgadas</li>
                <li>Windows 10</li>
              </ul>
            </div>
          </div>
        ),
        isSelected: selectedGift === 'optihealth-support' ? true : false,
      },
    },
    {
      image: OptiEnrichSupport,
      data: {
        slug: 'optienrich-support',
        title: 'OptiEnrich',
        description: (
          <div>
            <div>
              <h5 className="product__title">Smari Spa</h5>
              <ul className="product__description">
                <li>2 personas</li>
                <li>1 noche</li>
                <li>Hospedaje, instalaciones, desayuno</li>
              </ul>
            </div>
          </div>
        ),
        isSelected: selectedGift === 'optienrich-support' ? true : false,
      },
    },
  ];

  return user ? (
    user.roles.includes('Support') ? (
      <Wrapper>
        <div className="home">
          <h2 className="home__title">Selecciona el premio que más te guste</h2>
          <div className="products">
            {products.map((product, index) => (
              <Product image={product.image} key={index} data={product.data} />
            ))}
          </div>
        </div>
      </Wrapper>
    ) : (
      <Results />
    )
  ) : (
    <p>Cargando</p>
  );
};

export default Home;
