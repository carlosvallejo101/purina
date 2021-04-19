import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth.jsx';

import Normal from './Normal/normal.jsx';
import Dealer from '../Dealer/dealer.jsx';

const Home = () => {
  const { user } = useAuth();

  if (user) {
    const role = user.roles[0];
    switch (role) {
      case 'Normal':
        return <Normal />;
      case 'Support':
        return <p>Support</p>;
      case 'Dealer':
        return <Dealer />;
      default:
        return <p>User2</p>;
    }
  } else {
    return <p>Cargando</p>;
  }
};

export default Home;
