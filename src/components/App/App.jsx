import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage'; 
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage';
import EventForm from '../EventForm/EventForm';
import LoginForm from '../LoginForm/LoginForm'; 
import RegisterForm from '../RegisterForm/RegisterForm'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/login" element={<LoginForm />} /> {/* Ruta para el formulario de login */}
        <Route path="/register" element={<RegisterForm />} /> {/* Ruta para el formulario de registro */}
      </Routes>
    </Router>
  );
};

export default App;
