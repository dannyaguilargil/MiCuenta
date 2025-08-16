import React from "react";

function formCambioContraseña(props) {

    function cambiarContraseña(){
        return ""
    }

  return (
    <>
      <form action={cambiarContraseña}>
        <div className="card mb-4">
          <CabezeraModal
            background="#FFFFCC"
            title="Actualizar Contraseña"
          ></CabezeraModal>
          <div className="card-body">
            <div className="row">
            <CampoForm
                label="Usuario"
                value={""}
                campo="user"
                type="text"
                state={false}
            ></CampoForm>
            <CampoForm
                label="Nueva Contraseña"
                value={""}
                campo="password"
                type="password"
                state={false}
            ></CampoForm>
            <p>Debe contener al menos 8 caracteres, una mayúscula, un número y un símbolo.</p>
             <CampoForm
                label="Confirmar Nueva Contraseña"
                value={""}
                campo="npassword"
                type="password"
                state={false}
            ></CampoForm>
             <button
                type="summit"
                name="action"
                value="close"
                className="btn btn-secondary"
                onClick={()=> props.cerrarModal()}
              >
                cerrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default formCambioContraseña;
