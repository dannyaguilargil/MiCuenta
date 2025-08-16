
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };


  export function convertirFechaTextoaFormato(textoFecha) {
  const meses = {
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
    'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
  };
  
  const partes = textoFecha.split(' ');
  const dia = parseInt(partes[0]);
  const mes = meses[partes[2].toLowerCase()];
  const año = parseInt(partes[4]);

  return new Date(año, mes, dia);
}

  export function filtradoId(lst, id) {
    return Array.isArray(lst) ? lst.find(item => Number(item.id) === Number(id)) : [];
  }


//de date YYYY/MM/DD a texto resta 1 dia en porque no tiene en cuenta el utc
export function cambioFormatoFecha(fecha){
    const formato = new Date(fecha);
    const formattedDate = new Intl.DateTimeFormat('es-CO', options).format(formato);
    return formattedDate
}

//de date YYYY/MM/DD a texto INCLUYE EL UTC Y HORA 00:00
export function cambioFormatosinHora(fecha) {
  const formato = new Date(fecha + "T00:00:00"); // Fuerza hora local (no UTC)
  const option = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('es-CO', option).format(formato);
}


//formato de fecha iso a texto,
export function cambioFormatoIsoACompleto(fecha) {
  // Opción 1: Si recibes "YYYY-MM-DD" como string
  if (typeof fecha === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    const [year, month, day] = fecha.split('-');
    const formato = new Date(Date.UTC(year, month - 1, day)); // UTC explícito
    const option = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return formato.toLocaleString('es-CO', option);
  }
  // Opción 2: Si recibes un objeto Date existente (como Tue Jul 29 2025 19:00:00 GMT-0500)
  const formato = new Date(fecha);
  formato.setMinutes(formato.getMinutes() + formato.getTimezoneOffset()); // Compensa la zona horaria
  const option = { year: 'numeric', month: 'long', day: 'numeric' };
  return formato.toLocaleString('es-CO', options);
}

//DE DATE A ISO: Tue Jul 29 2025 19:00:00 GMT-0500 A YYYY-MM.DD
export function convertirFechaAISO(fechaString) {
  // 1. Crear un objeto Date a partir de la cadena
  const fecha = new Date(fechaString);
  
  // 2. Verificar si la fecha es válida
  if (isNaN(fecha.getTime())) {
    throw new Error("Fecha inválida");
  }
  
  // 3. Extraer componentes UTC (para evitar desplazamiento de zona horaria)
  const year = fecha.getUTCFullYear();
  const month = String(fecha.getUTCMonth() + 1).padStart(2, '0'); // Meses son 0-11
  const day = String(fecha.getUTCDate()).padStart(2, '0');
  
  // 4. Formatear como YYYY-MM-DD
  return `${year}-${month}-${day}`;
}



export function fechaActualFormateada(fecha){  
  const fechaActual = new Date(fecha);
  return fechaActual.toLocaleDateString(
    "es-CO"
  )
}

 export const ordenarDtPorFecha = (lstDataTabla) => {
    const listaOrdenada = lstDataTabla.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    listaOrdenada.forEach((item, index) => {
      item.num = index + 1;
    });
    return listaOrdenada;
  };

export function unirFechas(fecha,hora){
  const fechaHora = new Date(`${fecha}T${hora}`)
  const isoUTC = fechaHora.toISOString();
  return isoUTC;
}

  
export function filtrarListaporId(lst, id){
    const filterlst = lst.filter((item)=> Number(item.id) === Number(id));
    return filterlst.length > 0 ? filterlst[0] : null;
}

export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


export function isDarkModeEnabled() {
  const htmlElement = document.documentElement;
  return htmlElement.getAttribute('data-bs-theme') === 'dark';
}

export default {fechaActualFormateada};

