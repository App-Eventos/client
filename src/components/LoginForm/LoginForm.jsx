import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from 'axios';

const LoginForm = ({setLoginValidated}) => {
  console.log({setLoginValidated});
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate(); // Hook para navegar a otra ruta

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:8080/user/login";
    const setting ={
      email, password
    }
    try {
      const response = await axios.post(URL, setting);
            localStorage.setItem("token", response.data.token);
            // setError(error.response.data.message)
            setLoginValidated(true);
            setError("");
            setEmail("");
            setPassword("");
            navigate("/");
      
    } catch (error) {
      // setError(error.response.data.message);
      setError("Error al iniciar sesión")
      console.log(error)
      
    }

    
  };

  // const handleForgotPasswordSubmit = (e) => {
  //   e.preventDefault();
  //   // Aquí iría la lógica para la recuperación de contraseña
  //   console.log('Recuperar contraseña para:', email);
  //   alert('Se ha enviado un correo para recuperar tu contraseña.');
  //   setIsForgotPassword(false);  // Regresar al formulario de inicio de sesión
  // };

  return (
    <form className="login-form" onSubmit={ handleLoginSubmit}>
      <div className="form-header">
        {/* <h2>{isForgotPassword ? 'Recuperar Contraseña' : 'Bienvenido de nuevo a la App'}</h2> */}
        {/* <p>{isForgotPassword ? 'Ingrese su correo para recuperar su contraseña' : 'Inicie sesión en su cuenta'}</p> */}
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
      

      {/* {!isForgotPassword && (
        <div className="form-group text-right">
          <a href="#" onClick={() => setIsForgotPassword(true)}>¿Olvidaste tu contraseña?</a>
        </div>
      )} */}

      <div className="form-group">
        <button type="submit">{isForgotPassword ? 'Enviar' : 'Iniciar sesión'}</button>
      </div>

      {!isForgotPassword && (
        <div className="text-center mt">
          ¿Aún no tienes una cuenta? <Link to="/register">Regístrate gratis!</Link>
        </div>
      )}
      <div>{error}</div>
    </form>
  );
};

export default LoginForm;


