import React, { useState } from 'react';
import axios from 'axios';
import './Registro-styles.css'
import { useHistory } from 'react-router-dom';

export default function RegVehiculo() {
    const [cedula, setCedula] = useState('');
    const [placa, setPlaca] = useState('');
    const [tipoVehiculo, setTipoVehiculo] = useState('');
    const [vigilante_id, setVigilanteId] = useState('');

    const handleCedulaChange = (e) => {
        setCedula(e.target.value);
    };

    const handlePlacaChange = (e) => {
        setPlaca(e.target.value);
    };

    const handleTipoVehiculoChange = (e) => {
        setTipoVehiculo(e.target.value);
    };

    const handleVigilanteIdChange = (e) => {
        setVigilanteId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/regVehiculo', {
            cedulaPropietario: cedula,
            placa: placa,
            tipoVehiculo: tipoVehiculo,
            vigilante_id: vigilante_id
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <form className='containerRegister' onSubmit={handleSubmit}>
            <h1>Seleccione Vehiculo</h1>
            <div onChange={handleTipoVehiculoChange}>
                <input type="radio" value="Moto" name="vehiculo" /> Moto
                <input type="radio" value="Carro" name="vehiculo" /> Carro
            </div>
            <div className='containerForm'>
                <label htmlFor="placa">Placa:</label>
                <input type="text" id="placa" value={placa} onChange={handlePlacaChange} />
            </div>
            <div  className='containerForm' >
                <label htmlFor="cedula">Cedula:</label>
                <input type="text" id="cedula" value={cedula} onChange={handleCedulaChange} />
            </div>
            <div  className='containerForm' >
                <label htmlFor="vigilante_id">Vigilante ID:</label>
                <input type="text" id="vigilante_id" value={vigilante_id} onChange={handleVigilanteIdChange} />
            </div>
            <button type="submit">Registrar</button>
            
        </form>
    );
}