import React from 'react';

const Perfil = () => {
  // Información del contratista
  const contratista = {
    documento: '12345678',
    nombres: 'Juan Carlos Pérez García',
    fechaExpedicionDoc: '2020-01-15',
    lugarExpedicion: 'Bogotá D.C.',
    fechaNacimiento: '1985-03-20',
    email: 'juan.perez@email.com',
    telefono: '3001234567',
    direccion: 'Calle 123 #45-67',
    barrio: 'Centro'
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">Información del Contratista</h4>
            </div>
            <div className="card-body">
              <div className="row">
                {/* Primera columna */}
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Documento</label>
                    <p className="fw-bold">{contratista.documento}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Lugar Expedición</label>
                    <p className="fw-bold">{contratista.lugarExpedicion}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Teléfono</label>
                    <p className="fw-bold">{contratista.telefono}</p>
                  </div>
                </div>
                
                {/* Segunda columna */}
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Nombres</label>
                    <p className="fw-bold">{contratista.nombres}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Fecha Nacimiento</label>
                    <p className="fw-bold">{contratista.fechaNacimiento}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Dirección</label>
                    <p className="fw-bold">{contratista.direccion}</p>
                  </div>
                </div>
                
                {/* Tercera columna */}
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Fecha Expedición Doc</label>
                    <p className="fw-bold">{contratista.fechaExpedicionDoc}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Email</label>
                    <p className="fw-bold">{contratista.email}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Barrio</label>
                    <p className="fw-bold">{contratista.barrio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;