import axios from 'axios';
import routeUrl from '../config';
import { getCookie } from '../utils/utils';


const api = axios.create({
    baseURL: routeUrl,
    // withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   const method = config.method?.toUpperCase();
//   const csrfToken = getCookie('csrftoken');
//   // Solo añadir a métodos que modifican datos
//   if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
//     config.headers['X-CSRFToken'] = csrfToken;
//     config.headers['X-Requested-With'] = 'XMLHttpRequest'; // Para Django/compatibilidad
//   }

//   return config;
// });

api.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'Accept': 'application/json'
    };
    return config;
});
export default api;


