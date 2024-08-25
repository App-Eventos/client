import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import "./LoginForm.css";
import axios from "axios";
import { message } from "antd";

const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
  const { state, setState } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgottenPassword, setForgottenPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  // const navigate = useNavigate(); // Hook para navegar a otra ruta

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
      localStorage.setItem("user", JSON.stringify(response.data.userFound));
      localStorage.setItem("isAuthenticated", "true");

      // setError(error.response.data.message)
      setState({
        ...state,
        user: response.data.userFound,
        isAuthenticated: true,
      });

      setError("");
      setEmail("");
      setPassword("");

      message.success("Inicio de sesión exitoso"); // Mostrar el mensaje de éxito

      onLoginSuccess(); // Notificar el éxito del inicio de sesión
      // navigate("/");
    } catch (error) {
      // setError(error.response.data.message);
      setError("Error al iniciar sesión");
      message.error("Error al iniciar sesión"); // Mostrar el mensaje de error
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
          <a href="#" onClick={onSwitchToRegister}>
            Registrarse aqui
          </a>
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
