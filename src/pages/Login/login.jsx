import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { backend, backendSQL } from '../../config';
import { useAuth } from '../../auth/useAuth.jsx';
import './login.css';

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
      if (
        user.roles.includes('Normal') ||
        user.roles.includes('Support') ||
        user.roles.includes('Dealer')
      ) {
        history.push('/home');
      }
    }
    // eslint-disable-next-line
  }, [user]);

  const login = async () => {
    setError(null);
    window.localStorage.removeItem('purinaUser');
    let data = null;
    try {
      const res = await axios.post(backend.url + '/api/auth', credentials);
      data = res.data;
    } catch (e) {
      let errorCode = e.response.status;
      if (errorCode === 401) setError('Usuario o Contraseña incorrectos');
      if (errorCode === 404) {
        try {
          const res = await axios.post(backendSQL.url + '/auth', {
            username: credentials.phoneOrEmail,
            password: credentials.password,
          });
          data = res.data;
        } catch (e) {
          console.log(e);
          errorCode = e.response.status;
          if (errorCode === 404) setError(`Usuario no encontrado`);
          if (errorCode === 401) setError(`Usuario o Contraseña incorrectos`);
          if (errorCode !== 401 || errorCode !== 404)
            setError(`Error del servidor`);
        }
      }
    }

    if (data) {
      window.localStorage.setItem('purinaUser', JSON.stringify(data));
      setCredentials({
        phoneOrEmail: '',
        password: '',
      });
      if (data.roles.includes('Admin')) {
        history.push('/results');
      }
      if (data.roles.includes('Normal') || data.roles.includes('Support')) {
        const { data: loggedUser } = await axios.get(
          `${backend.url}/api/users/${data.id}`
        );
        const selectedGif = loggedUser.gift;
        if (selectedGif) {
          history.push('/progress');
        } else {
          history.push('/home');
        }
      } else {
        if (data.roles.includes('Dealer')) {
          history.push('/home');
        }
      }
    }
  };

  return (
    <Wrapper>
      <div className="login">
        <div className="login__card-container">
          <div className="card card--login">
            <h2 className="card__title">Ingresa</h2>
            {error && <p>{error}</p>}
            <div className="labels-container">
              <div className="label-container">
                <label>Celular o Correo</label>
                <input
                  type="text"
                  value={credentials.phoneOrEmail}
                  onChange={({ target }) =>
                    setCredentials({
                      ...credentials,
                      phoneOrEmail: target.value,
                    })
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
        </div>
        <div className="triangulo"></div>
      </div>
    </Wrapper>
  );
};

export default Login;
