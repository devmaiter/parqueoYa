import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
import HomeComponent from "./components/Home/HomeComponent";
import Parqueadero from "./components/Parqueaderos/Parqueadero";
import EntradaSalida from "./components/Entrada-salida/EntradaSalida";
import Reporte from "./components/Reporte/Reporte";
import RegVehiculo from "./components/Registro/RegVehiculo";

function App() {
  return (
    <Router>
      <Route path="/registration" exact render={(props) => <Registration />} />
      <Route path="/" exact render={(props) => <Main />} />
      <Route path="/home" render={(props) => <HomeComponent/>} />
      <Route path="/Parqueadero" render={(props) => <Parqueadero/>} />
      <Route path="/EntradaSalida" render={(props) => <EntradaSalida/>} />
      <Route path="/Reporte" render={(props) => <Reporte/>} />
      <Route path="/RegVehiculo" render={(props) => <RegVehiculo/>} />
    </Router>
  );
}

export default App;