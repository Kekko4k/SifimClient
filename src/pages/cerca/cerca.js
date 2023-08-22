import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Pagination from "../../components/pagination/pagination"
import ShowBuilding from '../../components/showBuildings/showBuilding'
import Filter from '../../components/filter/filter'
import { useAuth } from '../../components/AuthContext'
import { useNavigate } from "react-router-dom";
import "./cerca.css"


function Cerca() {
    const queryParameters = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const [postsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(queryParameters.get("page"));
    const [list, setList] = useState([])
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(false)
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
            let url = ""
            if (tipologia.length > 1) {
                url += `?tipologia=${tipologia}`
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
            if (currentPage > 0) {
                url += `&page=${currentPage}`
            }
            navigate({ pathname: '/cerca', search: url });
            Linkurl.current = url;
            try {
                fetch(apiUrl+`/inserBuild/cerca` + url)
                    .then((response) => response.json())
                    .then((actualData) => {
                        setList(actualData);
                        setLoading(true)
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            } catch (err) {
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
    }, [filterLocali, tipologia, filterBagni, PrezzoMin, PrezzoMax, superficieMin, superficieMax, Linkurl, currentPage]);



    //prendere la pagina corrente
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);

    //cambio pagina
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function onFilterTipologia(filter) {
        setTipologia(filter)
    }

    function onFilterlocali(filter) {
        if (filterLocali.indexOf(filter) === -1) {
            const filterLocal = [...filterLocali, filter]
            setFilterLocali(filterLocal);
        } else {
            const filterLocal = filterLocali.filter((val) => val !== filter);
            setFilterLocali(filterLocal);
        }
    }


    function onFilterBagni(filter) {
        if (filterBagni.indexOf(filter) === -1) {
            const filterBagn = [...filterBagni, filter]
            setFilterBagni(filterBagn);
        } else {
            const filterBagn = filterBagni.filter((val) => val !== filter);
            setFilterBagni(filterBagn);
        }
    }

    function onFilterPrezzoMin(filter) {
        setPrezzoMin(filter);
        console.log(filter);
        console.log(PrezzoMax);
        if (filter > PrezzoMax && PrezzoMax > -1) {
            setPrezzoMax(put => -1);
        }
    }


    function onFilterPrezzoMax(filter) {
        setPrezzoMax(filter);
        if (filter < PrezzoMin) {
            setPrezzoMin(0);
        }
    }

    function onFilterSuperficieMin(filter) {
        setSuperficieMin(filter);
    }

    function onFilterSuperficieMax(filter) {
        setSuperficieMax(filter);
    }


    return (
        <div className='cerca_build'>
            <Filter tipologia={onFilterTipologia}
                locali={onFilterlocali}
                bagni={onFilterBagni}
                prezzoMin={onFilterPrezzoMin}
                prezzoMax={onFilterPrezzoMax}
                superficieMin={onFilterSuperficieMin}
                superficieMax={onFilterSuperficieMax} />

            {!loading ?
                <div className="screen-loading">
                    <div className="loading-div"/>
                    <div className="loading-div"/>
                    <div className="loading-div"/>
                </div> :
                <div>
                    <ShowBuilding posts={currentPosts} favorites={favorites} setFavorites={setFavorites} />
                    <Pagination currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={list.length} paginate={paginate} />
                </div>
            }
        </div>
    )


}

export default Cerca