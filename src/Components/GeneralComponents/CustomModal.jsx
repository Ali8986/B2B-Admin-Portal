import React from "react";
import Modal from "@mui/material/Modal";
const CustomModal = ({
  open,
  handleClose,
  component,
  CustomSpacing = false,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    maxWidth: CustomSpacing ? "30%" : "100%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 3,
    p: 4,
  };
  return (
    <Modal
      className="main-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ backgroundColor: "rgba(0, 0, 0, 5%)" }}
    >
      <div
        style={style}
        className={`Password-Change-Container container bg-white text-center ${
          CustomSpacing ? "py-md-5 px-md-0" : "p-md-4"
        } border-0 rounded-4`}
      >
        <div className="delete-modal-close" onClick={handleClose}>
          &times;
        </div>
        {component}
      </div>
    </Modal>
  );
};

export default CustomModal;
