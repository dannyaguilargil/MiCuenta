import { useState , useEffect} from 'react';
import {getCookie} from "../utils/utils"
import routeUrl from '../config';

const url1 = `${routeUrl}/solicitudcita/`
const url2 = `${routeUrl}/paciente/`

function useCitaPendiente() {
  const [solicitudCita, setSolicitudCita] = useState([]);
  const [reload, setReload] = useState(false);
  const [paciente, setPaciente] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorSl, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, patientsRes] = await Promise.all([
          fetch(url1,{
            method: "GET",
             headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken'),
             },
              credentials: "include"
        }),
          fetch(`${url2}`,{
            method: "GET",
             headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken'),
             },
              credentials: "include"
        }),
        ]);

        if (!appointmentsRes.ok || !patientsRes.ok) {
          throw new Error('Error al cargar los datos');
        }
        const [appointmentsData, patientsData] = await Promise.all([
          appointmentsRes.json(),
          patientsRes.json()
        ]);

        setSolicitudCita(appointmentsData);
        setPaciente(patientsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [reload]);

  const recargarDatos = () => setReload(prev => !prev);

  const citasPendientes = solicitudCita.length > 0 && paciente.length > 0
  ? solicitudCita.map(cita => {
      const pacienteEncontrado = paciente.find(pcnt => 
        pcnt.numeroidentificacion?.toString() === cita.paciente?.toString()
      );

      if (!pacienteEncontrado) {
        console.warn("Paciente no encontrado para la cita:", cita);
        return { 
          ...cita,
          idSolicitudCita: cita.id,  
          fecha_creacion_cita: cita.fecha_creacion, 
          fecha_actualizacion_cita: cita.fecha_actualizacion,
        };
      }
      
      return {
        ...cita,
        idSolicitudCita: cita.id,  
        fecha_creacion_cita: cita.fecha_creacion,
        fecha_actualizacion_cita: cita.fecha_actualizacion,
        ...pacienteEncontrado
      };
    })
  : [];
  
  return {citasPendientes , recargarDatos , loading, errorSl };
}

export default useCitaPendiente
