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
  {
    image: OptiAge,
    data: {
      slug: 'optiage',
      title: 'OptiAge',
      description: (
        <div>
          <div>
            <h5 className="product__title">Camiseta Selección del Ecuador</h5>
            <ul className="product__description">
              <li>Tecnología Hydrotech</li>
              <li>Control de sudor</li>
              <li>Sin humedad</li>
            </ul>
          </div>
          <div>
            <h5 className="product__title">Sofá Reclinable</h5>
            <ul className="product__description">
              <li>Giratoria 360°</li>
              <li>Mecedora</li>
              <li>Reclinable</li>
            </ul>
          </div>
          <div>
            <h5 className="product__title">Canal de Fútbol</h5>
            <ul className="product__description">
              <li>Membresía de 12 meses</li>
            </ul>
          </div>
        </div>
      ),
      isSelected: false,
    },
  },
  {
    image: OptiDerma,
    data: {
      slug: 'optiderma',
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
          <div>
            <h5 className="product__title">2 Almohadas</h5>
            <ul className="product__description">
              <li>50 x 50</li>
              <li>Protectores</li>
            </ul>
          </div>
          <div>
            <h5 className="product__title">Cobertor Standford</h5>
            <ul className="product__description">
              <li>2 1/2 Plazas</li>
              <li>Sábanas</li>
              <li>Jackuard 100% algodón</li>
              <li>Cojines Jackuard 100% algodón</li>
              <li>Forro bramante 144 hilos Polialgodón + 1 Sábana</li>
              <li>205 x 240</li>
            </ul>
          </div>
        </div>
      ),
      isSelected: false,
    },
  },
  {
    image: OptiEnrich,
    data: {
      slug: 'optienrich',
      title: 'OptiEnrich',
      description: (
        <div>
          <div>
            <h5 className="product__title">Chompa The North Face</h5>
            <ul className="product__description">
              <li>Ajuste cómodo</li>
              <li>100% Cortavientos e impermiable</li>
              <li>Capota fija y ajustable</li>
              <li>Solapa frontal con ajuste de Velcro</li>
              <li>Se guarda en su propio bolsillo</li>
              <li>Sistema Pit-Zip con cremalleras en las axilas</li>
              <li>Ajuste con Velcro en las mangas</li>
              <li>Cordón de ajuste en el dobladillo</li>
            </ul>
          </div>
          <div>
            <h5 className="product__title">Smari Spa</h5>
            <ul className="product__description">
              <li>2 personas</li>
              <li>1 noche</li>
              <li>Hospedaje, instalaciones, desayuno</li>
            </ul>
          </div>
          <div>
            <h5 className="product__title">Maleta The North Face</h5>
            <ul className="product__description">
              <li>Diseño clásico</li>
              <li>Perfecta para campamento</li>
            </ul>
          </div>
        </div>
      ),
      isSelected: false,
    },
  },
  {
    image: OptiFit,
    data: {
      slug: 'optifit',
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
          <div>
            <h5 className="product__title">Licuadora Cuisinart</h5>
            <ul className="product__description">
              <li>7 velocidades, contról tactil</li>
              <li>Jarra de vidrio 1.4lts</li>
              <li>Boquilla antigoteo</li>
            </ul>
          </div>
          <div>
            <h5 className="product__title">Juego de cuchillos Cuisinart</h5>
            <ul className="product__description">
              <li>7 Piezas</li>
              <li>Mango suave, antideslizante y cómodo</li>
              <li>
                Soporte acrílico con panel desmontable para fácil limpieza
              </li>
            </ul>
          </div>
        </div>
      ),
      isSelected: false,
    },
  },
  {
    image: OptiFortis,
    data: {
      slug: 'optifortis',
      title: 'OptiFortis',
      description: (
        <div>
          <div>
            <h5 className="product__title">Maleta The North Face</h5>
            <ul className="product__description">
              <li>Maleta diseño clásico</li>
              <li>Perfecta para un viaje de corta duración</li>
            </ul>
          </div>
          <div>
            <h5 className="product__title">Hospedate Tanusas</h5>
            <ul className="product__description">
              <li>2 personas</li>
              <li>1 noche</li>
              <li>Hospedaje, instalaciones, desayuno</li>
            </ul>
          </div>
          <div>
            <h5 className="product__title">Cooler</h5>
            <ul className="product__description">
              <li>45 litros</li>
              <li>Marca Igloo</li>
              <li>Ideal para un día de playa o de picnic</li>
            </ul>
          </div>
        </div>
      ),
      isSelected: true,
    },
  },
  {
    image: OptiHealth,
    data: {
      slug: 'optihealth',
      title: 'OptiHealth',
      description: (
        <div>
          <div>
            <h5 className="product__title">Porátil HP 240</h5>
            <ul className="product__description">
              <li>G7 Celeron N4020</li>
              <li>4GB DDR4</li>
              <li>500GB HDD</li>
              <li>3C Batería</li>
              <li>14 Pulgadas</li>
              <li>Windows 10</li>
            </ul>
          </div>
          <div>
            <h5 className="product__title">Impresora HP 2375</h5>
            <ul className="product__description">
              <li>Color</li>
              <li>Deskjet Advantage</li>
              <li>7.5 PPM 5.5PPM</li>
            </ul>
          </div>
        </div>
      ),
      isSelected: false,
    },
  },
  {
    image: OptiStart,
    data: {
      slug: 'optistart',
      title: 'OptiStart',
      description: (
        <div>
          <div>
            <h5 className="product__title">Silla Giratoria Ejecutiva</h5>
            <ul className="product__description">
              <li>Altura ajustable</li>
              <li>Apoyabrazos aluminio/nylon fijos</li>
              <li>Apoyo lumbar fijo</li>
              <li>Giro 180°</li>
            </ul>
          </div>
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
          <div>
            <h5 className="product__title">
              Audífonos SONY Inalámbricos con Bluetooth
            </h5>
            <ul className="product__description">
              <li>Extra Bass WH-XB700</li>
              <li>Claridad vocal, conexión Bluetooth</li>
              <li>Batería de larga duración</li>
              <li>Diseño elegante</li>
              <li>Comodidad y funcionalidad máximas</li>
            </ul>
          </div>
        </div>
      ),
      isSelected: false,
    },
  },
];

const Home = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <div>
        <h2 className="card__title">Home</h2>
        <div className="products">
          {products.map((product) => (
            <Product image={product.image} key={product} data={product.data} />
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
