import React, { useState, useEffect, useContext } from "react";
import { Button, Input, Select, message, Typography } from "antd";
import Navbar from "../../components/NavBar/NavBar";
import FeaturedEvents from "../../components/FeaturedEvents/FeaturedEvents";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppProvider";

const { Title } = Typography;
const { Option } = Select;

const HomePage = () => {
  const navigate = useNavigate();
  const { state, setState } = useContext(AppContext);
  const [visibleModal, setVisibleModal] = useState(null);
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

  const showModal = (type) => setVisibleModal(type);
  const closeModal = () => setVisibleModal(null);

  const handleLoginSuccess = () => {
    closeModal();
    message.success("Inicio de sesión exitoso");
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (value) => setCategory(value);
  const handleLocationChange = (e) => setAddress(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);

  const redirectToLogin = (messageText) => {
    message.warning(messageText);
    showModal("login");
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
      redirectToLogin("Debes iniciar sesión para votar.");
      return;
    }
    voteAction();
  };

  const handleCreateEventClick = () => {
    if (!state.isAuthenticated) {
      showModal("login");
    } else {
      navigate("/create-event");
    }
  };

  const processLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    setState({
      user: null,
      isAuthenticated: false,
    });

    navigate("/");
  };

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <Navbar
        state={state}
        handleCreateEventClick={handleCreateEventClick}
        showModal={showModal}
        processLogout={processLogout}
      />
      
      {/* Image Carousel */}
      <ImageCarousel />

      {/* Mensaje de bienvenida si estás autenticado */}
      {state.isAuthenticated && (
        <Title italic>Bienvenido, {state.user.name}</Title>
      )}

      {/* Filtros de búsqueda */}
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
          {/* Otras opciones de categoría */}
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

      {/* Eventos destacados */}
      <div className="featured-events">
        <FeaturedEvents
          events={filteredEvents}
          onFavoriteToggle={handleFavoriteClick}
          onVoteClick={handleVoteClick}
          favorites={favorites}
          setEvents={setEvents}
        />
      </div>

      {/* Modales de inicio de sesión y registro */}
      <LoginModal
        isVisible={visibleModal === "login"}
        onClose={closeModal}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={() => showModal("register")}
      />
      <RegisterModal
        isVisible={visibleModal === "register"}
        onClose={closeModal}
        onSwitchToLogin={() => showModal("login")}
      />
    </div>
  );
};

export default HomePage;
