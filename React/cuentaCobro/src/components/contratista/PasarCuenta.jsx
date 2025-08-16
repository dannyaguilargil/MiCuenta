import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaEdit, FaFileAlt, FaEye, FaPlus, FaSearch } from 'react-icons/fa';

function PasarCuenta() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [formData, setFormData] = useState({
    registroPresupuestal: '',
    numeroContrato: '',
    tipoContrato: '',
    numeroPagos: '',
    fechaInicio: '',
    fechaFin: '',
    supervisorContrato: '',
    objeto: ''
  });

  // Datos de ejemplo para contratos vigentes
  const contratosVigentes = [
    {
      numeroRP: 'RP-2024-001',
      numeroContrato: 'CT-2024-001',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
      progresoPagos: 7,
      totalPagos: 12
    }
  ];



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nuevo contrato:', formData);
    setShowModal(false);
    // Aquí se enviaría la información al backend
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData({
      registroPresupuestal: '',
      numeroContrato: '',
      tipoContrato: '',
      numeroPagos: '',
      fechaInicio: '',
      fechaFin: '',
      supervisorContrato: '',
      objeto: ''
    });
  };

  const handleEdit = (contrato) => {
    setSelectedContract(contrato);
    setFormData({
      registroPresupuestal: contrato.numeroRP,
      numeroContrato: contrato.numeroContrato,
      tipoContrato: 'Prestación de Servicios',
      numeroPagos: contrato.totalPagos.toString(),
      fechaInicio: contrato.fechaInicio,
      fechaFin: contrato.fechaFin,
      supervisorContrato: '',
      objeto: ''
    });
    setShowEditModal(true);
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
    setSelectedContract(null);
    setFormData({
      registroPresupuestal: '',
      numeroContrato: '',
      tipoContrato: '',
      numeroPagos: '',
      fechaInicio: '',
      fechaFin: '',
      supervisorContrato: '',
      objeto: ''
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log('Actualizar contrato:', formData);
    setShowEditModal(false);
    // Aquí se enviaría la información actualizada al backend
  };



  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Contratos Vigentes</h4>
              <button className="btn btn-dark btn-sm" onClick={() => setShowModal(true)}>
                <FaPlus className="me-1" />
                Nuevo Contrato
              </button>
            </div>
            <div className="card-body">
              {contratosVigentes.map((contrato, index) => (
                <div key={index} className="border rounded p-4 mb-3">
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <div className="mb-2">
                        <small className="text-muted">Número RP</small>
                        <div className="fw-bold">{contrato.numeroRP}</div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-2">
                        <small className="text-muted">Número Contrato</small>
                        <div className="fw-bold">{contrato.numeroContrato}</div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-2">
                        <small className="text-muted">Fecha Inicio</small>
                        <div className="fw-bold">{contrato.fechaInicio}</div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-2">
                        <small className="text-muted">Fecha Fin</small>
                        <div className="fw-bold">{contrato.fechaFin}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted">Progreso de Pagos</small>
                      <small className="text-muted">{contrato.progresoPagos} de {contrato.totalPagos} pagos</small>
                    </div>
                    <div className="progress" style={{height: '8px'}}>
                      <div 
                        className="progress-bar bg-primary" 
                        role="progressbar" 
                        style={{width: `${(contrato.progresoPagos / contrato.totalPagos) * 100}%`}}
                        aria-valuenow={contrato.progresoPagos} 
                        aria-valuemin="0" 
                        aria-valuemax={contrato.totalPagos}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(contrato)}
                    >
                      <FaEdit className="me-1" />
                      Editar
                    </button>
                    <button 
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => navigate('/contratista/documentos')}
                    >
                      <FaFileAlt className="me-1" />
                      Documentos
                    </button>
                    <button 
                      className="btn btn-outline-info btn-sm"
                      onClick={() => navigate('/contratista/cuentas-cobro')}
                    >
                      <FaEye className="me-1" />
                      Cuentas de Cobro
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Editar Contrato */}
      {showEditModal && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Información del Contrato</h5>
                <button type="button" className="btn-close" onClick={handleEditCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Registro Presupuestal</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          name="registroPresupuestal"
                          value={formData.registroPresupuestal}
                          onChange={handleInputChange}
                          placeholder="RP-2024-001"
                          required
                        />
                        <button className="btn btn-outline-secondary" type="button">
                          <FaSearch />
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Número de Contrato</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numeroContrato"
                        value={formData.numeroContrato}
                        onChange={handleInputChange}
                        placeholder="CT-2024-001"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Tipo de Contrato</label>
                      <select
                        className="form-select"
                        name="tipoContrato"
                        value={formData.tipoContrato}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar tipo</option>
                        <option value="Prestación de Servicios">Prestación de Servicios</option>
                        <option value="Suministro">Suministro</option>
                        <option value="Obra">Obra</option>
                        <option value="Consultoría">Consultoría</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Número de Pagos</label>
                      <input
                        type="number"
                        className="form-control"
                        name="numeroPagos"
                        value={formData.numeroPagos}
                        onChange={handleInputChange}
                        placeholder="12"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha Inicio</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaInicio"
                        value={formData.fechaInicio}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha Fin</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaFin"
                        value={formData.fechaFin}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Supervisor de Contrato</label>
                    <select
                      className="form-select"
                      name="supervisorContrato"
                      value={formData.supervisorContrato}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar supervisor</option>
                      <option value="supervisor1">Juan Pérez</option>
                      <option value="supervisor2">María García</option>
                      <option value="supervisor3">Carlos López</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Objeto</label>
                    <textarea
                      className="form-control"
                      name="objeto"
                      value={formData.objeto}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Descripción del objeto del contrato..."
                      required
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleEditCancel}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-success" onClick={handleEditSubmit}>
                  Actualizar Contrato
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Nuevo Contrato */}
      {showModal && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Información del Contrato</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Registro Presupuestal</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          name="registroPresupuestal"
                          value={formData.registroPresupuestal}
                          onChange={handleInputChange}
                          placeholder="Buscar RP..."
                        />
                        <button className="btn btn-outline-secondary" type="button">
                          <FaSearch />
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Número de Contrato</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numeroContrato"
                        value={formData.numeroContrato}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Tipo de Contrato</label>
                      <input
                        type="text"
                        className="form-control"
                        name="tipoContrato"
                        value={formData.tipoContrato}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Número de Pagos</label>
                      <input
                        type="number"
                        className="form-control"
                        name="numeroPagos"
                        value={formData.numeroPagos}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha Inicio</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaInicio"
                        value={formData.fechaInicio}
                        onChange={handleInputChange}
                        placeholder="dd/mm/aaaa"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha Fin</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaFin"
                        value={formData.fechaFin}
                        onChange={handleInputChange}
                        placeholder="dd/mm/aaaa"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Supervisor de Contrato</label>
                    <select
                      className="form-select"
                      name="supervisorContrato"
                      value={formData.supervisorContrato}
                      onChange={handleInputChange}
                    >
                      <option value="">Seleccionar supervisor</option>
                      <option value="supervisor1">Supervisor 1</option>
                      <option value="supervisor2">Supervisor 2</option>
                      <option value="supervisor3">Supervisor 3</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Objeto</label>
                    <textarea
                      className="form-control"
                      name="objeto"
                      value={formData.objeto}
                      onChange={handleInputChange}
                      rows="4"
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-dark" onClick={handleSubmit}>
                  Crear Contrato
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default PasarCuenta;