import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeenhereIcon from '@material-ui/icons/Beenhere';

import './store.css';
import { backendSQL } from '../../config';
import { useAuth } from '../../auth/useAuth.jsx';
import DealerWrapper from '../../components/Wrapper/DealerWrapper.jsx';

export const Store = () => {
  const { user, setUser } = useAuth();
  const [products, setProducts] = useState({});
  const [availablePoints, setAvailablePoints] = useState(null);
  const [remainingPoints, setRemainingPoints] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('purinaCart', JSON.stringify([]));
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
          setAvailablePoints(points);
          setCart(JSON.parse(localStorage.getItem('purinaCart') || []));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user]);

  useEffect(() => {
    if (cart) {
      updateRemainingPoints();
      localStorage.setItem('purinaCart', JSON.stringify(cart));
    }
    // eslint-disable-next-line
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

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const updateRemainingPoints = () => {
    const total = cart.reduce(function (prev, cur) {
      return prev + cur.cost;
    }, 0);
    setRemainingPoints(availablePoints - total);
  };

  return (
    <DealerWrapper
      isDealer={true}
      dealerInfo={{
        isInStore: true,
        availablePoints,
        remainingPoints,
        chosenAwards: cart ? cart.length : 0,
        cart,
        setCart,
        setUser,
      }}
    >
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
            <div className="store-product-items">
              {products.length > 0 &&
                cart &&
                products.map((product) => (
                  <div className="store-product" key={product.id}>
                    {cart.find((item) => item.id === product.id) && (
                      <BeenhereIcon
                        style={{
                          fill: '#96D93B',
                          fontSize: '50px',
                        }}
                        className="hover-icon"
                      />
                    )}
                    <div className="store-product-content">
                      <div className="store-product-img">
                        <img
                          // src={`${backendLala.url}/${product.imageName}`}
                          src={`https://clubderecicladores.com/uploads/awards/${product.imageName}`}
                          alt={product.imageName}
                        />
                      </div>
                      <div className="store-product-btns">
                        {cart.find((item) => item.id === product.id) ? (
                          <button
                            type="button"
                            className="btn-cart"
                            onClick={() => removeFromCart(product)}
                          >
                            remover
                            <span>
                              <i className="fas fa-plus" />
                            </span>
                          </button>
                        ) : (
                          <>
                            {parseFloat(
                              product.programAwardCosts[0].shopCost
                            ) <= parseFloat(remainingPoints) && (
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
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="store-product-info">
                      <div className="store-product-info-top">
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
                      <span className="store-product-name">{product.name}</span>
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
    </DealerWrapper>
  );
};
