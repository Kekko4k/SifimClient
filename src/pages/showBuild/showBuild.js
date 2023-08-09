import React, { useState, useEffect, useRef } from 'react'
import "./showBuild.css"
import { useParams } from 'react-router-dom';


function ShowBuild() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [image, setImages] = useState([]);
    const contImage = useRef(0)
    const [fullDesc, setfullDesc]= useState(false)


    useEffect(() => {
        const getHouse = async () => {
            try {
                await fetch(`http://localhost:5000/inserBuild/immobile/?id=` + id)
                    .then((response) => response.json())
                    .then((actualData) => {
                        setData(actualData);
                        setImages(actualData.images)
                        setIsLoading(!isLoading);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            } catch (err) {
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

    function readDescrizione(){
        setfullDesc(!fullDesc);
    }

    return (
        <div>
            {isLoading ? <div>sto caricando</div> :
                <div className='layoutBuild'>
                    <div className='pageBuild'>
                        <div className='imageBuild'>
                            <img id="imgBuild" src={image[contImage.current]}></img>
                            <button className='arrow left' onClick={(e) => changeImagePre(e)}>{'<'}</button>
                            <button className='arrow right' onClick={(e) => changeImageNext(e)}>{'>'}</button>
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
                            {data.descrizione>320 && <div className='leggi_desc' onClick={()=>readDescrizione()}>Leggi Tutto</div>}
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ShowBuild;