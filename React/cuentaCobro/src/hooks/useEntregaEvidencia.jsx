import { useState, useEffect } from "react";
import routeUrl from "../config";
import { getCookie } from "../utils/utils";


const useEntregaEvidencia = () => {
  const [lstEntregaEvidencia, setEntregaEvidencia] = useState({ loading: true, error: null, data: [] })
  const [reload, setReload] = useState(false);


  useEffect(() => {

    const url1 = `${routeUrl}/informe/api/entrega/`
    const url2 = `${routeUrl}/informe/api/evidencia/`  

    // const url1 = "http://localhost:5000/entrega"
    // const url2 = "http://localhost:5000/evidencia"


    const fetchData = async () => {
      try {
        const [resEntregas, resEvidencias] = await Promise.all([
          fetch(url1, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken'),
            },
            credentials: "include"
          }),
          fetch(`${url2}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken'),
            },
              credentials: "include"
          }),
        ]);


        if (!resEntregas.ok || !resEvidencias.ok) {
          throw new Error('Error al cargar los datos de lstEntregaEvidencia');
        }
        const [resEntregasData, resEvidenciaData] = await Promise.all([
          resEntregas.ok ? resEntregas.json() : Promise.reject('Error en entes'),
          resEvidencias.ok ? resEvidencias.json() : Promise.reject('Error en dependencias'),
        ]);

        const data = UnificarInfo(resEntregasData, resEvidenciaData)
        
        setEntregaEvidencia(prev => ({ ...prev, data: data }))

      } catch (err) {
        console.error(err)
        setEntregaEvidencia(prev => ({ ...prev, error: true }))
      } finally {
        setEntregaEvidencia(prev => ({ ...prev, loading: false }))
      }
    };
    fetchData();
  }, [reload]);


  const UnificarInfo = (resEntregas, resEvidencias) => {
    return resEntregas.map((item) => ({
      ...item,
      evidencias: resEvidencias.filter(evi => Number(evi.entrega) == Number(item.id))
    }));
  };


  return { lstEntregaEvidencia, setReload, reload }

}


export default useEntregaEvidencia;