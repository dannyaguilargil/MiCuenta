import CustomTable from "../../../../components/ui/CustomTable";
import { useEffect, useState } from "react";
import {useApi} from "../../../../api/useApi";
import {ENDPOINTS} from "../../../../api/endpoints";
import useToast from "../../../../hooks/useToast";
import imagenVer from "../../../../assets/images/image.png";
// import iconoEliminar from "../../../../assets/images/eliminar.png";
// import iconoactualizar from "../../../../assets/images/actualizar.png";
import { LifeLine } from "react-loading-indicators"
import CustomModal from "../../../../components/ui/CustomModal";
import { cambioFormatoIsoACompleto, filtrarListaporId } from "../../../../utils/utils";
import useModalById from "../../../../hooks/useModalById";
import Button from 'react-bootstrap/Button';
import { configDatatable } from "../../../../lib/datatable";



const TablaRadicados = () => {
    
    const {data,error: apiError,loading,get,del} = useApi();
    const {openModal,closeModal, isModalOpen} = useModalById()
    const [datosTabla, setDatosTabla] = useState([]);

    const [dtDependencias,setdtDependecias] = useState([]);
    const [dtUsuarios,setdtUsuarios] = useState([]);
    const [datosCompletos,setDatosCompletos] = useState([]);

    const [reloadDtCuentaCobro, setReloadDtCuentaCobro] = useState(false);
    const [idFiltrado, setIdFiltrado] = useState([])
    const [lstFiltrado, setLstFiltrado] = useState([])
    const [opSeleccion, setOpSeleccion] = useState();




    const {notify} = useToast();

  useEffect(() => {
  const obtenerdtCuentas = async () => {
    try {
      const [resultRadicados, resultUsuarios, resultDependencia] = await Promise.all([
        get("http://localhost:5000/radicados"), get("http://localhost:5000/usuario"),get("http://localhost:5000/dependencia")
      ]);
    //   console.log("resultCuenta", resultAdmin);
    const fdata = formatearTabla(resultRadicados,resultUsuarios);
    setDatosCompletos(resultRadicados);
    console.log("fdata", fdata);
    setDatosTabla(fdata);
    //   setDatosAdmin(resultAdmin);
    //   setDatosDependencias(resultDependencia)
    //   console.log("Datos obtenidos:", resultAdmin, resultDependencia);
    }catch (err) {
      console.error("Error al obtener datos:", err);
      setDatosTabla([]);
    }
  };
  obtenerdtCuentas();
}, [reloadDtCuentaCobro]);

useEffect(()=>{
console.log("datosCompletos",datosCompletos)
},[datosCompletos])


   const formatearTabla = (data,usuarios)=>{
    console.log("dataformatearTabla",data)
        const obt = data.map((ob)=>{
            const user = usuarios.find(user => Number(user.id) === Number(ob?.usuario));
            return({id:ob.id, numeroradicado:ob.numeroradicado, asunto:ob.asunto, fecha_radicacion:ob.fecha_radicacion, activo:ob.activo,usuario:user,})
            // return({
            //     id:ob.id, dependencia:depend.nombre, numero_orden:ob.numero_orden, codigo:ob.codigo, nombre_serie:ob.nombre_serie, frecuencia_consulta:ob.frecuencia_consulta, 
            //     nota:ob.nota,
            // })
        })
        return obt;
   }

    const columns = [
    {data: "id", title: "Id"},{data: "numeroradicado", title: "# Radicado"},{data: "asunto", title: "Asunto"},
    {data: "fecha_radicacion", title: "Fecha de Radicación",
        render: (data) => {
            return cambioFormatoIsoACompleto(data);
        }
    },
    {data: "activo", title: "Estado",
        render: (data) => {
            return data ? "<button class='btn btn-success'>Activo</button>" : "<button class='btn btn-danger'>Inactivo</button>";
        }
    },
    {
         data: null, title: "Acción",
         render: (row) =>
           `<center class="d-flex justify-content-between align-items-center">
             <button type="button" data-id=${row.id}   class="btn ba btn-ver">
                 <img src=${imagenVer} style="width: 20px;"  alt="" />
             </button>
          
             </center>`,
       },
    ];






    

      useEffect(() => {
        const handleClick = (e) => {

          const button = e.target.closest(".btn-ver");
          const buttonEliminar = e.target.closest(".btn-eliminar")
          const buttonactualizar = e.target.closest(".btn-actualizar");
    
          if (button) {
            const id = button.dataset.id; setIdFiltrado(id); openModal("ver"); setOpSeleccion("ver")
          }
        //   if(buttonactualizar){
        //     const id = buttonactualizar.dataset.id; setIdFiltrado(id); setOpSeleccion("actualizar"); openModal("actualizar");
        //   }

        //   if (buttonEliminar) {
        //     const id = buttonEliminar.dataset.id; setIdFiltrado(id); openModal("eliminar"); setOpSeleccion("eliminar")
        //   }
        };
          setLstFiltrado(filtrarListaporId(datosCompletos,idFiltrado));
          const tableContainer = document.querySelector(".tablaRadicados");
          tableContainer.addEventListener("click", handleClick);
          return () => {
          tableContainer.removeEventListener("click", handleClick);
        };
      },[openModal]);

      const registrarAdmin = ()=>{
        openModal("registrar")
        setOpSeleccion("agregar")
      }



  return (
    <>
        <div>
            <h2>Radicados</h2>
            
        </div>

    {loading ? <LifeLine color="#32cd32" size="medium" text="" textColor="" /> : ""}
            {!datosTabla ? <div className="mt-1">Error al establecer conexión con el servidor</div> : ""}

            <div className="container">
               <CustomTable columns={columns} data={datosTabla} tableId={"tablaRadicados"} configuracionTabla={()=>{const configDatatable = {...configDatatable,buttons}; return(configDatatable)}}/>
                 {/* <ExcelExporterExcelJS buttonId="buttonexportaradmin" datos={datosTabla} columnas={columnasExcel} plantilla={"/front/plantilla_docadmin.xlsx"} filaInicio={14}  cantidadFilasPie={6}/> */}
            </div>

            <CustomModal title={"Actualización de información"}  onClose={() => closeModal("actualizar")}  show={isModalOpen("actualizar")} size={"xl"}>
                {/* <Formularioadmin setReloadOps={setReloadAdmin} idFiltrado={idFiltrado} lstDependencia={datosDependencias} lstDatos={datosAdmin ? filtrarListaporId(datosAdmin,idFiltrado):[]} onClose={() => closeModal("actualizar")} opcionButton={opSeleccion} notify={notify}/> */}
            </CustomModal>

            <CustomModal title={"Registro de cuenta"}  onClose={() => closeModal("registrar")}  show={isModalOpen("registrar")} size={"xl"}>
              {/* <Formularioadmin setReloadOps={setReloadAdmin} opcionButton={opSeleccion} lstDependencia={datosDependencias}  notify={notify} onClose={() => closeModal("registrar")}/> */}
            </CustomModal>

            <CustomModal title={"Visualizacion de  cuenta"}  onClose={() => closeModal("ver")}  show={isModalOpen("ver")} size={"xl"}>
              {isModalOpen("ver") ?
                <section>
         

          {lstFiltrado && (
<div className="container mb-4">
  <div className="card bg-light mb-4">
    <div className="card-body">
      <div className="mb-2">
        <span className="fw-bold text-primary">Número de Radicado</span>
      </div>
      <p className="h4 fw-bold text-primary">{lstFiltrado.numeroradicado}</p>
    </div>
  </div>

  <div className="row g-4 mb-4">
    <div className="col-md-6">
      <div className="mb-2">
        <span className="fw-semibold">Fecha de Radicación</span>
      </div>
      <p>{cambioFormatoIsoACompleto(lstFiltrado.fecha_radicacion)}</p>
    </div>

    <div className="col-md-6">
      <div className="mb-2">
        <span className="fw-semibold">Estado</span>
      </div>
      <span className={`badge ${
        lstFiltrado.activo === "Activo" 
          ? "bg-success" 
          : "bg-warning"
      }`}>
        {lstFiltrado.activo}
      </span>
    </div>

    <div className="col-md-6">
      <div className="mb-2">
        <span className="fw-semibold">Tipo de Solicitud</span>
      </div>
      <p>{lstFiltrado.tipo_solicitud}</p>
    </div>

    <div className="col-md-6">
      <div className="mb-2">
        <span className="fw-semibold">Dependencia</span>
      </div>
      <p>{lstFiltrado.dependencia}</p>
    </div>
  </div>

  <div className="mb-4">
    <h3 className="fw-semibold mb-2">Asunto</h3>
    <div className="card">
      <div className="card-body">
        {lstFiltrado.asunto}
      </div>
    </div>
  </div>

  <div className="mb-4">
    <h3 className="fw-semibold mb-2">Descripción</h3>
    <div className="card">
      <div className="card-body">
        {lstFiltrado.descripcion}
      </div>
    </div>
  </div>

  <div>
    <h3 className="fw-semibold mb-2">Información de Seguimiento</h3>
    <div className="card">
      <div className="card-body">
        <div className="mb-2">
          <span className="fw-semibold">Funcionario Asignado:</span>
          <span className="ms-2">{lstFiltrado.usuario}</span>
        </div>
        <div>
          <span className="fw-semibold">Observaciones:</span>
          <p className="mt-2">{lstFiltrado.seguimiento}</p>
        </div>
      </div>
    </div>
  </div>
</div>
          )}
        </section>
              :null}
            </CustomModal> 
    </>
  );
};

export default TablaRadicados;
