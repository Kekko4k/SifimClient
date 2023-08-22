import React, { useState, useEffect, useRef } from 'react'
import "./navbar_home.css"
import Logo from "../../images/Home/logo.png";
import { useAuth } from '../AuthContext';
import { useNavigate } from "react-router-dom";

import Profile from "../../images/Icon_navbar/user.png";
import Edit from "../../images/Icon_navbar/edit.png";
import Favorite from "../../images/Icon_navbar/heart.png";
import Logout from "../../images/Icon_navbar/logout.png";
import Add from "../../images/Icon_navbar/add.png";



function Navbar_home() {

    const [active, setActive] = useState(false)
    const auth = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const siteUrl = process.env.REACT_APP_SITE;

    //Chiude il riquadro se clicca al di fuori del riquadro
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 960) {
                setActive(false);
            }
        };
        // Aggiungi l'event listener per il ridimensionamento della finestra
        window.addEventListener('resize', handleResize);

        // Rimuovi l'event listener quando il componente viene smontato
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function ctrlDropdown() {
        setOpen(!open);
    }

    function UseDropdown() {
        setActive(!active);
    }

    function onNav(percorso) {
        setOpen(false);
        navigate(percorso);
    }



    function logout() {
        auth.logout();
        navigate("/");
    }


    return (
        <div className='layoutNavbar'>
            <nav className='navbar_home'>
                <div><a href='/'><img className="logo_navbar" src={Logo} alt="logo Icon"></img></a></div>
                <div>
                    <ul className='navbar_chooses'>
                        <li className='navbar_choose'><a href={siteUrl}>Home</a></li>
                        <li className='navbar_choose'><a href={siteUrl+'/servizi'}>Servizi</a></li>
                        <li className='navbar_choose'><a href={siteUrl+'/chi_siamo'}>Chi siamo</a></li>
                        <li className='navbar_choose'><a href={siteUrl+'/contatti'}>Contatti</a></li>
                    </ul>
                </div>
                <div>
                    {auth.user ?
                        <div className='dropdown_navbar profile_home' ref={dropdownRef}>
                            <div className="nick_dropdown row" onClick={ctrlDropdown}><img className="icon" src={Profile} alt="Profile Icon" /> <div>        {auth.nick.length > 40
                                ? `${auth.nick.slice(0, 20).charAt(0).toUpperCase()}${auth.nick.slice(1, 20).toLowerCase()}...`
                                : `${auth.nick.charAt(0).toUpperCase()}${auth.nick.slice(1)} `} </div></div>
                            {open &&
                                <div className='bar_dropdown'>
                                    <div className='row'><img className="icon_drop" src={Edit} alt="Edit Icon" />Profilo</div>
                                    <div className='row' onClick={() => onNav('/preferiti')} ><img className="icon_drop" src={Favorite} alt="Favorite Icon" />Preferiti</div>
                                    {auth.ammin && (<div className='row' onClick={() => onNav("/insertBuild")} ><img className="icon_drop" src={Add} alt="Favorite Icon" />Inserisci</div>)}
                                    <div className='row' onClick={() => logout()}><img className="icon_drop" src={Logout} alt="Logout Icon" />Esci</div>
                                </div>}
                        </div>
                        :
                        <a href='/login'>
                            <button className='Accedi_home'><img className="icon_drop" src={Profile} alt="Profile Icon" />Accedi</button>
                        </a>
                    }
                </div>
                <div className='layout_hamburger'>
                    <div className={!active ? 'hamburger_nav' : 'hamburger_nav_close'} onClick={() => UseDropdown()}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    {active &&
                        (!auth.user ? (
                            <div className='dropdown_nav'>
                                <div>Accedi</div>
                                <div>Registrati</div>
                            </div>
                        ) : (
                            <div className='dropdown_nav' id='accesso'>
                                <span><img className="icon" src={Profile} alt="Profile Icon" /> {auth.nick.length > 40
                                    ? `${auth.nick.slice(0, 20).charAt(0).toUpperCase()}${auth.nick.slice(1, 20).toLowerCase()}...`
                                    : `${auth.nick.charAt(0).toUpperCase()}${auth.nick.slice(1)} `} </span>

                                <div className='row'><img className="icon_drop" src={Edit} alt="Edit Icon" />Profilo</div>
                                <div className='row' onClick={() => onNav('/preferiti')} ><img className="icon_drop" src={Favorite} alt="Favorite Icon" />Preferiti</div>
                                {auth.ammin && (<div className='row' onClick={() => onNav("/insertBuild")} ><img className="icon_drop" src={Add} alt="Favorite Icon" />Inserisci</div>)}
                                <div className='row' onClick={() => logout()}><img className="icon_drop" src={Logout} alt="Logout Icon" />Esci</div>

                            </div>
                        ))}
                </div>
            </nav>
        </div>
    )
}

export default Navbar_home