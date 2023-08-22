import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Search from '../../components/search/search';
import Cards from '../../components/cards/cards'
import Desc_home from '../../components/desc_home/Desc_home'
import Footer from '../../components/footer/footer';
import "./home.css"

function Home() {

    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;

    const images = [
        apiUrl + '/site/home/home_1.png',
        apiUrl + '/site/home/home_2.png',
        apiUrl + '/site/home/home_3.png'
    ];




    useEffect(() => {
        // Funzione asincrona per effettuare la chiamata GET
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl+'/users');
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


    return (
        <div className='home'>
            <div className='background_search' style={{ backgroundImage: `url(${images[currentIndex]})`, transitionDelay: '0.7s' }}>
                <div><div><span>Trovare casa non è mai stato così <br/><b>Facile</b></span></div>
                <div className='button_home' >
                    <a href="/cerca?tipologia=case&page=1">
                        Guarda tutti gli annunci
                    </a>
                </div>
                </div>
                <div class="custom-shape-divider-bottom-1692198307">
            </div>
            </div>
            <Desc_home />
            <div className='title_cards'>
                <p>ULTIME AGGIUNTE</p>
            </div>
            <Cards />
        </div>
    );

};

export default Home

/*


            */