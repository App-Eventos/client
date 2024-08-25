import React from "react";
import { Button } from "antd"; // Si estás utilizando Ant Design
import { useNavigate } from "react-router-dom"; // Si estás utilizando React Router
import "./Navbar.css";

const Navbar = ({ state, handleCreateEventClick, showModal, processLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <h1 onClick={() => navigate("/")}>Eventos de Itapúa</h1>
      </div>
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
      
         {/* Si estás autenticado (state.isAuthenticated), se muestran los botones "Mis eventos", "Mis Favoritos" y "Cerrar Sesión". */}
         {state.isAuthenticated && (
          <>
            <Button type="default" onClick={() => navigate("/my-events")}>
              Mis eventos
            </Button>
            <Button type="default" onClick={() => navigate("/my-favorites")}>
              Mis Favoritos
            </Button>
            <Button type="default" onClick={processLogout}>
              Cerrar Sesión
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
