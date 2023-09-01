import axios from "axios";
import { useEffect, useState } from "react";
import decodeToken from "../util/decodeJwt";
import { User } from "../interfaces/User";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = localStorage.getItem("jwt");
  const decodedToken: any = decodeToken(token);
  const username = decodedToken?.sub;

  useEffect(() => {
    if (token && username) {
      axios
        .get(`http://localhost:8080/api/users/${username}`, {
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch user details:", error);
          setUser(null);
          setIsLoading(false);
          localStorage.removeItem("jwt");
        });
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [token, username]);

  return { user, isLoading };
}
