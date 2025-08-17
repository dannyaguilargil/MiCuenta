import { useState, useEffect } from 'react';

export const useContratos = (userId) => {
  const [contratos, setContratos] = useState([]);
  const [rps, setRps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContratos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obtener contratos y RPs en paralelo
      const [contratosResponse, rpsResponse] = await Promise.all([
        fetch('http://localhost:8000/api/contrato/'),
        fetch('http://localhost:8000/api/rp/')
      ]);
      
      const allContratos = await contratosResponse.json();
      const allRps = await rpsResponse.json();
      
      // Filtrar contratos por supervisor si userId está disponible
      const filteredContratos = userId 
        ? allContratos.filter(contrato => contrato.supervisor === userId)
        : allContratos;
      

      
      setContratos(filteredContratos);
      setRps(allRps);
      
    } catch (err) {
      console.error('Error fetching contratos:', err);
      setError(err.message || 'Error al cargar los contratos');
    } finally {
      setLoading(false);
    }
  };

  const getContratosWithRpInfo = () => {
    return contratos.map(contrato => {
      const rpInfo = rps.find(rp => rp.id === contrato.rp);
      return {
        ...contrato,
        rpInfo: rpInfo || null,
        numeroRP: rpInfo?.numero_rp || 'N/A',
        fechaInicio: rpInfo?.fecha_inicio || contrato.fecha_creacion,
        fechaFin: rpInfo?.fecha_final || 'N/A',
        valorContrato: rpInfo?.valor || 'N/A',
        objetoContrato: rpInfo?.objeto || 'N/A'
      };
    });
  };

  const getContratoById = (id) => {
    return contratos.find(contrato => contrato.id === id);
  };

  const getRpById = (id) => {
    return rps.find(rp => rp.id === id);
  };

  useEffect(() => {
    fetchContratos();
  }, [userId]);

  return {
    contratos,
    rps,
    loading,
    error,
    refetch: fetchContratos,
    getContratosWithRpInfo,
    getContratoById,
    getRpById
  };
};

export default useContratos;