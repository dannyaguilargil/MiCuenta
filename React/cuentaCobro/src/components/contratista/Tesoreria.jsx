import React from 'react';
import { FaUniversity } from 'react-icons/fa';

function Tesoreria() {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="d-flex align-items-center">
                <FaUniversity className="me-2" />
                <h4 className="mb-0">Tesorería</h4>
              </div>
            </div>
            <div className="card-body">
              <div className="text-center py-5">
                <FaUniversity size={64} className="text-muted mb-3" />
                <h5 className="text-muted">Vista en construcción</h5>
                <p className="text-muted">
                  Esta sección estará disponible próximamente para gestionar las funciones de tesorería.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tesoreria;