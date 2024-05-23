import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/login/LoginComponent';
import HomeComponent from './components/Home/HomeComponent';
import Parqueadero from './components/Parqueaderos/Parqueadero';
import RegVehiculo from './components/Registro/RegVehiculo';  
import EntradaSalida from './components/Entrada-salida/EntradaSalida';
import Reporte from './components/Reporte/Reporte';
import HomeLogin from './components/login/homelogin';
import Report from './Reporte/report';
import UserRegister from './components/login/registerComponent'
import { RoleProvider } from './components/role';
import './App.css'; // Import your CSS file here

function App() {
  return (
    <RoleProvider> {/* Envuelve todos tus componentes con el RoleProvider */}
      <>
        <Router>
            <Routes>
                <Route path="/login" element={<LoginComponent/>} />
                <Route path="/home" element={<HomeComponent/>} />
                <Route path="/Parqueadero" element={<Parqueadero/>} />
                <Route path="/EntradaSalida" element={<EntradaSalida/>} />
                <Route path="/Reporte" element={<Reporte/>} />
                <Route path="/RegVehiculo" element={<RegVehiculo/>} />
                <Route path="/homeLogin" element={<HomeLogin/>} />
                <Route path="/register" element={<UserRegister/>} />
                <Route path="/report" element={<Report/>} />
            </Routes>
        </Router>
      </>
    </RoleProvider>
  );
}

export default App;