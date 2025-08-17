import React, { useState, useEffect } from 'react';
import { FaUserTie, FaEye } from 'react-icons/fa';
import CustomTable from '../ui/CustomTable';
import { useApi } from '../../api/useApi';
import { ENDPOINTS } from '../../api/endpoints';
import useToast from '../../hooks/useToast';
import imagenVer from '../../assets/images/image.png';
import { LifeLine } from 'react-loading-indicators';
import CustomModal from '../ui/CustomModal';
import { cambioFormatoIsoACompleto, filtrarListaporId } from '../../utils/utils';
import useModalById from '../../hooks/useModalById';
import { configDatatable } from '../../lib/datatable';

const Supervisor = () => {
  const { data, error: apiError, loading, get, del } = useApi();
  const { openModal, closeModal, isModalOpen } = useModalById();
  const [datosTabla, setDatosTabla] = useState([]);
  const [datosCompletos, setDatosCompletos] = useState([]);
  const [reloadDtCuentaCobro, setReloadDtCuentaCobro] = useState(false);
  const [idFiltrado, setIdFiltrado] = useState([]);
  const [lstFiltrado, setLstFiltrado] = useState([]);
  const [opSeleccion, setOpSeleccion] = useState();
  const { notify } = useToast();

  // Datos de ejemplo para las cuentas pendientes
  const cuentasPendientes = [
    {
      id: 1,
      radicado: 'RAD-2024-001',
      contratista: 'Juan Carlos Pérez García',
      contratoId: 'CT-2024-001',
      periodo: 'Octubre 2024',
      valor: '$ 5.000.000',
      estado: 'Pendiente Supervisión',
      fechaRadicado: '20/11/2024'
    },
    {
      id: 2,
      radicado: 'RAD-2024-004',
      contratista: 'Ana María López',
      contratoId: 'CT-2024-004',
      periodo: 'Noviembre 2024',
      valor: '$ 4.500.000',
      estado: 'Pendiente Supervisión',
      fechaRadicado: '21/11/2024'
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    setDatosTabla(cuentasPendientes);
    setDatosCompletos(cuentasPendientes);
  }, [reloadDtCuentaCobro]);

  const columns = [
    { data: "radicado", title: "Radicado" },
    { 
      data: "contratista", 
      title: "Contratista",
      render: (data, type, row) => {
        return `<div><div class="fw-bold">${data}</div><small class="text-muted">${row.contratoId}</small></div>`;
      }
    },
    { data: "periodo", title: "Periodo" },
    { 
      data: "valor", 
      title: "Valor",
      render: (data) => {
        return `<span class="text-success fw-bold">${data}</span>`;
      }
    },
    {
      data: "estado", 
      title: "Estado",
      render: (data) => {
        return `<span class="badge bg-warning text-dark">${data}</span>`;
      }
    },
    { data: "fechaRadicado", title: "Fecha Radicado" },
    {
      data: null, 
      title: "Acciones",
      render: (row) =>
        `<center class="d-flex justify-content-center align-items-center">
          <button type="button" data-id=${row.id} class="btn btn-ver">
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
        openModal("ver");
        setOpSeleccion("ver");
      }
    };
    
    setLstFiltrado(filtrarListaporId(datosCompletos, idFiltrado));
    const tableContainer = document.querySelector(".tablaSupervisor");
    if (tableContainer) {
      tableContainer.addEventListener("click", handleClick);
      return () => {
        tableContainer.removeEventListener("click", handleClick);
      };
    }
  }, [openModal, datosCompletos, idFiltrado]);

  return (
    <>
      <div>
        <h2>Panel de Supervisor - Cuentas Pendientes de Aprobación</h2>
      </div>

      {loading ? <LifeLine color="#32cd32" size="medium" text="" textColor="" /> : ""}
      {!datosTabla ? <div className="mt-1">Error al establecer conexión con el servidor</div> : ""}

      <div className="container">
        <CustomTable 
          columns={columns} 
          data={datosTabla} 
          tableId={"tablaSupervisor"} 
          configuracionTabla={() => {
            const configDatatable = { ...configDatatable };
            return configDatatable;
          }}
        />
      </div>

      <CustomModal 
        title={"Visualización de cuenta"} 
        onClose={() => closeModal("ver")} 
        show={isModalOpen("ver")} 
        size={"xl"}
      >
        {isModalOpen("ver") ? (
          <section>
            {lstFiltrado && (
              <div className="container mb-4">
                <div className="card bg-light mb-4">
                  <div className="card-body">
                    <div className="mb-2">
                      <span className="fw-bold text-primary">Número de Radicado</span>
                    </div>
                    <p className="h4 fw-bold text-primary">{lstFiltrado.radicado}</p>
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <div className="mb-2">
                      <span className="fw-semibold">Contratista</span>
                    </div>
                    <p>{lstFiltrado.contratista}</p>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-2">
                      <span className="fw-semibold">Estado</span>
                    </div>
                    <span className="badge bg-warning text-dark">
                      {lstFiltrado.estado}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-2">
                      <span className="fw-semibold">Periodo</span>
                    </div>
                    <p>{lstFiltrado.periodo}</p>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-2">
                      <span className="fw-semibold">Valor</span>
                    </div>
                    <p className="text-success fw-bold">{lstFiltrado.valor}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="fw-semibold mb-2">Información del Contrato</h3>
                  <div className="card">
                    <div className="card-body">
                      <div className="mb-2">
                        <span className="fw-semibold">ID Contrato:</span>
                        <span className="ms-2">{lstFiltrado.contratoId}</span>
                      </div>
                      <div>
                        <span className="fw-semibold">Fecha de Radicado:</span>
                        <span className="ms-2">{lstFiltrado.fechaRadicado}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        ) : null}
      </CustomModal>
    </>
  );
};

export default Supervisor;