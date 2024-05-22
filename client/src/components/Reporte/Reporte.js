import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reporte() {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/vehiculos')
            .then(response => {
                setReportData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div>
            <button>Generar Reporte</button>
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
        </div>
    );
}

export default Reporte;