import React, { useEffect, useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import CustomTable from "../ui/CustomTable";
import imagenVer from "../../assets/images/image.png";
import CustomModal from "../ui/CustomModal";
import useModalById from "../../hooks/useModalById";
import { cambioFormatoIsoACompleto } from "../../utils/utils";
import { useRadicadosService } from "../../services/radicadosService";

function Radicados() {
  const {openModal, closeModal, isModalOpen} = useModalById();
  const [idFiltrado, setIdFiltrado] = useState([]);
  const [lstFiltrado, setLstFiltrado] = useState([]);
  const [opSeleccion, setOpSeleccion] = useState();
  const [radicados, setRadicados] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const { obtenerRadicados, obtenerRadicadoPorId, loading, error } = useRadicadosService();

  // Cargar radicados desde la API
  useEffect(() => {
    const cargarRadicados = async () => {
      try {
        setLoadingData(true);
        const data = await obtenerRadicados();
        setRadicados(data || []);
      } catch (error) {
        console.error('Error al cargar radicados:', error);
        setRadicados([]);
      } finally {
        setLoadingData(false);
      }
    };

    cargarRadicados();
  }, []);

  const columns = [
    {data: "rad", title: "# Radicado"},
    {data: "asunto", title: "Asunto"},
    {
      data: "fecha_creacion", 
      title: "Fecha de Creación",
      render: (data) => {
        return cambioFormatoIsoACompleto(data);
      }
    },
    {
      data: "activo", 
      title: "Estado",
      render: (data) => {
        return data ? "<button class='btn btn-success'>Tramitado</button>" : "<button class='btn btn-warning'>En trámite</button>";
      }
    },
    {
      data: null, 
      title: "Acción",
      render: (row) =>
        `<center class="d-flex justify-content-between align-items-center">
          <button type="button" data-id=${row.rad} class="btn ba btn-ver">
            <img src=${imagenVer} style="width: 20px;" alt="" />
          </button>
        </center>`,
    },
  ];

  useEffect(() => {
    const handleClick = (e) => {
      const button = e.target.closest(".btn-ver");
      
      if (button) {
        const id = button.dataset.id;
        setIdFiltrado(id);
        const radicadoSeleccionado = radicados.find(r => r.rad.toString() === id);
        setLstFiltrado(radicadoSeleccionado);
        openModal("ver");
        setOpSeleccion("ver");
      }
    };
    
    const tableContainer = document.querySelector(".tablaRadicados");
    if (tableContainer) {
      tableContainer.addEventListener("click", handleClick);
      return () => {
        tableContainer.removeEventListener("click", handleClick);
      };
    }
  }, [openModal, radicados]);

  return (
    <>
      <div className="text-center mb-4">
        <h2>Mis Radicados</h2>
      </div>

      <div className="container">
        {loadingData ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando radicados...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            <h6>Error al cargar los radicados</h6>
            <p className="mb-0">{error.message || 'Ha ocurrido un error inesperado'}</p>
          </div>
        ) : radicados.length === 0 ? (
          <div className="alert alert-info" role="alert">
            <h6>No hay radicados disponibles</h6>
            <p className="mb-0">No se encontraron radicados en el sistema.</p>
          </div>
        ) : (
          <CustomTable 
            columns={columns} 
            data={radicados} 
            tableId={"tablaRadicados"} 
          />
        )}
      </div>

      <CustomModal 
        title={"Detalles del Radicado"} 
        onClose={() => closeModal("ver")} 
        show={isModalOpen("ver")} 
        size={"lg"}
      >
        {isModalOpen("ver") && lstFiltrado ? (
          <div className="p-3">
            <div className="card bg-light mb-3">
              <div className="card-body text-center">
                <div className="mb-2">
                  <small className="text-muted d-flex align-items-center justify-content-center">
                    <span className="me-2"># Número de Radicado</span>
                  </small>
                </div>
                <h4 className="fw-bold text-primary mb-0">{lstFiltrado.rad}</h4>
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">📅</span>
                  <small className="fw-semibold text-muted">Fecha de Creación</small>
                </div>
                <p className="mb-0">{cambioFormatoIsoACompleto(lstFiltrado.fecha_creacion)}</p>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">📅</span>
                  <small className="fw-semibold text-muted">Fecha de Actualización</small>
                </div>
                <p className="mb-0">{cambioFormatoIsoACompleto(lstFiltrado.fecha_actualizacion)}</p>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">🏷️</span>
                  <small className="fw-semibold text-muted">Estado</small>
                </div>
                <span className={`badge rounded-pill ${
                  lstFiltrado.activo 
                    ? "bg-success" 
                    : "bg-warning text-dark"
                }`}>
                  {lstFiltrado.activo ? "Tramitado" : "En trámite"}
                </span>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">👤</span>
                  <small className="fw-semibold text-muted">Usuario</small>
                </div>
                <p className="mb-0">{lstFiltrado.usuario_nombre_completo || 'No asignado'}</p>
              </div>
            </div>

            <div className="mb-3">
              <h6 className="fw-semibold mb-2">Asunto</h6>
              <div className="card">
                <div className="card-body py-2">
                  <p className="mb-0 text-muted">{lstFiltrado.asunto}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </CustomModal>
    </>
  );
}

export default Radicados;