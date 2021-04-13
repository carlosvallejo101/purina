import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { backend } from '../../config';
import { useAuth } from '../../auth/useAuth.jsx';

import Wrapper from '../../components/Wrapper/wrapper.jsx';

const Login = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [credentials, setCredentials] = useState({
    phoneOrEmail: '',
    password: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.roles.includes('Admin')) {
        history.push('/results');
      }
      if (user.roles.includes('User')) {
        history.push('/home');
      }
    }
    // eslint-disable-next-line
  }, [user]);

  const login = async () => {
    setError(null);
    window.localStorage.removeItem('purinaUser');
    try {
      const { data } = await axios.post(backend.url + '/api/auth', credentials);
      window.localStorage.setItem('purinaUser', JSON.stringify(data));
      setCredentials({
        phoneOrEmail: '',
        password: '',
      });
      if (data.roles.includes('Admin')) {
        history.push('/results');
      }
      if (data.roles.includes('User')) {
        history.push('/home');
      }
    } catch (e) {
      setError('Usuario o Contraseña incorrectos');
    }
  };

  return (
    <Wrapper>
      <div className="card">
        <h2 className="card__title">Ingresa</h2>
        {error && <p>{error}</p>}
        <div>
          <div className="label-container">
            <label>Celular o Email</label>
            <input
              type="text"
              value={credentials.phoneOrEmail}
              onChange={({ target }) =>
                setCredentials({ ...credentials, phoneOrEmail: target.value })
              }
            />
          </div>
          <div className="label-container">
            <label>Contraseña</label>
            <input
              type="password"
              value={credentials.password}
              onChange={({ target }) =>
                setCredentials({ ...credentials, password: target.value })
              }
            />
          </div>
          <button className="button" onClick={login}>
            Ingresar
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
