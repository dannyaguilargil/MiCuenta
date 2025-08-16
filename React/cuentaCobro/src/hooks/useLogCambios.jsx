import { useState, useEffect } from "react"
import { getCookie } from "../utils/utils";

import routeUrl from '../config';

const url1 = `${routeUrl}/pacientes/citas/rechazadas/`
const url2 = `${routeUrl}/pacientes/citas/aprobadas/`


function useLogCambios() {
  const [citasRechazadas, setcitasRechazadas] = useState([]);
  const [citasAprobadas, setCitasAprobadas] = useState([]);
  const [reload, setReload] = useState(false);
  const [loadingLog, setLoading] = useState(true);
  const [errorLog, setError] = useState(null);
  const [listaUnificada, setlstUnificada] = useState([]);


  useEffect(() => {
    setlstUnificada([...citasAprobadas, ...citasRechazadas]);
  }, [citasAprobadas, citasRechazadas]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rechazadosRes, aceptadosRes] = await Promise.all([
          fetch(url1, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
              },
              credentials: "include"
          }),
          fetch(url2, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken'),
            },
              credentials: "include"
          }),
        ]);

        if (!rechazadosRes.ok || !aceptadosRes.ok) {
          throw new Error('Error al cargar los datos');
        }

        const [rechazadosData, aceptadosData] = await Promise.all([
          rechazadosRes.json(),
          aceptadosRes.json()
        ]);

        const rechazadosConAccion = rechazadosData.map(item => ({ ...item, accion: "RECHAZADO" }));
        const aprobadosConAccion = aceptadosData.map(item => ({ ...item, accion: "APROBADO" }));
        
        setCitasAprobadas(aprobadosConAccion);
        setcitasRechazadas(rechazadosConAccion);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [reload]); 
  const recargarDatosLog = () => setReload(prev => !prev);

  return { listaUnificada, loadingLog, recargarDatosLog, errorLog };
}

export default useLogCambios;