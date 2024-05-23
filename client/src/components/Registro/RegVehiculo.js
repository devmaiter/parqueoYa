import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Registro-styles.css'
import "../../App.css";
import { useHistory } from 'react-router-dom';
export default function RegVehiculo() {
    const [cedula, setCedula] = useState('');
    const [placa, setPlaca] = useState('');
    const [tipoVehiculo, setTipoVehiculo] = useState('');
    const [vigilante_id, setVigilanteId] = useState('');
    const routeHistory = useHistory();
    useEffect(() => {
        axios.get('http://localhost:3001/userId')
        .then(function (response) {
            setVigilanteId(response.data.userId);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    const handleCedulaChange = (e) => {
        setCedula(e.target.value);
    };

    const handlePlacaChange = (e) => {
        setPlaca(e.target.value);
    };

    const handleTipoVehiculoChange = (e) => {
        setTipoVehiculo(e.target.value);
    };

    const handleBack = () => {
        routeHistory.goBack();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/regVehiculo', {
            cedulaPropietario: cedula,
            placa: placa,
            tipoVehiculo: tipoVehiculo,
            vigilante_id: vigilante_id
        })
        .then(function (response) {
            if (response.status === 200) {
                alert('Vehículo registrado con éxito');
            } else {
                console.log(response.data);
            }
        })
        .catch(function (error) {
            alert('Error al registrar el vehículo: ' + error.message);
        });
    };

    return (
        <div className='App'>
            <div className='login'>
                <form className='login__form' onSubmit={handleSubmit}>
                    <h1>Seleccione Vehiculo</h1>
                    <div className='containerRadio' onChange={handleTipoVehiculoChange}>
                        <input type="radio" value="Moto" name="vehiculo" /> Moto
                        <input type="radio" value="Carro" name="vehiculo" /> Carro
                    </div>
                    <div className="login__box"  >
                        <i className="ri-user-3-line login__icon"></i>
                        <div className="login__box-input">
                            <input className='login__input' type="text" id="placa" value={placa} onChange={handlePlacaChange} />
                            <label  htmlFor="register-username" className="login__label">Placa</label>
                        </div>
                    </div>
                    <div className="login__box"  >
                        <i className="ri-user-3-line login__icon"></i>
                        <div className="login__box-input">
                            <input className='login__input' type="text" id="placa" value={cedula} onChange={handleCedulaChange} />
                            <label  htmlFor="register-username" className="login__label">Cedula</label>
                        </div>
                    </div>
                    <button className='login__button' type="submit">Registrar</button>
                    
                </form>
            </div>
            <button className='buttonReverse' onClick={handleBack}> 
                <img src='	https://cdn-icons-png.flaticon.com/512/13696/13696827.png'></img>
            </button>
        </div>
    );
}