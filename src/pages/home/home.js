import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        // Funzione asincrona per effettuare la chiamata GET
        const fetchData = async () => {
            try {
                const response = await axios.get('.netlify/functions/api/data');
                console.log(response)
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // Chiamata alla funzione per effettuare la richiesta API al caricamento del componente
    }, []);

    return (
        <div>
            <h1>My Data:</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item}</li>
                ))}
            </ul>
        </div>
    );

};

export default Home