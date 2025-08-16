import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaPlus, FaEye, FaEdit, FaFileAlt, FaSearch, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function CuentasCobro() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCuenta, setSelectedCuenta] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [formData, setFormData] = useState({
    numeroContrato: '',
    numeroPago: '',
    valor: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: '',
    observaciones: ''
  });

  // Datos de ejemplo para cuentas de cobro
  const [cuentasCobro, setCuentasCobro] = useState([
    {
      id: 1,
      numeroContrato: 'CT-2024-001',
      numeroPago: 1,
      valor: 5000000,
      fechaCreacion: '2024-01-15',
      fechaVencimiento: '2024-02-15',
      estado: 'Pendiente',
      descripcion: 'Cuenta de cobro enero 2024 - Servicios profesionales',
      observaciones: 'Primera cuenta del contrato',
      radicado: '2024000010000521'
    },
    {
      id: 2,
      numeroContrato: 'CT-2024-001',
      numeroPago: 2,
      valor: 5000000,
      fechaCreacion: '2024-02-15',
      fechaVencimiento: '2024-03-15',
      estado: 'En Proceso',
      descripcion: 'Cuenta de cobro febrero 2024 - Servicios profesionales',
      observaciones: 'En revisión por supervisión',
      radicado: '2024000010000654'
    },
    {
      id: 3,
      numeroContrato: 'CT-2024-001',
      numeroPago: 3,
      valor: 5000000,
      fechaCreacion: '2024-03-15',
      fechaVencimiento: '2024-04-15',
      estado: 'Pagado',
      descripcion: 'Cuenta de cobro marzo 2024 - Servicios profesionales',
      observaciones: 'Pagado completamente',
      radicado: '2024000010000789'
    },
    {
      id: 4,
      numeroContrato: 'CT-2024-002',
      numeroPago: 1,
      valor: 3000000,
      fechaCreacion: '2024-04-15',
      fechaVencimiento: '2024-05-15',
      estado: 'Pendiente',
      descripcion: 'Cuenta de cobro abril 2024 - Servicios de consultoría',
      observaciones: 'Sin radicar - permite agregar documentos',
      radicado: null
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaCuenta = {
      id: cuentasCobro.length + 1,
      ...formData,
      valor: parseFloat(formData.valor),
      fechaCreacion: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      radicado: `2024${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`
    };
    
    setCuentasCobro(prev => [...prev, nuevaCuenta]);
    setFormData({
      numeroContrato: '',
      numeroPago: '',
      valor: '',
      fechaInicio: '',
      fechaFin: '',
      descripcion: '',
      observaciones: ''
    });
    setShowModal(false);
  };

  const handleViewCuenta = (cuenta) => {
    setSelectedCuenta(cuenta);
    setShowViewModal(true);
  };

  const handleEditCuenta = (cuenta) => {
    setSelectedCuenta(cuenta);
    setEditFormData({
      numeroContrato: cuenta.numeroContrato,
      numeroPago: cuenta.numeroPago,
      valor: cuenta.valor,
      fechaVencimiento: cuenta.fechaVencimiento,
      descripcion: cuenta.descripcion,
      observaciones: cuenta.observaciones || '',
      estado: cuenta.estado
    });
    setShowViewModal(false);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedCuentas = cuentasCobro.map(cuenta => 
      cuenta.id === selectedCuenta.id 
        ? { ...cuenta, ...editFormData, fechaModificacion: new Date().toISOString() }
        : cuenta
    );
    setCuentasCobro(updatedCuentas);
    setShowEditModal(false);
    setSelectedCuenta(null);
    setEditFormData({});
  };

  const handleDocuments = (cuenta) => {
    setSelectedCuenta(cuenta);
    setSelectedDocuments(cuenta.documentos || []);
    setShowDocumentsModal(true);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map(file => ({
      id: Date.now() + Math.random(),
      nombre: file.name,
      tipo: file.type,
      tamaño: file.size,
      fechaSubida: new Date().toISOString(),
      archivo: file
    }));
    setSelectedDocuments(prev => [...prev, ...newDocuments]);
  };

  const handleRemoveDocument = (documentId) => {
    setSelectedDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const handleSaveDocuments = () => {
    const updatedCuentas = cuentasCobro.map(cuenta => 
      cuenta.id === selectedCuenta.id 
        ? { ...cuenta, documentos: selectedDocuments }
        : cuenta
    );
    setCuentasCobro(updatedCuentas);
    setShowDocumentsModal(false);
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Pendiente': return 'warning';
      case 'En Proceso': return 'info';
      case 'Pagado': return 'success';
      default: return 'secondary';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(value);
  };

  const filteredCuentas = cuentasCobro.filter(cuenta => {
    const matchesSearch = cuenta.numeroContrato.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cuenta.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cuenta.radicado.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || cuenta.estado === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-fluid mt-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-outline-secondary me-3"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft className="me-2" />
                Volver
              </button>
              <div>
                <h2 className="mb-0">
                  <FaMoneyBillWave className="me-2 text-success" />
                  Cuentas de Cobro
                </h2>
                <p className="text-muted mb-0">Gestión de cuentas de cobro del contrato</p>
              </div>
            </div>
            <button 
              className="btn btn-success"
              onClick={() => setShowModal(true)}
            >
              <FaPlus className="me-2" />
              Nueva Cuenta de Cobro
            </button>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por contrato, descripción o radicado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select 
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="todos">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Pagado">Pagado</option>
          </select>
        </div>
        <div className="col-md-3">
          <div className="text-end">
            <small className="text-muted">
              {filteredCuentas.length} cuenta(s) encontrada(s)
            </small>
          </div>
        </div>
      </div>

      {/* Lista de cuentas de cobro */}
      <div className="row">
        {filteredCuentas.map(cuenta => (
          <div key={cuenta.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="mb-0 fw-bold">{cuenta.numeroContrato}</h6>
                <span className={`badge bg-${getStatusColor(cuenta.estado)}`}>
                  {cuenta.estado}
                </span>
              </div>
              <div className="card-body">
                <div className="mb-2">
                  <small className="text-muted">Pago #</small>
                  <div className="fw-bold">{cuenta.numeroPago}</div>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Valor</small>
                  <div className="fw-bold text-success">{formatCurrency(cuenta.valor)}</div>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Fecha Creación</small>
                  <div>{new Date(cuenta.fechaCreacion).toLocaleDateString('es-CO')}</div>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Radicado</small>
                  <div className="small">{cuenta.radicado}</div>
                </div>
                <div className="mb-3">
                  <small className="text-muted">Descripción</small>
                  <div className="small text-truncate" title={cuenta.descripcion}>
                    {cuenta.descripcion}
                  </div>
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <div className="d-flex gap-2">
                  <button 
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => handleViewCuenta(cuenta)}
                    >
                      <FaEye className="me-1" />
                      Ver
                    </button>
                    <button 
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleEditCuenta(cuenta)}
                    >
                      <FaEdit className="me-1" />
                      Editar
                    </button>
                  <button 
                     className="btn btn-outline-info btn-sm flex-fill"
                     onClick={() => handleDocuments(cuenta)}
                   >
                     <FaFileAlt className="me-1" />
                     Documentos ({cuenta.documentos?.length || 0})
                   </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCuentas.length === 0 && (
        <div className="text-center py-5">
          <FaMoneyBillWave size={64} className="text-muted mb-3" />
          <h5 className="text-muted">No se encontraron cuentas de cobro</h5>
          <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}

      {/* Modal para nueva cuenta de cobro */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <FaPlus className="me-2" />
                  Nueva Cuenta de Cobro
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Número de Contrato *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numeroContrato"
                        value={formData.numeroContrato}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Número de Pago *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="numeroPago"
                        value={formData.numeroPago}
                        onChange={handleInputChange}
                        required
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Valor *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="valor"
                        value={formData.valor}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha Vencimiento</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaVencimiento"
                        value={formData.fechaVencimiento}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción *</label>
                    <textarea
                      className="form-control"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Observaciones</label>
                    <textarea
                      className="form-control"
                      name="observaciones"
                      value={formData.observaciones}
                      onChange={handleInputChange}
                      rows="2"
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success">
                    <FaPlus className="me-2" />
                    Crear Cuenta de Cobro
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver cuenta de cobro */}
      {showViewModal && selectedCuenta && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <FaEye className="me-2" />
                  Detalle de Cuenta de Cobro
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted">Número de Contrato</label>
                    <p className="fw-bold">{selectedCuenta.numeroContrato}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted">Número de Pago</label>
                    <p className="fw-bold">{selectedCuenta.numeroPago}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted">Valor</label>
                    <p className="fw-bold text-success">{formatCurrency(selectedCuenta.valor)}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted">Estado</label>
                    <p>
                      <span className={`badge bg-${getStatusColor(selectedCuenta.estado)}`}>
                        {selectedCuenta.estado}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted">Fecha de Creación</label>
                    <p>{new Date(selectedCuenta.fechaCreacion).toLocaleDateString('es-CO')}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted">Radicado</label>
                    <p className="fw-bold">{selectedCuenta.radicado}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">Descripción</label>
                  <p>{selectedCuenta.descripcion}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">Observaciones</label>
                  <p>{selectedCuenta.observaciones || 'Sin observaciones'}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowViewModal(false)}
                >
                  Cerrar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => handleEditCuenta(selectedCuenta)}
                >
                  <FaEdit className="me-2" />
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar cuenta de cobro */}
      {showEditModal && selectedCuenta && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <FaEdit className="me-2" />
                  Editar Cuenta de Cobro
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Número de Contrato *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numeroContrato"
                        value={editFormData.numeroContrato}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Número de Pago *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="numeroPago"
                        value={editFormData.numeroPago}
                        onChange={handleEditInputChange}
                        required
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Valor *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="valor"
                        value={editFormData.valor}
                        onChange={handleEditInputChange}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Estado</label>
                      <select
                        className="form-control"
                        name="estado"
                        value={editFormData.estado}
                        onChange={handleEditInputChange}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Pagado">Pagado</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha Vencimiento</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaVencimiento"
                        value={editFormData.fechaVencimiento}
                        onChange={handleEditInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción *</label>
                    <textarea
                      className="form-control"
                      name="descripcion"
                      value={editFormData.descripcion}
                      onChange={handleEditInputChange}
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Observaciones</label>
                    <textarea
                      className="form-control"
                      name="observaciones"
                      value={editFormData.observaciones}
                      onChange={handleEditInputChange}
                      rows="2"
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <FaEdit className="me-2" />
                    Actualizar Cuenta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
       )}

      {/* Modal para gestión de documentos */}
      {showDocumentsModal && selectedCuenta && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <FaFileAlt className="me-2" />
                  Gestión de Documentos - Cuenta #{selectedCuenta.numeroPago}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDocumentsModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Mostrar estado de la cuenta */}
                <div className="alert alert-info mb-3">
                  <strong>Estado de la cuenta:</strong> 
                  <span className={`badge bg-${getStatusColor(selectedCuenta.estado)} ms-2`}>
                    {selectedCuenta.estado}
                  </span>
                  {selectedCuenta.radicado && (
                    <div className="mt-1">
                      <small><strong>Radicado:</strong> {selectedCuenta.radicado}</small>
                    </div>
                  )}
                </div>

                {/* Sección de subir documentos - solo si no está radicada */}
                {selectedCuenta.estado === 'Pendiente' && !selectedCuenta.radicado ? (
                  <div className="mb-4">
                    <label className="form-label">Subir Documentos</label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                    />
                    <small className="text-muted">Formatos permitidos: PDF, DOC, DOCX, JPG, PNG</small>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="alert alert-warning">
                      <strong>Documentos bloqueados:</strong> No se pueden agregar o modificar documentos porque la cuenta de cobro 
                      {selectedCuenta.estado === 'Pagado' && ' ya está pagada.'}
                      {selectedCuenta.estado === 'En Proceso' && ' está en proceso de revisión.'}
                      {selectedCuenta.radicado && selectedCuenta.estado === 'Pendiente' && ' ya está radicada.'}
                    </div>
                  </div>
                )}
                
                <div className="mb-3">
                  <h6>Documentos Adjuntos ({selectedDocuments.length})</h6>
                  {selectedDocuments.length === 0 ? (
                    <div className="text-center text-muted py-4">
                      <FaFileAlt size={48} className="mb-2" />
                      <p>No hay documentos adjuntos</p>
                    </div>
                  ) : (
                    <div className="list-group">
                      {selectedDocuments.map(doc => (
                        <div key={doc.id} className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{doc.nombre}</strong>
                            <br />
                            <small className="text-muted">
                              Tamaño: {(doc.tamaño / 1024).toFixed(2)} KB | 
                              Subido: {new Date(doc.fechaSubida).toLocaleDateString('es-CO')}
                            </small>
                          </div>
                          {selectedCuenta.estado === 'Pendiente' && !selectedCuenta.radicado ? (
                            <button 
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleRemoveDocument(doc.id)}
                            >
                              Eliminar
                            </button>
                          ) : (
                            <button 
                              className="btn btn-outline-secondary btn-sm"
                              disabled
                              title="No se pueden eliminar documentos en este estado"
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowDocumentsModal(false)}
                >
                  Cerrar
                </button>
                {selectedCuenta.estado === 'Pendiente' && !selectedCuenta.radicado && (
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleSaveDocuments}
                  >
                    <FaFileAlt className="me-2" />
                    Guardar Documentos
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CuentasCobro;