import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Input, Select, message, Typography  } from "antd";
import FeaturedEvents from "../../components/FeaturedEvents/FeaturedEvents";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppProvider";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";

const { Title, Text } = Typography;
const { Option } = Select;

const HomePage = () => {
  const navigate = useNavigate();
  const { state, setState } = useContext(AppContext);
  const [visibleModal, setVisibleModal] = useState(null); // Un solo estado para manejar los modales
  // revisar si es necesario
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/event/list");
        setEvents(response.data);
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, category, address, date, events]);

  // Mostrar modales según el tipo
  const showModal = (type) => setVisibleModal(type);
  const closeModal = () => setVisibleModal(null);
  const handleLoginSuccess = () => {
    closeModal();
    message.success("Inicio de sesión exitoso"); // Mostrar el mensaje de éxito al cerrar el modal
  };

  // Funcion para busqueda de eventos
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (value) => setCategory(value);
  const handleLocationChange = (e) => setAddress(e.target.value);
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

    if (category && category !== "all") {
      filtered = filtered.filter((event) => event.category === category);
    }

    if (address) {
      filtered = filtered.filter((event) =>
        event.address.toLowerCase().includes(address.toLowerCase())
      );
    }

    if (date) {
      filtered = filtered.filter((event) => event.date === date);
    }

    setFilteredEvents(filtered);
  };

  const handleFavoriteClick = (eventId) => {
    if (!state.isAuthenticated) {
      // estado global
      redirectToLogin("Debes iniciar sesión para agregar a favoritos.");
      return;
    }

    setFavorites((prevFavorites) =>
      prevFavorites.includes(eventId)
        ? prevFavorites.filter((id) => id !== eventId)
        : [...prevFavorites, eventId]
    );
  };

  const handleVoteClick = (voteAction) => {
    if (!state.isAuthenticated) {
      // Usa el estado global
      redirectToLogin("Debes iniciar sesión para votar.");
      return;
    }
    voteAction();
  };

  // Función para manejar el clic en "Crear Evento"
  const handleCreateEventClick = () => {
    if (!state.isAuthenticated) {
      showModal("login"); // Mostrar el modal de inicio de sesión si no está autenticado
    } else {
      navigate("/create-event"); // Redirigir al formulario de creación de eventos si está autenticado
    }
  };

  //Funcion para cerrar sesion
  const processLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    setState(() => ({
      ...state,
      user: null,
      isAuthenticated: false,
    }));

    navigate("/");
  };

  return (
    <div className="homepage-container">
      {/* Encabezado de la página */}
      <div className="homepage-header">
        {/* Mensaje de bienvenida si estás autenticado */}
        
        {state.isAuthenticated && (
          <Title italic >Bienvenido, {state.user.name}</Title>
        )}
        
        {/* // Botones de inicio de sesion, crear cuenta y cerr */}
        <div className="header-container">
          <h1>Eventos de Itapúa</h1>
          <div className="button-group">
           {/* Botón para crear un evento */}
            <Button type="primary" onClick={handleCreateEventClick}>
              Crear Evento
            </Button>
            {/* Si no estás autenticado (!state.isAuthenticated), se muestran los botones "Iniciar Sesión" y "Crear Cuenta". */}
            {!state.isAuthenticated && (
               <>
                <Button type="default" onClick={() => showModal("login")}>
                  Iniciar Sesión
                </Button>
                <Button type="default" onClick={() => showModal("register")}>
                  Crear Cuenta
                </Button>
              </>
            )}
            {/*Si estás autenticado (state.isAuthenticated), solo se muestra el botón "Cerrar Sesión".*/}
            {state.isAuthenticated && (
              <Button type="default" onClick={processLogout}>
                Cerrar Sesión
              </Button>
            )}
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
            className="category-select"
          >
            <Option value="all">Todos</Option>
            <Option value="teatro">Teatro</Option>
            <Option value="musica">Música</Option>
            <Option value="peliculas">Películas</Option>
            <Option value="taller">Taller</Option>
            <Option value="gastronomia">Gastronomía</Option>
            <Option value="automovilismo">Automovilístico</Option>
            <Option value="juegos">Juegos</Option>
            <Option value="exposicion">Exposición</Option>
            <Option value="conferencia">Conferencia</Option>
            <Option value="deportes">Deportes</Option>
          </Select>
          <Input
            placeholder="Ubicación"
            value={address}
            onChange={handleLocationChange}
          />
          <Input type="date" value={date} onChange={handleDateChange} />
          <Button type="primary" onClick={applyFilters}>
            Buscar
          </Button>
        </div>
      </div>
      {/* Sección de eventos destacados */}
      <div className="featured-events">
        <FeaturedEvents
          events={filteredEvents}
          onFavoriteToggle={handleFavoriteClick}
          onVoteClick={handleVoteClick}
          favorites={favorites}
          setEvents={setEvents}
        />
      </div>
      {/* MODALS */}
      <LoginModal 
        isVisible={visibleModal === "login"} 
        onClose={closeModal} 
        onLoginSuccess={handleLoginSuccess}  Pasar la función de éxito
        onSwitchToRegister={() => showModal("register")} // Cambiar de login a register
      />

      <RegisterModal
        isVisible={visibleModal === "register"}
        onClose={closeModal}
        onSwitchToLogin={() => showModal("login")} // Cambiar de register a login
      />
    </div>
  );
};

export default HomePage;
