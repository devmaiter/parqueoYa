import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Home-styles.css'

function HomeComponent() {
    const [username, setUsername] = useState(''); // Estado para el nombre de usuario
    const [role, setRole] = useState(''); // Estado para el rol del usuario
    const history = useHistory();

    useEffect(() => {
        // Hacer una solicitud al endpoint '/home' para obtener la información de la sesión
        axios.get('http://localhost:3000/home', { withCredentials: true })
            .then(response => {
                const { username, role, message } = response.data;
                if (username) {
                    setUsername(username);
                    setRole(role);
                } else {
                    console.error('Error: ', message);
                }
            })
            .catch(error => {
                console.error('Hubo un error al obtener la información de la sesión:', error);
            });
    }, []);

    const handleLogout = () => {
        // Llamar al endpoint para cerrar la sesión
        fetch('http://localhost:3000/logout', {
            method: 'POST',
            // Aquí puedes agregar cualquier configuración adicional necesaria, como encabezados o datos de autenticación
        })
        .then(response => {
            // Redirigir al componente de login después de cerrar la sesión
            history.push('/login');
        })
        .catch(error => {
            // Manejar el error en caso de que ocurra
            console.error('Error al cerrar sesión:', error);
        });
    };

    return (
        <>
            <div className='containerHome'>
                <h1> Bienvenido {username}</h1> 
                <h2> Rol: {role}</h2> 
                <button className = 'buttonHomeLogin'onClick={handleLogout}>Logout</button>
                <button className = 'buttonHomeLogin'onClick={() => history.push('/RegVehiculo')}>REGISTRO VEHICULO</button>
                <button className = 'buttonHomeLogin'onClick={() => history.push('/Parqueadero')}>PARQUEADERO</button>
                <button className = 'buttonHomeLogin'onClick={() => history.push('/EntradaSalida')}>ENTRADA/SALIDA</button>
                <button className = 'buttonHomeLogin'onClick={() => history.push('/Reporte')}>REPORTE</button>
            </div>        
        </>
    );
}

export default HomeComponent;