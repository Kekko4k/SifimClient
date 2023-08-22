import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Pagination from "../../components/pagination/pagination"
import ShowBuilding from '../../components/showBuildings/showBuilding'
import Filter from '../../components/filter/filter'
import { useAuth } from '../../components/AuthContext'
import { useNavigate } from "react-router-dom";
import "./listaPreferiti.css"


function Cerca() {
    const queryParameters = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const [postsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [list, setList] = useState([])
    const [favorites, setFavorites] = useState([])
    const Linkurl = useRef()
    const auth = useAuth();
    const apiUrl = process.env.REACT_APP_API_URL;

    let local = [];
    if (queryParameters.get("locali")) {
        local = queryParameters.get("locali").split(",");
    }
    const [filterLocali, setFilterLocali] = useState(local);

    let tipologi = "";
    if (queryParameters.get("tipologia")) {
        tipologi = queryParameters.get("tipologia");
    }
    const [tipologia, setTipologia] = useState(tipologi);

    let bagni = []
    if (queryParameters.get("bagni")) {
        bagni = queryParameters.get("bagni").split(",")
    }
    const [filterBagni, setFilterBagni] = useState(bagni);


    let PrezzMin = 0;
    if (queryParameters.get("prezzoMin")) {
        PrezzMin = queryParameters.get("prezzoMin");
    }
    const [PrezzoMin, setPrezzoMin] = useState(PrezzMin);

    let PrezzMax = -1;
    if (queryParameters.get("prezzoMax")) {
        PrezzMax = queryParameters.get("prezzoMax");
    }
    const [PrezzoMax, setPrezzoMax] = useState(PrezzMax);

    let superfMin = 0;
    if (queryParameters.get("superficieMin")) {
        superfMin = queryParameters.get("superficieMin");
    }
    const [superficieMin, setSuperficieMin] = useState(superfMin);

    let superfMax = -1;
    if (queryParameters.get("superficieMax")) {
        superfMax = queryParameters.get("superficieMax");
    }
    const [superficieMax, setSuperficieMax] = useState(superfMax);





    useEffect(() => {
        // fetchData();
        const getAllHouse = async () => {
            console.log(auth.user)
            if (auth.user) {
                let url = ""
                url += `?id=${auth.user}`
                if (tipologia.length > 1) {
                    url += `&tipologia=${tipologia}`
                }
                if (PrezzoMin > 0) {
                    url += `&prezzoMin=${PrezzoMin}`
                }
                if (PrezzoMax > 0) {
                    url += `&prezzoMax=${PrezzoMax}`
                }
                if (superficieMin > 0) {
                    url += `&superficieMin=${superficieMin}`
                }
                if (superficieMax > 0) {
                    url += `&superficieMax=${superficieMax}`
                }
                if (filterLocali.length > 0) {
                    url += `&locali=${filterLocali.toString()}`
                }
                if (filterBagni.length > 0) {
                    url += `&bagni=${filterBagni.toString()}`
                }
                navigate({ pathname: '/preferiti', search: url });
                Linkurl.current = url

                try {
                    fetch(apiUrl+`/inserBuild/preferiti` + url)
                        .then((response) => response.json())
                        .then((actualData) => {
                            
                            setList(actualData);
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                } catch (err) {
                }
            }
        }

        const getFavorite = async () => {
            if (auth.user) {
                try {
                    fetch(apiUrl+`/inserBuild/cercaFavoriti?id=${auth.user}`)
                        .then((response) => response.json())
                        .then((actualData) => {

                            setFavorites(actualData.idBuilds)
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                } catch (err) {
                }
            }
        }

        getAllHouse();
        getFavorite();
    }, [filterLocali, tipologia, filterBagni, PrezzoMin, PrezzoMax, superficieMin, superficieMax, Linkurl, auth.user]);



    //prendere la pagina corrente
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);

    //cambio pagina
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className='cerca_build'>
            <div>
                <ShowBuilding posts={currentPosts} favorites={favorites} setFavorites={setFavorites} />
                <Pagination postsPerPage={postsPerPage} totalPosts={list.length} paginate={paginate} />
            </div>
        </div>
    )


}

export default Cerca