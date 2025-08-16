import React, { useState } from 'react';
import { FaFileAlt, FaEye, FaDownload, FaTrash, FaPlus, FaArrowLeft, FaUpload } from 'react-icons/fa';

function Documentos() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploadData, setUploadData] = useState({
    archivo: null,
    tipoDocumento: '',
    descripcion: ''
  });

  // Datos de ejemplo para documentos
  const documentos = [
    {
      id: 1,
      nombre: 'contrato_001.pdf',
      fechaSubida: '2024-01-15',
      tipo: 'Contrato',
      categoria: 'Doc. Identidad',
      size: '2.3 MB'
    },
    {
      id: 2,
      nombre: 'documentos_bancarios.pdf',
      fechaSubida: '2024-01-20',
      tipo: 'Rut',
      categoria: 'Certificación Bancaria',
      size: '1.8 MB'
    }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadData(prev => ({
      ...prev,
      archivo: file
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log('Subir documento:', uploadData);
    setShowUploadModal(false);
    setUploadData({
      archivo: null,
      tipoDocumento: '',
      descripcion: ''
    });
    // Aquí se enviaría el archivo al backend
  };

  const handleCancel = () => {
    setShowUploadModal(false);
    setUploadData({
      archivo: null,
      tipoDocumento: '',
      descripcion: ''
    });
  };

  const handleView = (documento) => {
    setSelectedDocument(documento);
    setShowViewModal(true);
  };

  const handleDownload = (documento) => {
    console.log('Descargar documento:', documento.nombre);
    // Aquí se descargaría el documento
  };

  const handleDelete = (documento) => {
    console.log('Eliminar documento:', documento.nombre);
    // Aquí se eliminaría el documento
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <button className="btn btn-link text-white p-0 me-2">
                  <FaArrowLeft size={18} />
                </button>
                <h4 className="mb-0">Documentos - Contrato CT-2024-001</h4>
              </div>
              <button 
                className="btn btn-dark btn-sm"
                onClick={() => setShowUploadModal(true)}
              >
                <FaPlus className="me-1" />
                Agregar Documento
              </button>
            </div>
            <div className="card-body">
              <h5 className="mb-4">Documentos Anexos</h5>
              
              {documentos.map((documento) => (
                <div key={documento.id} className="border rounded p-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <FaFileAlt className="text-danger me-2" size={24} />
                        <div>
                          <div className="fw-bold">{documento.nombre}</div>
                          <small className="text-muted">
                            Subido: {documento.fechaSubida}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex gap-1">
                        <span className="badge bg-primary">{documento.tipo}</span>
                        <span className="badge bg-secondary">{documento.categoria}</span>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex gap-2 justify-content-end">
                        <button 
                          className="btn btn-outline-info btn-sm"
                          onClick={() => handleView(documento)}
                          title="Ver"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="btn btn-outline-success btn-sm"
                          onClick={() => handleDownload(documento)}
                          title="Descargar"
                        >
                          <FaDownload />
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(documento)}
                          title="Eliminar"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Ver Documento */}
      {showViewModal && selectedDocument && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <FaFileAlt className="me-2" />
                  Información del Documento
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h6 className="text-muted mb-1">Nombre del Archivo</h6>
                    <p className="fw-bold">{selectedDocument.nombre}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-muted mb-1">Tipos de Documento</h6>
                    <div className="d-flex gap-2">
                      <span className="badge bg-primary">{selectedDocument.tipo}</span>
                      <span className="badge bg-secondary">{selectedDocument.categoria}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center text-muted">
                    <small>📅 Subido el {selectedDocument.fechaSubida}</small>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h6 className="text-muted mb-1">Contrato Asociado</h6>
                  <p className="fw-bold">CT-2024-001</p>
                </div>
                
                <div className="mb-3">
                  <h6 className="text-muted mb-1">Vista Previa</h6>
                  <div className="border rounded p-4 text-center bg-light" style={{minHeight: '200px'}}>
                    <FaFileAlt size={48} className="text-muted mb-2" />
                    <p className="text-muted mb-0">Vista previa del documento</p>
                    <small className="text-muted">Documento PDF</small>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-success"
                  onClick={() => handleDownload(selectedDocument)}
                >
                  <FaDownload className="me-1" />
                  Descargar
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowViewModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Subir Documento */}
      {showUploadModal && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <FaUpload className="me-2" />
                  Agregar Documento
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpload}>
                  <div className="mb-3">
                    <label className="form-label">Seleccionar Archivo</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      required
                    />
                    <div className="form-text">
                      Formatos permitidos: PDF, DOC, DOCX, JPG, PNG (Máximo 10MB)
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tipo de Documento</label>
                    <select
                      className="form-select"
                      name="tipoDocumento"
                      value={uploadData.tipoDocumento}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="contrato">Contrato</option>
                      <option value="rut">RUT</option>
                      <option value="cedula">Cédula</option>
                      <option value="certificacion">Certificación Bancaria</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción (Opcional)</label>
                    <textarea
                      className="form-control"
                      name="descripcion"
                      value={uploadData.descripcion}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Descripción del documento..."
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-success" onClick={handleUpload}>
                  <FaUpload className="me-1" />
                  Subir Documento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Documentos;