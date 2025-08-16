import routeUrl from '../config';
import { useState , useEffect} from 'react';
import { cambioFormatoFecha, getCookie } from '../utils/utils';


const url1 = `${routeUrl}/informe/api/ente-control/`
const url2 = `${routeUrl}/informe/api/dependencia/`
const url3 = `${routeUrl}/informe/api/informes/`

// const url1 = 'http://localhost:5000/entecontrol'
// const url2 = 'http://localhost:5000/dependencia'
// const url3 = 'http://localhost:5000/informes'



function useInformeLst (){
    const [lstInforme, setStInforme] = useState({loading:true,error:null, data:[]})
     const [reload, setReload] = useState(false);


     useEffect(() => {
        const fetchData = async () => {
          try {
            const [resEntes, resDependencias, reslistadoInforme] = await Promise.all([

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
             fetch(url3,{
                method: "GET",
                 headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': getCookie('csrftoken'),
                 },
                  credentials: "include"
            }),
            ]);


            if (!resEntes.ok || !resDependencias.ok || !reslistadoInforme.ok ) {
              throw new Error('Error al cargar los datos de listadoInforme');
            }
            const [resEntesData, resDependenciaData, resInformeData] = await Promise.all([
                resEntes.ok ? resEntes.json() : Promise.reject('Error en entes'),
                resDependencias.ok ? resDependencias.json() : Promise.reject('Error en dependencias'),
                reslistadoInforme.ok ? reslistadoInforme.json() : Promise.reject('Error en informes'),
            ]);

            const data = UnificarInfo(resEntesData,resDependenciaData, resInformeData)

            setStInforme(prev => ({...prev,data:data}))

          } catch (err) {
                console.error(err)
                setStInforme(prev => ({...prev,error:true}))
          } finally {
                setStInforme(prev => ({...prev,loading:false}))
          }
        };
        fetchData();
      }, [reload]);


      const UnificarInfo = (resEntesData, resDependenciaData, resInformeData) => {
        return resInformeData.map((item) => {
        const entecontrol = resEntesData.find((valor) => Number(valor.id) === Number(item.entecontrol));
        const dependencia = resDependenciaData.find((valor) => Number(valor.id) === Number(item.dependencia));
            return {
                ...item,fecha_actualizacion: cambioFormatoFecha(item.fecha_actualizacion), entecontrol: entecontrol || null, dependencia: dependencia || null 
            };
        });
    };


    return {lstInforme,setReload, reload}

}


export default useInformeLst;