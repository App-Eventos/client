import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Select, message } from 'antd';
import EventForm from '../../components/EventForm/EventForm';
import FeaturedEvents from '../../components/FeaturedEvents/FeaturedEvents';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './HomePage.css';
import { useNavigate} from 'react-router-dom';

const { Option } = Select;

const HomePage = ({ setLoginValidated }) => {
  const navigate =useNavigate();
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
 

  //función para manejar el éxito del inicio de sesión
  const handleLoginSuccess = () => {
    setLoginValidated(true);
    setIsLoginModalVisible(false); // Cierra el modal después de iniciar sesión
    setIsAuthenticated(true);
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, category, location, date, events]);

  const showEventModal = () => {
    if (isAuthenticated) {
      setIsEventModalVisible(true);
    } else {
      redirectToLogin('Debes iniciar sesión para crear un evento.');
    }
  };

  const showLoginModal = () => setIsLoginModalVisible(true);
  const showRegisterModal = () => setIsRegisterModalVisible(true);

  const handleEventModalCancel = () => setIsEventModalVisible(false);
  const handleLoginModalCancel = () => setIsLoginModalVisible(false);
  const handleRegisterModalCancel = () => setIsRegisterModalVisible(false);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (value) => setCategory(value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);

  const redirectToLogin = (messageText) => {
    message.warning(messageText);
    setIsLoginModalVisible(true);
  };

  const applyFilters = () => {
    let filtered = events;

    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category && category !== 'all') {
      filtered = filtered.filter((event) => event.category === category);
    }

    if (location) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (date) {
      filtered = filtered.filter((event) => event.date === date);
    }

    setFilteredEvents(filtered);
  };

  const handleFavoriteClick = (eventId) => {
    if (!isAuthenticated) {
      redirectToLogin('Debes iniciar sesión para agregar a favoritos.');
      return;
    }

    setFavorites((prevFavorites) =>
      prevFavorites.includes(eventId)
        ? prevFavorites.filter((id) => id !== eventId)
        : [...prevFavorites, eventId]
    );
  };

  const handleVoteClick = (voteAction) => {
    if (!isAuthenticated) {
      redirectToLogin('Debes iniciar sesión para votar.');
      return;
    }

    voteAction();
  };

  const handleEventCreate = (newEvent) => {
    setEvents([...events, newEvent]);
    setIsEventModalVisible(false);
  };

  const processLogout = () =>{
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate ("/login");
  }

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <div className="header-container">
          <h1>Eventos de Itapúa</h1>
          <div className="button-group">
            <Button type="primary" onClick={showEventModal}>
              Crear Evento
            </Button>
            <Button type="default" onClick={showLoginModal}>
              Iniciar Sesión
            </Button>
            <Button type="default" onClick={showRegisterModal}>
              Crear Cuenta
            </Button>
            <Button type="default" onClick={processLogout}>
              Cerrar sesion
            </Button>

          </div>
        </div>

        <div className="search-filters">
          <Input
            placeholder="Buscar eventos"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Select
            placeholder="Categorías"
            value={category}
            onChange={handleCategoryChange}
            className="category-select" // Añadido para estilos específicos
          >
            <Option value="all">Todos</Option>
            <Option value="music">Música</Option>
            <Option value="sports">Deportes</Option>
            <Option value="education">Educación</Option>
            <Option value="entertainment">Entretenimiento</Option>
          </Select>
          <Input
            placeholder="Ubicación"
            value={location}
            onChange={handleLocationChange}
          />
          <Input type="date" value={date} onChange={handleDateChange} />
          <Button type="primary" onClick={applyFilters}>
            Buscar
          </Button>
        </div>
      </div>

      {/* Aquí se agrega el mensaje de inicio de sesión */}
      {isAuthenticated && (
        <p>Aquí se cargarán los componentes a visualizarse al hacer inicio de sesión.</p>
      )}

      <div className="featured-events">
        <FeaturedEvents
          events={filteredEvents}
          onFavoriteToggle={handleFavoriteClick}
          onVoteClick={handleVoteClick}
          favorites={favorites}
        />
      </div>

      <Modal
        title="Crear Evento"
        open={isEventModalVisible}
        footer={null}
        onCancel={handleEventModalCancel}
      >
        <EventForm onCreate={handleEventCreate} />
      </Modal>

      <Modal
        title="Iniciar Sesión"
        open={isLoginModalVisible}
        footer={null}
        onCancel={handleLoginModalCancel}
      >
        <LoginForm 
        setLoginValidated={handleLoginSuccess}  
        onLoginSuccess={() => setIsAuthenticated(true)} />
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

