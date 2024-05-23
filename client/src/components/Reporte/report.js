import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Report() {
    const [reportData, setReportData] = useState([]);
    const routeHistory = useHistory();

    useEffect(() => {
        axios.get('http://localhost:3001/vehiculos')
            .then(response => {
                const formattedData = response.data.map(item => ({
                    ...item,
                    entrada: new Date(item.entrada).toLocaleString(),
                    salida: item.salida ? new Date(item.salida).toLocaleString() : null,
                }));
                setReportData(formattedData);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleBack = () => {
        routeHistory.goBack();
    };

    return (
        <div className='App'>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vigilante ID</th>
                        <th>Tipo de Vehiculo</th>
                        <th>Placa</th>
                        <th>Cedula del Propietario</th>
                        <th>Entrada</th>
                        <th>Salida</th>
                        <th>Numero de Parqueadero</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.vigilante_id}</td>
                            <td>{item.tipoVehiculo}</td>
                            <td>{item.placa}</td>
                            <td>{item.cedulaPropietario}</td>
                            <td>{item.entrada}</td>
                            <td>{item.salida}</td>
                            <td>{item.numParqueadero}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='buttonReverse' onClick={handleBack}> 
                <img src='https://cdn-icons-png.flaticon.com/512/13696/13696827.png'></img>
            </button>
        </div>
    );
}

export default Report;