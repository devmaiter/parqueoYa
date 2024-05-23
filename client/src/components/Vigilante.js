import React from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import "./Vigilante.css";
import Axios from "axios";

export default function Vigilante({ username, handleLogout }) {
  const history = useHistory();

  const logout = () => {
    Axios.get("http://localhost:3001/logout").then((response) => {
      handleLogout(); // Call the handleLogout function passed as prop
      history.push("/Login");
    });
  };

  return (
    <div className="App">
      <div className='home__form'>
        <h1 > Bienvenido Vigilante {username}</h1>
        
        <div className='containerHome'> 
          <button className="logoutButton" onClick={logout}>
            <span className="defaultText">X</span>
            <span className="hoverText">Cerrar sesión</span>
          </button>
          <div className="container">
            <div className="card">
              <div className="image">
                <img href= "#" src = "https://cdn-icons-png.flaticon.com/512/4544/4544666.png" />
              </div>
              <div className="content">
                <button className = 'buttonHomeLogin' onClick={() => history.push('/RegVehiculo')}>REGISTRO VEHICULO</button>
              </div>
            </div>    
          </div>
          <div className="container">
            <div className="card">
              <div className="image">
                <img href= "#" src = "https://cdn-icons-png.flaticon.com/512/11199/11199911.png" />
              </div>
              <div className="content">
                <button className = 'buttonHomeLogin' onClick={() => history.push('/EntradaSalida')}>ENTRADA/SALIDA</button>
              </div>
            </div>    
          </div>
          <div className="container">
            <div className="card">
              <div className="image">
                <img href= "#" src = "https://cdn-icons-png.flaticon.com/512/2830/2830180.png" />
              </div>
              <div className="content">
                <button className = 'buttonHomeLogin' onClick={() => history.push('/Parqueadero')}>PARQUEADERO</button>
              </div>
            </div>    
          </div>
        </div>
      </div>
    </div>
  );
}