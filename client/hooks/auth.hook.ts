import { useState, useCallback, useEffect } from 'react';

const STORAGE_NAME = 'userData';

export interface UseAuth {
  isAuthenticated?: boolean;
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  ready: boolean;
  token?: string | null;
  userId?: string | null;
}

export const useAuth = (): UseAuth => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(STORAGE_NAME, JSON.stringify({
      userId: id,
      token: jwtToken,
    }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(STORAGE_NAME);
  }, []);

  useEffect(() => {
    const jsonData = localStorage.getItem(STORAGE_NAME);

    if (jsonData) {
      const data = JSON.parse(jsonData);

      if (data && data.token) {
        login(data.token, data.userId);
      }
    }

    setReady(true);
  }, [login]);

  const isAuthenticated = !!token;

  return {
    isAuthenticated,
    login,
    logout,
    ready,
    token,
    userId,
  };
};
