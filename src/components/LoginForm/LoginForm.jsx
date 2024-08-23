import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";

const LoginForm = ({setLoginValidated }) => {
  console.log(setLoginValidated);
  const [forgottenPassword, setForgottenPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  const navigate = useNavigate(); // Hook para navegar a otra ruta

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:8080/user/login";
    const setting = {
      email,
      password,
    };
    try {
      const response = await axios.post(URL, setting);
      localStorage.setItem("token", response.data.token);
      // setError(error.response.data.message);
      setLoginValidated(true);
      setError("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      // setError(error.response.data.message);
      setError("Error al iniciar sesión");
      console.log(error);
    }
  };

  const handleForgottenPasswordSubmit = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:8080/user/forgot-password"; // Asegúrate de que esta URL sea la correcta para la recuperación de contraseña
    try {
      await axios.post(URL, { email });
      setSuccessMessage(
        "Se ha enviado un correo para recuperar tu contraseña."
      ); // Mensaje de éxito
      setError("");
      setEmail("");
      setForgottenPassword(false); // Regresar al formulario de inicio de sesión
    } catch (error) {
      setError("Error al enviar el correo de recuperación");
      console.log(error);
    }
  };

  return (
    <form
      className="login-form"
      onSubmit={
        forgottenPassword ? handleForgottenPasswordSubmit : handleLoginSubmit
      }
    >
      <div className="form-header">
        {
          <h2>
            {forgottenPassword
              ? "Recuperar Contraseña"
              : "Bienvenido de nuevo a la App"}
          </h2>
        }
        {
          <p>
            {forgottenPassword
              ? "Ingrese su correo para recuperar su contraseña"
              : "Inicie sesión en su cuenta"}
          </p>
        }
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {!forgottenPassword && (
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      )}
      {!forgottenPassword && (
        <div className="form-group text-right">
          <a href="#" onClick={() => setForgottenPassword(true)}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      )}
      <div className="form-group">
        <button type="submit">
          {forgottenPassword ? "Enviar" : "Iniciar sesión"}
        </button>
      </div>
      {!forgottenPassword && (
        <div className="text-center mt">
          ¿Aún no tienes una cuenta?{" "}
          <Link to="/register">Regístrate gratis!</Link>
        </div>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}{" "}
      {/* Mensaje de éxito */}
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Mensaje de error */}
    </form>
  );
};

export default LoginForm;
