import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import EventForm from '../components/EventForm/EventForm';
import FeaturedEvents from '../components/FeaturedEvents/FeaturedEvents';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';

const HomePage = () => {
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const showEventModal = () => {
    setIsEventModalVisible(true);
  };

  const showLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const showRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };

  const handleEventModalCancel = () => {
    setIsEventModalVisible(false);
  };

  const handleLoginModalCancel = () => {
    setIsLoginModalVisible(false);
  };

  const handleRegisterModalCancel = () => {
    setIsRegisterModalVisible(false);
  };

  return (
    <div>
      <h1>Eventos Destacados</h1>
      <div style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={showEventModal} style={{ marginRight: '10px' }}>
          Crear Evento
        </Button>
        <Button type="default" onClick={showLoginModal} style={{ marginRight: '10px' }}>
          Iniciar Sesión
        </Button>
        <Button type="default" onClick={showRegisterModal}>
          Crear Cuenta
        </Button>
      </div>
      <FeaturedEvents onFavoriteToggle={toggleFavorite} favorites={favorites} />
      <Modal
        title="Crear Evento"
        open={isEventModalVisible}
        footer={null}
        onCancel={handleEventModalCancel}
      >
        <EventForm />
      </Modal>
      <Modal
        title="Iniciar Sesión"
        open={isLoginModalVisible}
        footer={null}
        onCancel={handleLoginModalCancel}
      >
        <LoginForm />
      </Modal>
      <Modal
        title="Crear Cuenta"
        open={isRegisterModalVisible}
        footer={null}
        onCancel={handleRegisterModalCancel}
      >
        <RegisterForm />
      </Modal>
    </div>
  );
};

export default HomePage;

