import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage'; 
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage';
import EventForm from '../EventForm/EventForm';
import LoginForm from '../LoginForm/LoginForm'; 
import RegisterForm from '../RegisterForm/RegisterForm'; 


const App = () => {
  const [loginValidated, setLoginValidated] = useState(false);
  // const navigate = useNavigate();
  useEffect(() => {
    if (loginValidated) {
        console.log("Usuario ha iniciado sesión");
    }
}, [loginValidated]); // Se ejecuta cuando loginValidated cambia.

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setLoginValidated={setLoginValidated}/>} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/login" element={<LoginForm setLoginValidated={setLoginValidated}/>} /> {/* Ruta para el formulario de login */}
        <Route path="/register" element={<RegisterForm />} /> {/* Ruta para el formulario de registro */}
      </Routes>
      {/* {loginValidated && (
                <p>Aquí se cargarán los componentes a visualizarse al hacer inicio de sesión.</p>
            )} */}
    </Router>
    </>
  );
};

export default App;
