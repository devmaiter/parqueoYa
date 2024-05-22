import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Parquedero-styles.css'

function ParkingTable() {
    const [parkingSpaces, setParkingSpaces] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/getAllNumParqueadero')
            .then(response => {
                setParkingSpaces(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div className='container'>
            <table>
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
                            <td>{Number(space.disponibilidad) === 1 ? 'Sí' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default ParkingTable;