import React, { useState, useContext } from "react";
import { Modal, Button } from "antd";
import { AppContext } from "../../context/AppProvider";
import RegisterForm from "../RegisterForm/RegisterForm";

const RegisterModal = ({ isVisible, onClose, onSwitchToLogin }) => {
  const handleRegisterSuccess = () => {
    onClose(); // Cerrar el modal al crear la cuenta
  };

  return (
    <Modal
      title="Crear cuenta"
      open={isVisible}
      footer={null}
      onCancel={onClose}
    >
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={onSwitchToLogin}/>
    </Modal>
  );
};

export default RegisterModal;
