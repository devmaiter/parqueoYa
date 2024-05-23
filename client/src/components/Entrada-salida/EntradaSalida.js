import React, { useState } from 'react';
import axios from 'axios';
import './Entrada-styles.css'
import { useHistory } from 'react-router-dom';
import "../../App.css";

export default function EntradaSalida() {
    const [placaEntrada, setPlacaEntrada] = useState('');
    const [placaSalida, setPlacaSalida] = useState('');
    const [messageEntrada, setMessageEntrada] = useState('');
    const [messageSalida, setMessageSalida] = useState('');
    const routeHistory = useHistory();
    
    const handleBack = () => {
        routeHistory.goBack();
    };

    const handlePlacaChangeEntrada = (e) => {
        setPlacaEntrada(e.target.value);
    };

    const handlePlacaChangeSalida = (e) => {
        setPlacaSalida(e.target.value);
    };

    const handleSalidaSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/updateSalida', {
            placa: placaSalida
        })
        .then(function (response) {
            setMessageSalida(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const handleEntradaSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/updateEntrada', {
            placa: placaEntrada
        })
        .then(function (response) {
            setMessageEntrada(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <div className='App'>
            <div className='login'>    
                <form className='login__form' onSubmit={handleSalidaSubmit}>
                    <h1>Actualizar Salida</h1>
                    <div className="login__box"  >
                        <i className="ri-user-3-line login__icon"></i>
                        <div className="login__box-input">
                            <input className='login__input' type="text" id="placa" value={placaSalida} onChange={handlePlacaChangeSalida} />
                            <label  htmlFor="register-username" className="login__label">Placa</label>
                        </div>
                    </div>
                    <button className='login__button' type="submit">Guardar</button>
                </form>
                <form className='login__form' onSubmit={handleEntradaSubmit}>
                    <h1>Actualizar Entrada</h1>
                    <div className="login__box"  >
                        <i className="ri-user-3-line login__icon"></i>
                        <div className="login__box-input">
                            <input className='login__input' type="text" id="placa" value={placaEntrada} onChange={handlePlacaChangeEntrada} />
                            <label  htmlFor="register-username" className="login__label">Placa</label>
                        </div>
                    </div>
                    <button className='login__button' type="submit">Guardar</button>
                </form>
                {messageSalida && <p>{messageSalida}</p>}
                {messageEntrada && <p>{messageEntrada}</p>}
                <button className='buttonReverse' onClick={handleBack}> 
                    <img src='https://cdn-icons-png.flaticon.com/512/13696/13696827.png'></img>
                </button>
            </div>
        </div>
    );
}