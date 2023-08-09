import React, { useEffect, useState } from 'react'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import axios from 'axios';
import "./cards.css"


function Cards() {

    const [card, setCard] = useState([])
    const [images, setImages] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/inserBuild/last_build');
                console.log(response)
                setCard(response.data);
    
                if (response.data.length > 0) {
                    const ids = response.data.map(item => item._id); // Estrai solo gli ID degli elementi
                    try {
                        const imagesResponse = await axios.get('http://localhost:5000/inserBuild/files', {
                            params: {
                                ids: ids.join(",") // Passa gli ID degli annunci separati da virgola
                            }
                        });
    
                        setImages(imagesResponse.data);
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);
    
    
  
    return (
        <div className='last_cards'>
            {images.length>0 && card.map((build, index) =>(
                <div className='card' style={{ backgroundImage: `url(${images[index].images[0]})`}}>
                    <div className='info_card'>
                        <div className='info_card_desc'>
                            <div className='info_card_comune'>{build.comune}</div>
                            <div className='info_card_prezzo'>{build.prezzo.toLocaleString('it-IT')}€</div>
                            <div className='info_card_comune'>{build.tipologia}</div>
                        </div>
                    </div>
                </div>
             ))}
        </div>
    )
}

export default Cards    