import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const purinaUser = JSON.parse(localStorage.getItem('purinaUser'));
    setUser(purinaUser);
  }, [user]);

  return { user };
};
