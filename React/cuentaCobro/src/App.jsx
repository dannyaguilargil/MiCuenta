import "./App.css";
import { BrowserRouter, Routes,Router, Route, Navigate } from "react-router-dom";
import { contextos } from "./Context/contextSolicitudCitas.js";
import { useState, useEffect } from "react";
import { getCookie } from "./utils/utils.js";
import useLogCambios from "./hooks/useLogCambios.jsx";
import HeaderPage from "./components/layout/HeaderPage.jsx";
import SideBar from "./components/layout/SideBar";
import FooterSara from "./components/layout/FooterSara.jsx"
import AuthContext from "./Context/contexAuth.js";
import "bootstrap/dist/css/bootstrap.min.css";
import routeUrl from "./config.js";
import Error404 from "./components/error/Error404.jsx";
import CargaPagina from "./components/CargaPagina.jsx";
import Radicados from "./features/cuentaCobro/components/radicados/Radicados.jsx";
import RadicadosContratista from "./components/contratista/Radicados.jsx";
import PasarCuenta from "./components/contratista/PasarCuenta.jsx";
import Supervisor from "./components/contratista/Supervisor.jsx";
import Presupuesto from "./components/contratista/Presupuesto.jsx";
import Tesoreria from "./components/contratista/Tesoreria.jsx";
import Perfil from "./components/contratista/Perfil.jsx";
import Documentos from "./components/contratista/Documentos.jsx";
import CuentasCobro from "./components/contratista/CuentasCobro.jsx";


import { ToastContainer} from 'react-toastify';

const { LogEntryContext } = contextos;

function App() {

  const { listaUnificada, loadingLog, recargarDatosLog, errorLog } = useLogCambios()
  const [lstLogCambios, setLogCambios] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lstevents, setEvents] = useState([]);
  const [userAuth, setUserAuth] = useState({});
  const [loadingAuth, setLoadingAuth] = useState(true);

  // setUserAuth({isAuthenticated:true,username:"user",id:id,grupo:[ "grupo",
  // "grupo2"]});

  useEffect(() => {
    // let cuki = getCookie("csrftoken")
    // fetch(`${routeUrl}/api/auths`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include"
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
        // setUserAuth(data);
         setUserAuth({isAuthenticated:true,username:"admin",id:171,grupo:[ "admin_sara"]});
        setLoadingAuth(false);
       
       
      // }).catch((error) => {
      //   window.location.assign(`${routeUrl}/login`);
      //   console.error("Error fetching user authentication:", error);
      // });
  }, []);

  useEffect(() => {
  }, [userAuth])


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const hasPermission = (userGroups = [], requiredRoles = []) => {
  //   if (requiredRoles.length === 0) return true; // Ruta pública
  //   return requiredRoles.some(role => userGroups.includes(role));
  // };


  const getDefaultRoute = (grupos) => {
    if (grupos.includes('admin_sara')) return '/informes';
    if (grupos.includes('facturador') || grupos.includes('supervisor_facturador')) return '/facturacion/citas/pendientes';
    if (grupos.includes('informes')) return '/informes/listado';
    return '/acceso-denegado';
  };

  if (loadingAuth) {
    return <CargaPagina />;
  }

  return (
      <>
        {/* Proporcionar el contexto de autenticación y log entries */}
        {userAuth.isAuthenticated==true ? 
        <AuthContext.Provider value={{ userAuth, setUserAuth }}>
          <LogEntryContext.Provider value={{ listaUnificada, loadingLog, recargarDatosLog, errorLog, lstLogCambios, setLogCambios, lstevents, setEvents }}>
            <BrowserRouter basename="/front">
            <div className="app">
                  <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss
                  draggable pauseOnHover theme="dark"/>   
              <HeaderPage toggleSidebar={toggleSidebar} />
              <div className={` ${isSidebarOpen ? "open-div" : "closed button"}`}>
                <SideBar isOpen={isSidebarOpen} />
                <main className={`main-content content ${isSidebarOpen ? "esterno" : "w-100"}`}>
                  <Routes>
                    <Route path="/" element={ <Navigate to={getDefaultRoute(userAuth?.grupo)} replace /> } />
                    <Route path="*" element={<Error404 />} />
                        {/* {
                          hasPermission(userAuth?.grupo, ["admin_sara", "facturador", "supervisor_facturador"]) ? */}
                    <Route path="cuentacobro">
                      <Route path="" element={<Radicados />} />
                    </Route>
                    
                    <Route path="contratista">
                      <Route path="radicados" element={<RadicadosContratista />} />
                      <Route path="pasar-cuenta" element={<PasarCuenta />} />
                      <Route path="supervisor" element={<Supervisor />} />
                      <Route path="presupuesto" element={<Presupuesto />} />
                      <Route path="tesoreria" element={<Tesoreria />} />
                      <Route path="perfil" element={<Perfil />} />
                      <Route path="documentos" element={<Documentos />} />
                      <Route path="cuentas-cobro" element={<CuentasCobro />} />
    
                    </Route>
                        
                  </Routes>  
                  <FooterSara />
                </main>
              </div>
            </div>
          </BrowserRouter>
        </LogEntryContext.Provider>
      </AuthContext.Provider>
      : window.location.assign(`${routeUrl}/login`)}
  </>
  );
}

export default App;
