import { useState, useCallback } from 'react';

type ResponseParams = {
  url: string;
};

type ResponseData<T> = {
  message?: string;
} & {
  [Key in keyof T]?: T[Key];
}
type UseHttp<T> = {
  clearError: () => void ;
  error: string | null;
  loading: boolean;
  // TODO: specify request
  request: (url: string, params: ResponseParams) => Promise<ResponseData<T>>;
}

export const useHttp = <T>(): UseHttp<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);

    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так');
      }

      setLoading(false);

      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);

      return e;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    clearError,
    error,
    loading,
    request,
  };
};
