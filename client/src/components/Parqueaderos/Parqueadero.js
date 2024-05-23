import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Parquedero-styles.css'
import { useHistory } from 'react-router-dom';
import "../../App.css";
function ParkingTable() {
    const [parkingSpaces, setParkingSpaces] = useState([]);
    const routeHistory = useHistory();

    useEffect(() => {
        axios.get('http://localhost:3001/getAllNumParqueadero')
            .then(response => {
                setParkingSpaces(response.data);
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
            <div className='login'>
                <div className='login__form'>
                    <table >
                        <thead>
                            <tr>
                                <th>Num Parqueadero</th>
                                <th>Disponible</th>
                            </tr>
                        </thead>
                        <tbody>
                        {parkingSpaces.map((space, index) => (
                            <tr key={index}>
                                <td>{space.numParqueadero}</td>
                                <td style={{ color: Number(space.disponibilidad) === 1 ? 'green' : 'red' }}>
                                    {Number(space.disponibilidad) === 1 ? 'Sí' : 'No'}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <button className='buttonReverse' onClick={handleBack}> 
                <img src='	https://cdn-icons-png.flaticon.com/512/13696/13696827.png'></img>
                
                </button>
            </div>
        </div>

    );
}

export default ParkingTable;