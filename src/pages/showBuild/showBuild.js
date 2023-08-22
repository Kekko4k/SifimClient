import React, { useState, useEffect, useRef } from 'react'
import "./showBuild.css"
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Error from "../../images/Error/Error.png";
import Maps from "../../components/maps/maps"


function ShowBuild() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [image, setImages] = useState([]);
    const contImage = useRef(0)
    const [fullDesc, setfullDesc] = useState(false)
    const location = useLocation();
    const url = location.state ? location.state.url : "http://localhost:3000/cerca?tipologia=case&page=1";
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getHouse = async () => {
            try {
                await fetch(apiUrl+`/inserBuild/immobile/?id=` + id)
                    .then((response) => response.json())
                    .then((actualData) => {
                        setData(actualData);
                        if (actualData.images.length > 0) {
                            setImages(actualData.images);
                        }
                        else {
                            setImages([apiUrl+"/site/search/No_immage.png"]);
                        }
                        setIsLoading(!isLoading);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }

        }

        getHouse();
    }, [id])

    function changeImageNext(e) {
        e.stopPropagation();
        if (contImage.current < image.length - 1) {
            contImage.current += 1;
        } else {
            contImage.current = 0;
        }

        const element = document.getElementById("imgBuild");
        element.src = image[contImage.current];
    }

    function changeImagePre(e) {
        e.stopPropagation();
        if (contImage.current > 0) {
            contImage.current -= 1;
        } else {
            contImage.current = image.length - 1;
        }

        const element = document.getElementById("imgBuild");
        element.src = image[contImage.current];
    }

    function readDescrizione() {
        setfullDesc(!fullDesc);
    }


    return (
        <div>
            {isLoading ?
                <div className='layoutBuild'>
                    <div className='pageBuild loadingBuild'>
                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                </div> :
                error ? (
                    <div className='layoutBuild loadingBuild'>
                        <div className='pageBuild'>
                            <img src={Error} />
                        </div>
                    </div>
                ) :
                    <div className='layoutBuild'>
                        <div className='pageBuild'>
                            <div>
                                <a href={url} rel="noopener noreferrer" className='goBack' > Torna alla ricerca</a>
                            </div>
                            <div className='imageBuild'>
                                <img id="imgBuild" src={image[contImage.current]}></img>
                                {image[0] != apiUrl+"/site/search/No_immage.png" &&
                                    <React.Fragment>
                                        <button className='arrow left' onClick={(e) => changeImagePre(e)}>{'<'}</button>
                                        <button className='arrow right' onClick={(e) => changeImageNext(e)}>{'>'}</button>
                                    </React.Fragment>
                                }

                            </div>
                            <div className='descBuild'>
                                <h2><b>{data.titolo}</b></h2>
                                <span>{data.indirizzo}, {data.comune}, {data.provincia} </span>
                                <span className='prezzoBuild'>{data.prezzo.toLocaleString('it-IT')}€</span>
                                <div className='info_build'>
                                    <div className='single_info'><div >{data.stanze}</div><div>locali</div></div>
                                    <div className='single_info'><div >{data.superficie} m2</div><div>superficie</div></div>
                                </div>
                                <span>{!fullDesc ? data.descrizione.slice(0, 320) + "..." : data.descrizione}</span>
                                {data.descrizione > 320 && <div className='leggi_desc' onClick={() => readDescrizione()}>Leggi Tutto</div>}
                                <span></span>
                                <span></span>
                            </div>
                            <Maps/>
                        </div>
                        
                    </div>
            }
        </div>
    );
}

export default ShowBuild;