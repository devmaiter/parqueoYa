import React, { useState } from 'react';
import axios from 'axios';
import './Entrada-styles.css'

export default function EntradaSalida() {
    const [placa, setPlaca] = useState('');
    const [message, setMessage] = useState('');

    const handlePlacaChange = (e) => {
        setPlaca(e.target.value);
    };

    const handleSalidaSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/updateSalida', {
            placa: placa
        })
        .then(function (response) {
            setMessage(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const handleEntradaSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/updateEntrada', {
            placa: placa
        })
        .then(function (response) {
            setMessage(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <div>
            <form className='containerRegister' onSubmit={handleSalidaSubmit}>
                <h1>Actualizar Salida</h1>
                <div className='containerForm'>
                    <label htmlFor="placa">Placa:</label>
                    <input type="text" id="placa" value={placa} onChange={handlePlacaChange} />
                </div>
                <button type="submit">Guardar</button>
            </form>
            <form className='containerRegister' onSubmit={handleEntradaSubmit}>
                <h1>Actualizar Entrada</h1>
                <div className='containerForm'>
                    <label htmlFor="placa">Placa:</label>
                    <input type="text" id="placa" value={placa} onChange={handlePlacaChange} />
                </div>
                <button type="submit">Guardar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}