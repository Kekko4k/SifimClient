import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Search from '../../components/search/search';
import Cards from '../../components/cards/cards'
import "./home.css"

function Home() {

    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        'http://localhost:5000/site/home/home_1.png',
        'http://localhost:5000/site/home/home_2.png',
        'http://localhost:5000/site/home/home_3.png'
    ];




    useEffect(() => {
        // Funzione asincrona per effettuare la chiamata GET
        const fetchData = async () => {
            try {
                const response = await axios.get('https://apisifim.onrender.com/users');
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // Chiamata alla funzione per effettuare la richiesta API al caricamento del componente
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 9000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    const onNavigate = () => {
        navigate('/cerca?tipologia=case&page=1')
    }

    return (
        <div className='home'>
            <div className='background_search' style={{ backgroundImage: `url(${images[currentIndex]})`, transitionDelay: '0.7s' }}>
                <div className='button_home' onClick={onNavigate}>
                    Guarda gli ultimi annunci
                </div>
            </div>
            <div className='title_cards'>
                <p>ULTIME AGGIUNTE</p>
            </div>
            <Cards/>
        </div>
    );

};

export default Home