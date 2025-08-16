import { useState, useCallback } from 'react';
import api from './axiosConfig';

export const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función genérica para realizar peticiones
  const request = useCallback(async (method, endpoint, body = null, config = {}) => {
    setLoading(true);
    try {
      const response = await api[method](endpoint, body, config);
      setData(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);


  

  // Métodos específicos
  const get = useCallback((endpoint, config = {}) => request('get', endpoint, null, config), [request]);
  const post = useCallback((endpoint, body, config = {}) => request('post', endpoint, body, config), [request]);
  const put = useCallback((endpoint, body, config = {}) => request('put', endpoint, body, config), [request]);
  const del = useCallback((endpoint, config = {}) => request('delete', endpoint, null, config), [request]);

  return {
    data,
    error,
    loading,
    get,
    post,
    put,
    del,
  };
};