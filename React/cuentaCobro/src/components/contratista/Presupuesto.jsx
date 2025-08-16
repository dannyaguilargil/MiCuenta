import React from 'react';
import { FaCalculator } from 'react-icons/fa';

function Presupuesto() {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="d-flex align-items-center">
                <FaCalculator className="me-2" />
                <h4 className="mb-0">Presupuesto</h4>
              </div>
            </div>
            <div className="card-body">
              <div className="text-center py-5">
                <FaCalculator size={64} className="text-muted mb-3" />
                <h5 className="text-muted">Vista en construcción</h5>
                <p className="text-muted">
                  Esta sección estará disponible próximamente para gestionar el presupuesto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presupuesto;