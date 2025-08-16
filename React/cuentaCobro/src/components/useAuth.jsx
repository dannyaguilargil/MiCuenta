import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRoles = [], userAuth }) => {

  const getDefaultRoute = (grupos) => {

    // if (!grupos){
    //    window.location.replace(`${routeUrl}/login`);
    // };

    if (grupos?.includes('admin_sara')) {
      return '/';
    }

    if (grupos?.includes('facturador') || grupos?.includes('supervisor_facturador')) {
      return '/facturacion/citas/pendientes';
    }

    if (grupos?.includes('informes') || grupos?.includes('admin_sara')) {
      return '/informes/listado';
    }

    return '/'

    // window.location.replace(`${routeUrl}/login`);
  };


  const hasPermission = (userGroups = [], requiredRoles = []) => {
    if (requiredRoles.length === 0) return true; // Ruta pública
    return requiredRoles.some(role => userGroups.includes(role));
  };



  // if (!userAuth.isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  if (!hasPermission(userAuth?.grupo, requiredRoles)) {
    return <Navigate to={getDefaultRoute(userAuth?.grupo)} replace />;
  }


  return children;
};


export default ProtectedRoute;
