import { useState } from "react";

const useModalById = () => {

  const [modalsState, setModalsState] = useState({});

  const openModal = (id) => {
    setModalsState(prev => ({
      ...prev,
      [id]: true,
    }));
  };

  const closeModal = (id) => {
    setModalsState(prev => ({
      ...prev,
      [id]: false,
    }));
  };

  const closeAllModals = () => {
    setModalsState({});
  };
  
  const isModalOpen = (id) => {
    return !!modalsState[id];
  };

  return {
    modalsState,
    isModalOpen,
    openModal,
    closeModal,
    closeAllModals,
  };
};

export default useModalById;