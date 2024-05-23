import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import gif from '../assets/cuadro.gif';

function Reporte() {
    const [reportData, setReportData] = useState([]);
    const routeHistory = useHistory();

    useEffect(() => {
        axios.get('http://localhost:3001/vehiculos')
            .then(response => {
                setReportData(response.data);
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
                    <button className="report__button " onClick={() => routeHistory.push('/report')}>Generar Reporte
                        <img src={gif}></img>
                    </button>
                    
                    <button className='buttonReverse' onClick={handleBack}> 
                    
                    <img src='	https://cdn-icons-png.flaticon.com/512/13696/13696827.png'></img>
                    
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Reporte;