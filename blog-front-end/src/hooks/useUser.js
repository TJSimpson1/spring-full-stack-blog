import axios from 'axios';
import { useEffect, useState } from 'react';
import decodeToken from '../util/decodeJwt';

export function useUser() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('jwt');
  const username = decodeToken(token)?.sub;

  useEffect(() => {
    if (token && username) {
      axios
        .get(`http://localhost:8080/api/users/${username}`)
        .then(response => setUser(response.data))
        .catch(error => {
          console.error('Failed to fetch user details:', error);
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [token, username]);

  return user;
}
