import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './store.css';
import { backendSQL } from '../../config';
import { useAuth } from '../../auth/useAuth.jsx';
import Wrapper from '../../components/Wrapper/wrapper.jsx';

export const Store = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState({});

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
    }
  }, [user]);

  return (
    <Wrapper>
      <div className="store">
        <div className="store-products">
          <div className="container">
            {/* <h1 className="lg-title">Special Shoes With Offers</h1>
          <p className="text-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            quos sit consectetur, ipsa voluptatem vitae necessitatibus dicta
            veniam, optio, possimus assumenda laudantium. Temporibus, quis cum.
          </p> */}
            <div className="store-product-items">
              {products.length > 0 &&
                products.map((product) => (
                  <div className="store-product" key={product.id}>
                    <div className="store-product-content">
                      <div className="store-product-img">
                        <img src={product.imageName} alt={product.imageName} />
                      </div>
                      <div className="store-product-btns">
                        <button type="button" className="btn-cart">
                          añadir al carrito
                          <span>
                            <i className="fas fa-plus" />
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="store-product-info">
                      <div className="store-product-info-top">
                        <h2 className="sm-title">Purina</h2>
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
