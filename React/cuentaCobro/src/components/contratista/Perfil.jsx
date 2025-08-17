import React, { useState, useEffect, useContext } from 'react';
import { useApi } from '../../api/useApi';
import { ENDPOINTS } from '../../api/endpoints';
import AuthContext from '../../Context/contexAuth';

const Perfil = () => {
  const { userAuth } = useContext(AuthContext);
  const { data, loading, error, get } = useApi();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userAuth?.username) {
        try {
          // Obtener todos los usuarios
          const response = await get('api/usuarios/');
          console.log('API Response:', response); // Para debug
          
          // Manejar diferentes estructuras de respuesta
          let usuarios = response;
          if (response && response.results) {
            usuarios = response.results; // Si es paginado
          } else if (response && Array.isArray(response.data)) {
            usuarios = response.data; // Si está en data
          } else if (!Array.isArray(response)) {
            console.error('La respuesta no es un array:', response);
            return;
          }
          
          // Buscar el usuario actual por username
          const currentUser = usuarios.find(user => user.username === userAuth.username);
          setUserInfo(currentUser);
        } catch (err) {
          console.error('Error fetching user info:', err);
        }
      }
    };

    fetchUserInfo();
  }, [userAuth, get]);

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Cargando información del perfil...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="alert alert-danger" role="alert">
                  Error al cargar la información del perfil: {JSON.stringify(error)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="alert alert-warning" role="alert">
                  No se encontró información del usuario con username: {userAuth?.username}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Formatear el nombre completo
  const nombreCompleto = `${userInfo.nombre || ''} ${userInfo.segundonombre || ''} ${userInfo.primerapellido || ''} ${userInfo.segundoapellido || ''}`.trim();

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
                    <label className="form-label text-muted">Cédula</label>
                    <p className="fw-bold">{userInfo.cedula || 'No disponible'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Tipo de Documento</label>
                    <p className="fw-bold">{userInfo.tipodocumento || 'No disponible'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Lugar de Expedición</label>
                    <p className="fw-bold">{userInfo.lugarexpedicion || 'No disponible'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Teléfono</label>
                    <p className="fw-bold">{userInfo.telefono || 'No disponible'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Celular</label>
                    <p className="fw-bold">{userInfo.celular || 'No disponible'}</p>
                  </div>
                </div>
                
                {/* Segunda columna */}
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Nombre Completo</label>
                    <p className="fw-bold">{nombreCompleto || 'No disponible'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Username</label>
                    <p className="fw-bold">{userInfo.username || 'No disponible'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Email</label>
                    <p className="fw-bold">{userInfo.email || 'No disponible'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Cargo</label>
                    <p className="fw-bold">{userInfo.cargo || 'No disponible'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Rol</label>
                    <p className="fw-bold">{userInfo.rol || 'No disponible'}</p>
                  </div>
                </div>
                
                {/* Tercera columna */}
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Dirección</label>
                    <p className="fw-bold">{userInfo.direccion || 'No disponible'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Sexo</label>
                    <p className="fw-bold">{userInfo.sexo || 'No disponible'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Fecha Final Contrato</label>
                    <p className="fw-bold">{userInfo.fechafinalcontrato || 'No disponible'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Supervisor</label>
                    <p className="fw-bold">{userInfo.supervisor_nombre || 'No disponible'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Dependencia</label>
                    <p className="fw-bold">{userInfo.dependencia_nombre || 'No disponible'}</p>
                  </div>
                </div>
              </div>
              
              {/* Sección de imágenes */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Foto de Perfil</label>
                    <div className="text-center">
                      {userInfo.imagen ? (
                        <img 
                          src={userInfo.imagen} 
                          alt="Foto de perfil" 
                          className="img-thumbnail" 
                          style={{maxWidth: '200px', maxHeight: '200px'}}
                          onError={(e) => {
                            e.target.src = 'http://localhost:8000/imgs/sinfoto.jpeg';
                          }}
                        />
                      ) : (
                        <div className="bg-light p-4 rounded">
                          <p className="text-muted mb-0">No hay imagen disponible</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Firma Digital</label>
                    <div className="text-center">
                      {userInfo.firma ? (
                        <img 
                          src={userInfo.firma} 
                          alt="Firma digital" 
                          className="img-thumbnail" 
                          style={{maxWidth: '200px', maxHeight: '100px'}}
                          onError={(e) => {
                            e.target.src = 'http://localhost:8000/imgs/sinfoto.jpeg';
                          }}
                        />
                      ) : (
                        <div className="bg-light p-4 rounded">
                          <p className="text-muted mb-0">No hay firma disponible</p>
                        </div>
                      )}
                    </div>
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