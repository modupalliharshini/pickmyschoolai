import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null); // 'signin' | 'list' | 'apply' | 'bookTrial' | null
  const [modalData, setModalData] = useState(null);

  const openModal = (type, data = null) => {
    setModal(type);
    setModalData(data);
  };

  const closeModal = () => {
    setModal(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ modal, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
