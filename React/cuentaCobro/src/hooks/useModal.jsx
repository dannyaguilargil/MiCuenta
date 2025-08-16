import { useState } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };
  
  return {
    showModal,
    selectedId,
    openModal,
    closeModal,
  };
};

export default useModal;