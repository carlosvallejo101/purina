import React from 'react';
import { useHistory } from 'react-router-dom';

import Wrapper from '../../components/Wrapper/wrapper.jsx';

const Login = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <div className="card">
        <h2 className="card__title">Ingresa</h2>
        <div>
          <div className="label-container">
            <label>Celular</label>
            <input type="text" />
          </div>
          <div className="label-container">
            <label>Contraseña</label>
            <input />
          </div>
          <button className="button" onClick={() => history.push('/home')}>
            Ingresar
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
