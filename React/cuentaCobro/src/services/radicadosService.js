import { useApi } from '../api/useApi';
import { ENDPOINTS } from '../api/endpoints';

export const useRadicadosService = () => {
  const { get, post, put, del, loading, error } = useApi();

  const obtenerRadicados = async () => {
    try {
      const response = await get(ENDPOINTS.RADICADOS);
      return response;
    } catch (error) {
      console.error('Error al obtener radicados:', error);
      throw error;
    }
  };

  const obtenerRadicadoPorId = async (id) => {
    try {
      const response = await get(`${ENDPOINTS.RADICADOS}${id}/`);
      return response;
    } catch (error) {
      console.error('Error al obtener radicado:', error);
      throw error;
    }
  };

  const crearRadicado = async (radicadoData) => {
    try {
      const response = await post(ENDPOINTS.RADICADOS, radicadoData);
      return response;
    } catch (error) {
      console.error('Error al crear radicado:', error);
      throw error;
    }
  };

  const actualizarRadicado = async (id, radicadoData) => {
    try {
      const response = await put(`${ENDPOINTS.RADICADOS}${id}/`, radicadoData);
      return response;
    } catch (error) {
      console.error('Error al actualizar radicado:', error);
      throw error;
    }
  };

  const eliminarRadicado = async (id) => {
    try {
      const response = await del(`${ENDPOINTS.RADICADOS}${id}/`);
      return response;
    } catch (error) {
      console.error('Error al eliminar radicado:', error);
      throw error;
    }
  };

  return {
    obtenerRadicados,
    obtenerRadicadoPorId,
    crearRadicado,
    actualizarRadicado,
    eliminarRadicado,
    loading,
    error
  };
};