import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './store.css';
import { backendSQL } from '../../config';
import { useAuth } from '../../auth/useAuth.jsx';
import Wrapper from '../../components/Wrapper/wrapper.jsx';

export const Store = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState({});
  const [remainingPoints, setRemainingPoints] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `${backendSQL.url}/awards?awardSubcategoryId=98&participantId=${user.id}`
        )
        .then(({ data }) => {
          setProducts(data);
        })
        .catch((e) => {
          console.log(e);
        });
      axios
        .get(`${backendSQL.url}/transactions/points/${user.id}`)
        .then(({ data: points }) => {
          setRemainingPoints(points);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user]);

  useEffect(() => {
    updateRemainingPoints();
  }, [cart]);

  const addToCart = (product) => {
    setCart([
      ...cart,
      {
        id: product.id,
        name: product.name,
        imageName: product.imageName,
        cost: parseInt(product.programAwardCosts[0].shopCost),
      },
    ]);
  };

  const updateRemainingPoints = () => {
    cart.map((item) => {
      setRemainingPoints(remainingPoints - item.cost);
    });
  };

  return (
    <Wrapper>
      <div className="store">
        <div className="store-products">
          <div className="container">
            <h1 className="lg-title">Productos Especiales Para Ti</h1>
            <p className="text-light">
              Los productos que verás a continuación están adecuados a tus
              puntos ganados. Puedes escoger todos los que desees mientras estén
              en el rango de puntos. <br /> Si finalizaste puedes regresar a
              revisar tu pedido para poder finalizarlo.
            </p>
            <div className="store-points">
              <p>Puntos restantes: {remainingPoints}</p>
              <Link to="/home" className="store-points__button">
                Revisar Pedido
              </Link>
            </div>
            <div className="store-product-items">
              {products.length > 0 &&
                products.map((product) => (
                  <div className="store-product" key={product.id}>
                    <div className="store-product-content">
                      <div className="store-product-img">
                        <img src={product.imageName} alt={product.imageName} />
                      </div>
                      <div className="store-product-btns">
                        <button
                          type="button"
                          className="btn-cart"
                          onClick={() => addToCart(product)}
                        >
                          añadir al carrito
                          <span>
                            <i className="fas fa-plus" />
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="store-product-info">
                      <div className="store-product-info-top">
                        {/* <h2 className="sm-title">Purina</h2> */}
                        <div className="rating">
                          <span>
                            <i className="fas fa-star" />
                          </span>
                          <span>
                            <i className="fas fa-star" />
                          </span>
                          <span>
                            <i className="fas fa-star" />
                          </span>
                          <span>
                            <i className="fas fa-star" />
                          </span>
                          <span>
                            <i className="far fa-star" />
                          </span>
                        </div>
                      </div>
                      <a className="store-product-name">{product.name}</a>
                      <p className="store-product-price">
                        Puntos: {product.programAwardCosts[0].shopCost}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
