import React from 'react';
import { IconButton } from '@material-ui/core';
import { useAuth } from '../../auth/useAuth.jsx';
import './logout.css';
import { useHistory } from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Logout = (props) => {
  const { superpose } = props;
  const { user, logout } = useAuth();
  const history = useHistory();

  const logingOut = () => {
    logout();
    history.push('/login');
  };

  const classStyle = superpose ? 'logout superpose' : 'logout';

  return (
    user && (
      <div className={classStyle}>
        <p>Salir</p>
        <IconButton onClick={logingOut}>
          <ExitToAppIcon style={{ fill: '#fff' }} />
        </IconButton>
      </div>
    )
  );
};

export default Logout;
