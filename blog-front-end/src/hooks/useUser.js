import axios from 'axios';
import { useEffect, useState } from 'react';
import decodeToken from '../util/decodeJwt';

export function useUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('jwt');
  const username = decodeToken(token)?.sub;

  useEffect(() => {
    if (token && username) {
      axios
        .get(`http://localhost:8080/api/users/${username}`)
        .then(response => {
          setUser(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch user details:', error);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [token, username]);

  return { user, isLoading };
}
