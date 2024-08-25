import React, { useState, useContext } from 'react';
import { Modal, Button } from 'antd';
import LoginForm from '../../components/LoginForm/LoginForm';
import { AppContext } from '../../context/AppProvider';

const LoginModal = ({ isVisible, onClose, onSwitchToRegister }) => {
 const handleLoginSuccess = () => {
    onClose(); // Cerrar el modal al iniciar sesión
  };
  return (
    <Modal
      title="Iniciar Sesión"
      open={isVisible}
      footer={null}
      onCancel={onClose}
    >
      <LoginForm onLoginSuccess={handleLoginSuccess} onSwitchToRegister={onSwitchToRegister} />
    </Modal>
  );
};

export default LoginModal;
