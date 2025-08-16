import React from 'react'
//usando CustomHook
import useModal from "../../hooks/useModal";
import FormCambioContraseña from "./FormCambioPassword"

function CambioContraseña() {
    const { showModal, closeModal } = useModal();

  return (
    <>
    <CustomModal
        title={`Actualizar Contraseña`}
        onClose={closeModal}
        show={showModal}
        size={"sm"}
      >
        <FormCambioContraseña  cerrarModal={closeModal}>
        </FormCambioContraseña>
      </CustomModal>

    </>
  )
}

export default CambioContraseña
