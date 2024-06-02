import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
import HomeComponent from "./components/Home/HomeComponent";
import Parqueadero from "./components/Parqueaderos/Parqueadero";
import EntradaSalida from "./components/Entrada-salida/EntradaSalida";
import Reporte from "./components/Reporte/Reporte";
import Report from "./components/Reporte/report";
import RegVehiculo from "./components/Registro/RegVehiculo";
import Login from "./pages/login";
import AdminComponent from "./components/Admin"; 
import VigilanteComponent from "./components/Vigilante"; 

function App() {
  const userRole = localStorage.getItem('userRole'); // Asume que el rol del usuario se almacena en el almacenamiento local

  return (
    <Router>
      <Route path="/registration" exact render={(props) => <Registration />} />
      <Route path="/Login" exact render={(props) => <Login />} />
      <Route path="/home" render={(props) => userRole === 'admin' ? <VigilanteComponent/> : <AdminComponent />} />
      <Route path="/Parqueadero" render={(props) => <Parqueadero/>} />
      <Route path="/EntradaSalida" render={(props) => <EntradaSalida/>} />
      <Route path="/Reporte" render={(props) => <Reporte/>} />
      <Route path="/RegVehiculo" render={(props) => <RegVehiculo/>} />
      <Route path="/report" render={(props) => <Report/>} />
      <Redirect from="/" to="/Login" />
    </Router>
  );
}

export default App;