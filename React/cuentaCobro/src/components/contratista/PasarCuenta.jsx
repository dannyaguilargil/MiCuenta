import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaEdit, FaFileAlt, FaEye, FaPlus, FaSearch, FaSpinner, FaTimes, FaCheck } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useContratos from '../../hooks/useContratos';

function PasarCuenta() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRpModal, setShowRpModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [rpSearchResults, setRpSearchResults] = useState([]);
  const [showRpResults, setShowRpResults] = useState(false);
  const [selectedRp, setSelectedRp] = useState(null);
  const [supervisores, setSupervisores] = useState([]);
  const [supervisorSearchResults, setSupervisorSearchResults] = useState([]);
  const [showSupervisorResults, setShowSupervisorResults] = useState(false);
  const [supervisorSearchTerm, setSupervisorSearchTerm] = useState('');
  const [rpFormData, setRpFormData] = useState({
    numero_rp: '',
    numero_contrato: '',
    tipo_contrato: '',
    duracion: '',
    fecha_inicio: '',
    fecha_final: '',
    objeto: '',
    fecha_rp: '',
    fecha_suscripcion: '',
    valor: '',
    archivo: null
  });
  const [formData, setFormData] = useState({
    registroPresupuestal: '',
    numeroContrato: '',
    tipoContrato: '',
    numeroPagos: '',
    fechaInicio: '',
    fechaFin: '',
    supervisorContrato: '',
    objeto: '',
    archivoContrato: null
  });

  // Hook para obtener contratos y RPs
  const { contratos, rps, loading, error, refetch, getContratosWithRpInfo } = useContratos(currentUser?.id);
  
  // Obtener contratos con información de RP
  const contratosVigentes = getContratosWithRpInfo();

  // Obtener información del usuario actual (simulado por ahora)
  useEffect(() => {
    // Aquí deberías obtener la información del usuario autenticado
    // Por ahora usamos un usuario de ejemplo
    setCurrentUser({ id: 1, nombre: 'Usuario Actual' });
  }, []);

  // Cargar supervisores desde la API
  useEffect(() => {
    const fetchSupervisores = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/supervisores/');
        if (response.ok) {
          const data = await response.json();
          setSupervisores(data.results || data);
        }
      } catch (error) {
        console.error('Error al cargar supervisores:', error);
      }
    };
    fetchSupervisores();
  }, []);

  // Cerrar resultados de búsqueda al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.position-relative')) {
        setShowRpResults(false);
        setShowSupervisorResults(false);
      }
    };

    if (showRpResults || showSupervisorResults) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showRpResults, showSupervisorResults]);





  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
    
    // Búsqueda automática para el campo de RP
    if (name === 'registroPresupuestal') {
      if (value.length > 0) {
        const filteredRps = rps.filter(rp => 
          rp.numero.toLowerCase().includes(value.toLowerCase()) ||
          rp.objeto.toLowerCase().includes(value.toLowerCase())
        );
        setRpSearchResults(filteredRps);
        setShowRpResults(true);
      } else {
        setRpSearchResults([]);
        setShowRpResults(false);
        setSelectedRp(null);
      }
    }
  };

  const handleRpInputChange = (e) => {
    const { name, value, files } = e.target;
    setRpFormData(prev => ({
      ...prev,
      [name]: name === 'archivo' ? files[0] : value
    }));
  };

  const searchRp = () => {
    const searchTerm = formData.registroPresupuestal.toLowerCase();
    if (searchTerm.length > 0) {
      const filteredRps = rps.filter(rp => 
        (rp.numero_rp && rp.numero_rp.toLowerCase().includes(searchTerm)) ||
        (rp.numero && rp.numero.toLowerCase().includes(searchTerm)) ||
        (rp.objeto && rp.objeto.toLowerCase().includes(searchTerm)) ||
        (rp.numero_contrato && rp.numero_contrato.toLowerCase().includes(searchTerm))
      );
      setRpSearchResults(filteredRps);
      setShowRpResults(true);
    } else {
      // Mostrar todos los RPs disponibles cuando no hay término de búsqueda
      setRpSearchResults(rps || []);
      setShowRpResults(true);
    }
  };

  const selectRp = (rp) => {
    setSelectedRp(rp);
    setFormData(prev => ({
      ...prev,
      registroPresupuestal: rp.numero_rp || rp.numero,
      numeroContrato: rp.numero_contrato,
      tipoContrato: rp.tipo_contrato,
      fechaInicio: rp.fecha_inicio,
      fechaFin: rp.fecha_final,
      objeto: rp.objeto,
      // Limpiar campos que deben completarse manualmente
        numeroPagos: '',
        supervisorContrato: '',
        archivoContrato: null
    }));
    // Limpiar también el término de búsqueda del supervisor
    setSupervisorSearchTerm('');
    setShowRpResults(false);
    
    // Mostrar notificación de éxito
    toast.success(
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FaCheck style={{ color: '#28a745' }} />
        RP seleccionado correctamente. Información transferida al formulario.
      </div>,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      }
    );
  };

  // Funciones para manejar supervisores
  const searchSupervisor = (searchTerm) => {
    setSupervisorSearchTerm(searchTerm);
    if (searchTerm.length > 0) {
      const filteredSupervisores = supervisores.filter(supervisor => 
        supervisor.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supervisor.nombre_usuario.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSupervisorSearchResults(filteredSupervisores);
      setShowSupervisorResults(true);
    } else {
      setSupervisorSearchResults([]);
      setShowSupervisorResults(false);
    }
  };

  const selectSupervisor = (supervisor) => {
    setFormData(prev => ({
      ...prev,
      supervisorContrato: supervisor.cedula
    }));
    setSupervisorSearchTerm(supervisor.nombre_completo);
    setShowSupervisorResults(false);
    
    // Mostrar notificación de éxito
    toast.success(
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FaCheck style={{ color: '#28a745' }} />
        Supervisor seleccionado: {supervisor.nombre_completo}
      </div>,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      }
    );
  };

  const handleCreateRp = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Agregar todos los campos del modelo Django
      formDataToSend.append('numero_rp', rpFormData.numero_rp);
      formDataToSend.append('numero_contrato', rpFormData.numero_contrato);
      formDataToSend.append('tipo_contrato', rpFormData.tipo_contrato);
      formDataToSend.append('duracion', rpFormData.duracion);
      formDataToSend.append('fecha_inicio', rpFormData.fecha_inicio);
      formDataToSend.append('fecha_final', rpFormData.fecha_final);
      formDataToSend.append('objeto', rpFormData.objeto);
      formDataToSend.append('fecha_rp', rpFormData.fecha_rp);
      formDataToSend.append('fecha_suscripcion', rpFormData.fecha_suscripcion);
      formDataToSend.append('valor', rpFormData.valor);
      
      // Agregar archivo si existe
      if (rpFormData.archivo) {
        formDataToSend.append('archivo', rpFormData.archivo);
      }
      
      const response = await fetch('http://localhost:8000/api/rp/', {
        method: 'POST',
        body: formDataToSend
      });
      
      if (response.ok) {
        const newRp = await response.json();
        
        // Mostrar notificación de éxito con toastify
        toast.success(
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaCheck style={{ color: '#28a745' }} />
            ¡RP creado exitosamente! Los datos se han transferido al formulario de contrato.
          </div>,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              backgroundColor: '#d4edda',
              color: '#155724',
              border: '1px solid #c3e6cb'
            }
          }
        );
        
        // Cerrar modal de RP
        setShowRpModal(false);
        setRpFormData({
          numero_rp: '',
          numero_contrato: '',
          tipo_contrato: '',
          duracion: '',
          fecha_inicio: '',
          fecha_final: '',
          objeto: '',
          fecha_rp: '',
          fecha_suscripcion: '',
          valor: '',
          archivo: null
        });
        
        // Actualizar la lista de RPs
        refetch();
        
        // Transferir datos al modal de contrato incluyendo fechas
        setFormData(prev => ({
          ...prev,
          registroPresupuestal: newRp.numero_rp,
          numeroContrato: newRp.numero_contrato,
          tipoContrato: newRp.tipo_contrato,
          fechaInicio: newRp.fecha_inicio,
          fechaFin: newRp.fecha_final,
          objeto: newRp.objeto
        }));
        
        // Seleccionar el nuevo RP
        setSelectedRp(newRp);
        
        // Abrir modal de contrato
        setShowModal(true);
        
      } else {
        const errorData = await response.json();
        toast.error(
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaTimes style={{ color: '#dc3545' }} />
            Error al crear RP: {errorData.message || 'Error desconocido'}
          </div>,
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          }
        );
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaTimes style={{ color: '#dc3545' }} />
          Error de conexión al crear RP
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        }
      );
    }
  };

  const handleRpCancel = () => {
    setShowRpModal(false);
    setRpFormData({
      numero_rp: '',
      numero_contrato: '',
      tipo_contrato: '',
      duracion: '',
      fecha_inicio: '',
      fecha_final: '',
      objeto: '',
      fecha_rp: '',
      fecha_suscripcion: '',
      valor: '',
      archivo: null
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!formData.numeroContrato || !formData.tipoContrato || !formData.numeroPagos || 
        !formData.fechaInicio || !formData.fechaFin || !formData.supervisorContrato || !formData.objeto) {
      toast.error(
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaTimes style={{ color: '#dc3545' }} />
          Por favor, complete todos los campos obligatorios
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        }
      );
      return;
    }
    
    // Crear FormData para enviar archivo y datos
    const formDataToSend = new FormData();
    formDataToSend.append('rp', selectedRp?.id);
    formDataToSend.append('numero_pagos', parseInt(formData.numeroPagos));
    formDataToSend.append('supervisor', formData.supervisorContrato);
    formDataToSend.append('numero_proceso', formData.numeroContrato);
    
    // Agregar archivo si existe
    if (formData.archivoContrato) {
      formDataToSend.append('archivo', formData.archivoContrato);
    }
    
    try {
      const response = await fetch('http://localhost:8000/api/contrato/', {
        method: 'POST',
        // No establecer Content-Type para FormData, el navegador lo hace automáticamente
        body: formDataToSend
      });
      
      if (response.ok) {
        const newContrato = await response.json();
        
        // Mostrar notificación de éxito
        toast.success(
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaCheck style={{ color: '#28a745' }} />
            ¡Contrato creado exitosamente! Asociado al RP {selectedRp?.numero_rp || selectedRp?.numero} y supervisor seleccionado.
          </div>,
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              backgroundColor: '#d4edda',
              color: '#155724',
              border: '1px solid #c3e6cb'
            }
          }
        );
        
        setShowModal(false);
        handleCancel();
        // Actualizar la lista de contratos
        refetch();
      } else {
        const errorData = await response.json();
        toast.error(
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaTimes style={{ color: '#dc3545' }} />
            Error al crear contrato: {errorData.message || 'Error desconocido'}
          </div>,
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          }
        );
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaTimes style={{ color: '#dc3545' }} />
          Error de conexión al crear contrato
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        }
      );
    }
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
      objeto: '',
      archivoContrato: null
    });
    setSelectedRp(null);
    setRpSearchResults([]);
    setShowRpResults(false);
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
      objeto: '',
      archivoContrato: null
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
      objeto: '',
      archivoContrato: null
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
              {loading ? (
                <div className="text-center py-4">
                  <FaSpinner className="fa-spin me-2" />
                  Cargando contratos...
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  <strong>Error:</strong> {error}
                  <button className="btn btn-sm btn-outline-danger ms-2" onClick={refetch}>
                    Reintentar
                  </button>
                </div>
              ) : contratosVigentes.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <p>No hay contratos vigentes disponibles.</p>
                </div>
              ) : (
                contratosVigentes.map((contrato, index) => (
                  <div key={contrato.id || index} className="border rounded p-4 mb-3">
                    <div className="row mb-3">
                      <div className="col-md-3">
                        <div className="mb-2">
                          <small className="text-muted">Número RP</small>
                          <div className="fw-bold">{contrato.numeroRP}</div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-2">
                          <small className="text-muted">Número Proceso</small>
                          <div className="fw-bold">{contrato.numero_proceso || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-2">
                          <small className="text-muted">Fecha Inicio</small>
                          <div className="fw-bold">{contrato.fechaInicio ? new Date(contrato.fechaInicio).toLocaleDateString() : 'N/A'}</div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-2">
                          <small className="text-muted">Fecha Fin</small>
                          <div className="fw-bold">{contrato.fechaFin ? new Date(contrato.fechaFin).toLocaleDateString() : 'N/A'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="mb-2">
                          <small className="text-muted">Supervisor</small>
                          <div className="fw-bold">{contrato.supervisor_nombre || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-2">
                          <small className="text-muted">Valor Contrato</small>
                          <div className="fw-bold">{contrato.valorContrato !== 'N/A' ? `$${Number(contrato.valorContrato).toLocaleString()}` : 'N/A'}</div>
                        </div>
                      </div>
                    </div>
                    
                    {contrato.objetoContrato && contrato.objetoContrato !== 'N/A' && (
                      <div className="mb-3">
                        <small className="text-muted">Objeto del Contrato</small>
                        <div className="fw-bold">{contrato.objetoContrato}</div>
                      </div>
                    )}
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">Progreso de Pagos</small>
                        <small className="text-muted">{contrato.progresoPagos || 0} de {contrato.numero_pagos || 0} pagos</small>
                      </div>
                      <div className="progress" style={{height: '8px'}}>
                        <div 
                          className="progress-bar bg-primary" 
                          role="progressbar" 
                          style={{width: `${contrato.numero_pagos ? ((contrato.progresoPagos || 0) / contrato.numero_pagos) * 100 : 0}%`}}
                          aria-valuenow={contrato.progresoPagos || 0} 
                          aria-valuemin="0" 
                          aria-valuemax={contrato.numero_pagos || 0}
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
              ))
              )}
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
                      <div className="input-group position-relative">
                        <input
                          type="text"
                          className="form-control"
                          name="registroPresupuestal"
                          value={formData.registroPresupuestal}
                          onChange={handleInputChange}
                          placeholder="Buscar RP..."
                        />
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={searchRp}
                        >
                          <FaSearch />
                        </button>
                        <button 
                          className="btn btn-outline-success" 
                          type="button"
                          onClick={() => setShowRpModal(true)}
                          title="Crear nuevo RP"
                        >
                          <FaPlus />
                        </button>
                        
                        {/* Resultados de búsqueda */}
                        {showRpResults && rpSearchResults.length > 0 && (
                          <div className="position-absolute w-100 bg-white border rounded shadow-lg" style={{top: '100%', zIndex: 1000, maxHeight: '200px', overflowY: 'auto'}}>
                            {rpSearchResults.map((rp, index) => (
                              <div 
                                key={index}
                                className="p-2 border-bottom cursor-pointer hover-bg-light"
                                onClick={() => selectRp(rp)}
                                style={{cursor: 'pointer'}}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                              >
                                <div className="fw-bold">RP: {rp.numero_rp || rp.numero}</div>
                                {rp.numero_contrato && (
                                  <div className="text-primary small">Contrato: {rp.numero_contrato}</div>
                                )}
                                <div className="text-muted small">{rp.objeto}</div>
                                <div className="text-success small">Valor: ${rp.valor?.toLocaleString()}</div>
                                {rp.fecha_inicio && rp.fecha_final && (
                                  <div className="text-info small">
                                    {rp.fecha_inicio} - {rp.fecha_final}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {showRpResults && rpSearchResults.length === 0 && (
                          <div className="position-absolute w-100 bg-white border rounded shadow-lg" style={{top: '100%', zIndex: 1000}}>
                            <div className="p-3 text-center text-muted">
                              No se encontraron RPs que coincidan con la búsqueda
                            </div>
                          </div>
                        )}
                    </div>
                    {!formData.supervisorContrato && selectedRp && (
                      <small className="text-danger">Este campo debe completarse antes de registrar el contrato</small>
                    )}
                  </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Número de Contrato {!formData.numeroContrato && '*'}</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numeroContrato"
                        value={formData.numeroContrato}
                        onChange={handleInputChange}
                        placeholder="Ingrese el número de contrato"
                        required={!formData.numeroContrato}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Tipo de Contrato {!formData.tipoContrato && '*'}</label>
                      <input
                        type="text"
                        className="form-control"
                        name="tipoContrato"
                        value={formData.tipoContrato}
                        onChange={handleInputChange}
                        placeholder="Ej: Prestación de servicios, Obra, etc."
                        required={!formData.tipoContrato}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{color: !formData.numeroPagos && selectedRp ? '#dc3545' : 'inherit'}}>Número de Pagos {!formData.numeroPagos && '*'}</label>
                      <input
                        type="number"
                        className={`form-control ${!formData.numeroPagos && selectedRp ? 'border-danger' : ''}`}
                        name="numeroPagos"
                        value={formData.numeroPagos}
                        onChange={handleInputChange}
                        placeholder="Cantidad de pagos del contrato"
                        required={!formData.numeroPagos}
                        min="1"
                        style={{borderColor: !formData.numeroPagos && selectedRp ? '#dc3545' : ''}}
                      />
                      {!formData.numeroPagos && selectedRp && (
                        <small className="text-danger">Este campo debe completarse antes de registrar el contrato</small>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha Inicio {!formData.fechaInicio && '*'}</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaInicio"
                        value={formData.fechaInicio}
                        onChange={handleInputChange}
                        required={!formData.fechaInicio}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha Fin {!formData.fechaFin && '*'}</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaFin"
                        value={formData.fechaFin}
                        onChange={handleInputChange}
                        required={!formData.fechaFin}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{color: !formData.supervisorContrato && selectedRp ? '#dc3545' : 'inherit'}}>Supervisor de Contrato {!formData.supervisorContrato && '*'}</label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className={`form-control ${!formData.supervisorContrato && selectedRp ? 'border-danger' : ''}`}
                        value={supervisorSearchTerm}
                        onChange={(e) => searchSupervisor(e.target.value)}
                        placeholder="Buscar supervisor por nombre..."
                        required={!formData.supervisorContrato}
                        style={{borderColor: !formData.supervisorContrato && selectedRp ? '#dc3545' : ''}}
                      />
                      
                      {/* Resultados de búsqueda de supervisores */}
                      {showSupervisorResults && supervisorSearchResults.length > 0 && (
                        <div className="position-absolute w-100 bg-white border rounded shadow-lg" style={{top: '100%', zIndex: 1000, maxHeight: '200px', overflowY: 'auto'}}>
                          {supervisorSearchResults.map((supervisor, index) => (
                            <div 
                              key={index}
                              className="p-2 border-bottom cursor-pointer hover-bg-light"
                              onClick={() => selectSupervisor(supervisor)}
                              style={{cursor: 'pointer'}}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                            >
                              <div className="fw-bold">{supervisor.nombre_completo}</div>
                              <div className="text-muted small">Usuario: {supervisor.nombre_usuario}</div>
                              <div className="text-info small">Cédula: {supervisor.cedula}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {showSupervisorResults && supervisorSearchResults.length === 0 && supervisorSearchTerm.length > 0 && (
                        <div className="position-absolute w-100 bg-white border rounded shadow-lg" style={{top: '100%', zIndex: 1000}}>
                          <div className="p-3 text-center text-muted">
                            No se encontraron supervisores que coincidan con la búsqueda
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Objeto {!formData.objeto && '*'}</label>
                    <textarea
                      className="form-control"
                      name="objeto"
                      value={formData.objeto}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Describa el objeto del contrato..."
                      required={!formData.objeto}
                    ></textarea>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Número de Proceso (opcional)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numeroContrato"
                        value={formData.numeroContrato}
                        onChange={handleInputChange}
                        placeholder="Ingrese el número de proceso del contrato..."
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Archivo del Contrato (opcional)</label>
                      <input
                        type="file"
                        className="form-control"
                        name="archivoContrato"
                        onChange={handleInputChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <div className="form-text">Formatos: PDF, DOC, DOCX, JPG, JPEG, PNG</div>
                    </div>
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

      {/* Modal para Nuevo RP */}
      {showRpModal && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Crear Nuevo Registro Presupuestal</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleRpCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateRp}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Número de RP *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numero_rp"
                        value={rpFormData.numero_rp}
                        onChange={handleRpInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Número de Contrato *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numero_contrato"
                        value={rpFormData.numero_contrato}
                        onChange={handleRpInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Tipo de Contrato *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="tipo_contrato"
                        value={rpFormData.tipo_contrato}
                        onChange={handleRpInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Duración *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="duracion"
                        value={rpFormData.duracion}
                        onChange={handleRpInputChange}
                        placeholder="Ej: 12 meses"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha de Inicio *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fecha_inicio"
                        value={rpFormData.fecha_inicio}
                        onChange={handleRpInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha Final *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fecha_final"
                        value={rpFormData.fecha_final}
                        onChange={handleRpInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha de RP *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fecha_rp"
                        value={rpFormData.fecha_rp}
                        onChange={handleRpInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Fecha de Suscripción *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fecha_suscripcion"
                        value={rpFormData.fecha_suscripcion}
                        onChange={handleRpInputChange}
                        required
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
                        value={rpFormData.valor}
                        onChange={handleRpInputChange}
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Archivo Adjunto</label>
                      <input
                        type="file"
                        className="form-control"
                        name="archivo"
                        onChange={handleRpInputChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Objeto del Contrato *</label>
                    <textarea
                      className="form-control"
                      name="objeto"
                      value={rpFormData.objeto}
                      onChange={handleRpInputChange}
                      rows="4"
                      required
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleRpCancel}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-success" onClick={handleCreateRp}>
                  Crear RP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container para notificaciones */}
      <ToastContainer />
    </div>
  );
}

export default PasarCuenta;