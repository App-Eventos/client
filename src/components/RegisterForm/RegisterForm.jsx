import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa Link desde react-router-dom
import "./RegisterForm.css";
import { useState } from "react";
import axios from "axios";

const RegisterForm = ({onSwitchToLogin}) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const sendRegisterForm = async (e) => {
    e.preventDefault();

    // Validar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setError("*Las contraseñas no coinciden*");
      return; // No enviar el formulario si las contraseñas no coinciden
    }
    try {
      const newUser = {
        name,
        lastName,
        email,
        password,
      };
      const URL = "http://localhost:8080/user/new";
      const response = await axios.post(URL, newUser);

      // localStorage.setItem("token", response.data.token)
      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setError("");
      setConfirmPassword("");
      // this.props.setValidatedLogin(true);
      navigate("/login");
    } catch (error) {
      console.log("Something went wrong", error);
      // setError(error.response.statusText);
      // props.setValidatedLogin(false)
      // navegate("/login");
    }
  };

  return (
    <>
      <form onSubmit={sendRegisterForm} className="form">
        <p className="title">¡Regístrate!</p>
        <p className="message">
          Regístrate ahora y obtén acceso completo a nuestra aplicación.
        </p>
        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              required
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span>Name</span>
          </label>
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              required
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <span>Lastname</span>
          </label>
        </div>
        <label>
          <input
            className="input"
            type="email"
            placeholder=""
            required
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Email</span>
        </label>
        <label>
          <input
            className="input"
            type="password"
            placeholder=""
            required
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </label>
        <label>
          <input
            className="input"
            type="password"
            placeholder=""
            required
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span>Confirm password</span>
        </label>
        <button className="submit">Submit</button>
        <p className="signin">
          ¿Ya tienes una cuenta? <a href="#" onClick={onSwitchToLogin}>
          Iniciar Sesión
        </a>
        </p>{" "}
        {/* Aquí se usa Link para redirigir */}
        <div className="Errormessage">{error}</div>
      </form>
    </>
  );
};

export default RegisterForm;
