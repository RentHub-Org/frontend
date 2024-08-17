import React, { createContext, useState, useContext } from 'react';

// Create a context for the modal
const RentalUploadModalContext = createContext({});

export const useRentalUploadModal = () => {
  return useContext(RentalUploadModalContext);
};

type RentalModalPayload = {
    file: File;
}
// Create a provider component
export const RentalUploadModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPayload, setModalPayload] = useState<RentalModalPayload | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const updateModal = (content:RentalModalPayload) => {
    setModalPayload(content);
  }

  const closeModal = () => {
    setIsOpen(false);
    setModalPayload(null);
  };

  return (
    <RentalUploadModalContext.Provider value={{ isOpen, modalPayload, openModal, closeModal, updateModal }}>
      {children}
    </RentalUploadModalContext.Provider>
  );
};
