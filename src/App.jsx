import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AppProvider from "./context/AppProvider";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { PublicRoutes } from "./routes/PublicRoutes";
import HomePage from "./pages/HomePage/HomePage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import EventForm from "./components/EventForm/EventForm";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import EventDetail from "./components/EventDetail/EventDetail";
import MyEvents from "./pages/MyEventsPage/MyEvents";
import EditForm from "./components/EditForm/EditForm"

const App = () => {

  return (
    <>
      <AppProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route path="/my-favorites" element={<FavoritesPage />} />
            <Route
              path="/create-event"
              element={
                <PrivateRoutes>
                  <EventForm />
                </PrivateRoutes>
              }
            />
            <Route
              path="/edit-event/:id"
              element={
                <PrivateRoutes>
                  <EditForm />
                </PrivateRoutes>
              }
            />
            <Route
              path="/my-events"
              element={
                <PrivateRoutes>
                  <MyEvents />
                </PrivateRoutes>
              } // Ruta Mis eventos
            />
            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <LoginForm />
                </PublicRoutes>
              }
            />{" "}
            {/* Ruta para el formulario de login */}
            <Route
              path="/register"
              element={
                <PublicRoutes>
                  <RegisterForm onSwitchToLogin={() => navigate("/login")} />
                </PublicRoutes>
              }
            />{" "}
            {/* Ruta para el formulario de registro */}
            <Route path="/event/:eventId" element={<EventDetail />} />

          </Routes>
        </Router>
      </AppProvider>
    </>
  );
};

export default App;
