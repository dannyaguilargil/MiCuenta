import { Export } from "react-data-table-component-extensions/dist/ui";
import routeUrl from "../config";

export const BASEURL = {routeUrl};

export const ENDPOINTS = {
     //info Usuarios
    USUARIOSSARA : `usuarios/`,

    AUTHUSER: `/api/auths`,
    
    //Modulo Citas
    CITASAPROBADAS: `/pacientes/citas/aprobadas/`,
    CITASRECHAZADAS: `/pacientes/citas/rechazadas/`,
    SOLICITUDCITAS: `/solicitudcita/`,
    CORREOCITA: `/envios/email/`,
    EMAILCITA: `/envios/sms/`,
    PROFESIONALES:  `/envios/sms/`,

    //Modulo Informes
    ENTES: `/informe/api/ente-control/`,
    DEPENDENCIAS: `/informe/api/dependencia/`,
    ENTREGAS: `/informe/api/entrega/`,
    EVIDENCIAS: `/informe/api/evidencia/`,
    INFORMES: `/informe/api/informes/`,

    //Modulo Gestion Documental
    OPS:"/formato/api/ops/",
    HLS:"/formato/api/hl/",
    ADMIN:"/formato/api/admin/",
    HC:"/formato/api/hc/",

    //Modulo Certificados
    PLANTILLA:"/laboral/certificado/plantilla/",
    CERTIFICADOS: "/laboral/certificado/emitidos/",

    //Modulo Radicados
    RADICADOS: "/api/radicados/",
}
