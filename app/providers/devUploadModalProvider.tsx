import React, { createContext, useState, useContext } from 'react';

// Create a context for the modal
const DevUploadModalContext = createContext({});

export const useDevUploadModal = () => {
  return useContext(DevUploadModalContext);
};

type DevModalPayload = {
    file: File;
}
// Create a provider component
export const DevUploadModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPayload, setModalPayload] = useState<DevModalPayload | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const updateModal = (content:DevModalPayload) => {
    setModalPayload(content);
  }

  const closeModal = () => {
    setIsOpen(false);
    setModalPayload(null);
  };

  return (
    <DevUploadModalContext.Provider value={{ isOpen, modalPayload, openModal, closeModal, updateModal }}>
      {children}
    </DevUploadModalContext.Provider>
  );
};
