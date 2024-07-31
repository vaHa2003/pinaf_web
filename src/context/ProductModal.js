import React, { createContext, useState } from "react";

const ModalContext = createContext();

function ProductModal({ children }) {
  const [open, setOpen] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAddOpen = () => {
    setModalAdd(true);
  };

  const handleAddClose = () => {
    setModalAdd(false);
  };

  const modal = {
    open,
    modalAdd,
    handleClickOpen,
    handleClose,
    handleClickAddOpen,
    handleAddClose,
  };
  return (
    <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
  );
}

export { ProductModal, ModalContext };
