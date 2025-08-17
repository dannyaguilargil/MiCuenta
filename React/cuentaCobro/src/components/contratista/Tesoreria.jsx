import React, { useState, useEffect } from 'react';
import { FaUniversity } from 'react-icons/fa';
import CustomTable from '../ui/CustomTable';
import { useApi } from '../../api/useApi';
import { ENDPOINTS } from '../../api/endpoints';
import useToast from '../../hooks/useToast';
import CustomModal from '../ui/CustomModal';
import { configDatatable } from '../../lib/datatable';

function Tesoreria() {
  const [datosTabla, setDatosTabla] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { loading, error } = useApi();
  const { notify } = useToast();

  // Datos de ejemplo para cuentas pendientes de comprobante de egreso
  const cuentasPendientes = [
    {
      id: 1,
      radicado: 'RAD-2024-003',
      contratista: 'Carlos Alberto Gómez',
      contrato: 'CT-2024-003',
      periodo: 'Agosto 2024',
      valor: 5200000,
      ordenPago: 'Creada',
      estado: 'Pendiente Comprobante'
    }
  ];

  const columns = [
    {
      title: 'Radicado',
      data: 'radicado',
      render: function (data, type, row) {
        return `<span class="fw-bold">${data}</span>`;
      }
    },
    {
      title: 'Contratista',
      data: 'contratista',
      render: function (data, type, row) {
        return `
          <div>
            <div class="fw-bold">${data}</div>
            <small class="text-muted">${row.contrato}</small>
          </div>
        `;
      }
    },
    {
      title: 'Periodo',
      data: 'periodo'
    },
    {
      title: 'Valor',
      data: 'valor',
      render: function (data, type, row) {
        return `<span class="fw-bold text-success">$ ${data.toLocaleString()}</span>`;
      }
    },
    {
      title: 'Orden de Pago',
      data: 'ordenPago',
      render: function (data, type, row) {
        return `<span class="badge bg-info text-dark">✓ ${data}</span>`;
      }
    },
    {
      title: 'Estado',
      data: 'estado',
      render: function (data, type, row) {
        return `<span class="badge bg-warning text-dark">${data}</span>`;
      }
    },
    {
      title: 'Acciones',
      data: null,
      orderable: false,
      render: function (data, type, row) {
        return `
          <button class="btn btn-outline-primary btn-sm me-1" data-action="view" data-id="${row.id}">
            <i class="fas fa-eye"></i> Ver
          </button>
        `;
      }
    }
  ];

  useEffect(() => {
    setDatosTabla(cuentasPendientes);
  }, []);

  useEffect(() => {
    const handleButtonClick = (event) => {
      const button = event.target.closest('button[data-action]');
      if (button) {
        const action = button.getAttribute('data-action');
        const id = parseInt(button.getAttribute('data-id'));
        
        if (action === 'view') {
          const record = cuentasPendientes.find(item => item.id === id);
          setSelectedRecord(record);
          setShowModal(true);
        }
      }
    };

    document.addEventListener('click', handleButtonClick);
    return () => document.removeEventListener('click', handleButtonClick);
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="d-flex align-items-center">
                <FaUniversity className="me-2" />
                <h4 className="mb-0">Panel de Tesorería - Cuentas Pendientes de Comprobante de Egreso</h4>
              </div>
            </div>
            <div className="card-body">
              <CustomTable
                tableId={"tablaTesoreria"}
                columns={columns}
                data={datosTabla}
                loading={loading}
                error={error}
                config={configDatatable}
              />
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Detalle de Cuenta"
        size="lg"
      >
        {selectedRecord && (
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">Radicado:</label>
                <p className="form-control-plaintext">{selectedRecord.radicado}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Contratista:</label>
                <p className="form-control-plaintext">{selectedRecord.contratista}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Contrato:</label>
                <p className="form-control-plaintext">{selectedRecord.contrato}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">Periodo:</label>
                <p className="form-control-plaintext">{selectedRecord.periodo}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Valor:</label>
                <p className="form-control-plaintext text-success fw-bold">
                  $ {selectedRecord.valor.toLocaleString()}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Estado:</label>
                <p className="form-control-plaintext">
                  <span className="badge bg-warning text-dark">{selectedRecord.estado}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
  );
}

export default Tesoreria;