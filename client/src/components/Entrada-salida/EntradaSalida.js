import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Entrada-styles.css'
import { useHistory } from 'react-router-dom';
import "../../App.css";

export default function EntradaSalida() {
    const [placaEntrada, setPlacaEntrada] = useState(localStorage.getItem('placaEntrada') || '');
    const routeHistory = useHistory();
    const [numParqueadero, setNumParqueadero] = useState(localStorage.getItem('numParqueadero') || '');
    const [parqueaderos, setParqueaderos] = useState([]);

    useEffect(() => {
        fetchParqueaderos();
    }, []);

    const fetchParqueaderos = () => {
        axios.get('http://localhost:3001/getAvailableParkings')
        .then(function (response) {
            setParqueaderos(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const handleBack = () => {
        routeHistory.goBack();
    };

    const handlePlacaChangeEntrada = (e) => {
        setPlacaEntrada(e.target.value);
    };

    const handleSalidaSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/Salida', {
            placa: placaEntrada,
            numParqueadero: numParqueadero        
        })
        .then(function (response) {
            if (response.data.message) {
                alert(response.data.message); // Aquí se muestra la alerta
            } else {
                alert('exito al actualizar la salida ');
            }
        })
        .catch(function (error) {
            alert('Error al actualizar la salida porque la placa es incorrecta');
        });
    };

    const handleEntradaSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:3001/updateEntrada', {
            placa: placaEntrada,
            numParqueadero: numParqueadero
        })
        .then(function (response) {
            alert(response.data.message); // Aquí se muestra la alerta
            localStorage.setItem('placaEntrada', placaEntrada);
            localStorage.setItem('numParqueadero', numParqueadero);
            setPlacaEntrada(placaEntrada);
            setNumParqueadero(numParqueadero);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    const handleParqueaderoChange = (e) => {
        setNumParqueadero(e.target.value);
    };
    return (
        <div className='App'>
            <div className='login'>    
                <form className='login__form' onSubmit={handleEntradaSubmit}>
                    <h1>Actualizar Entrada</h1>
                    <div className="login__box"  >
                        <i className="ri-user-3-line login__icon"></i>
                        <div className="login__box-input">
                            <input className='login__input' type="text" id="placa" value={placaEntrada} onChange={handlePlacaChangeEntrada} />
                            <label  htmlFor="register-username" className="login__label">Placa</label>
                        </div>
                    </div>
                    <div className="login__box"  >
                        <select onChange={handleParqueaderoChange}>
                            <option value="">Selecciona un parqueadero</option>
                            {parqueaderos.map((parqueadero) => (
                                <option key={parqueadero.numParqueadero} value={parqueadero.numParqueadero}>
                                    {parqueadero.numParqueadero}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className='login__button' type="submit">Guardar</button>
                </form>
                <form className='login__form' onSubmit={handleSalidaSubmit}>
                    <h1>Actualizar Salida</h1>
                    <button className='login__button' type="submit">Guardar</button>
                </form>
                <button className='buttonReverse' onClick={handleBack}> 
                    <img src='https://cdn-icons-png.flaticon.com/512/13696/13696827.png'></img>
                </button>
            </div>
        </div>
    );
}