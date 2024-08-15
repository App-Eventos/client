import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import './RegisterForm.css';

const RegisterForm = () => {
  return (
    <form className="form">
      <p className="title">¡Regístrate!</p>
      <p className="message">Regístrate ahora y obtén acceso completo a nuestra aplicación.</p>
      <div className="flex">
        <label>
          <input className="input" type="text" placeholder="" required />
          <span>Name</span>
        </label>
        <label>
          <input className="input" type="text" placeholder="" required />
          <span>Lastname</span>
        </label>
      </div>
      <label>
        <input className="input" type="email" placeholder="" required />
        <span>Email</span>
      </label>
      <label>
        <input className="input" type="password" placeholder="" required />
        <span>Password</span>
      </label>
      <label>
        <input className="input" type="password" placeholder="" required />
        <span>Confirm password</span>
      </label>
      <button className="submit">Submit</button>
      <p className="signin">¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p> {/* Aquí se usa Link para redirigir */}
    </form>
  );
};

export default RegisterForm;
