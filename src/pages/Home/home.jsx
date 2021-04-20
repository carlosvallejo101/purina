import React from 'react';
import { useAuth } from '../../auth/useAuth.jsx';

import Normal from './Normal/normal.jsx';
import Support from './Support/support.jsx';
import Dealer from './Dealer/dealer.jsx';
import Results from '../Results/results.jsx';

const Home = () => {
  const { user } = useAuth();

  if (user) {
    const role = user.roles[0];
    switch (role) {
      case 'Normal':
        return <Normal />;
      case 'Support':
        return <Support />;
      case 'Dealer':
        return <Dealer />;
      default:
        return <Results />;
    }
  } else {
    return <p>Cargando</p>;
  }
};

export default Home;
