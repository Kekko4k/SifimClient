import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from "react-router-dom";
import { NavLink as Link } from 'react-router-dom';
import './navbar.css';
import NavbarHome from "./navbar_home"


import Profile from "../../images/Icon_navbar/user.png";
import Edit from "../../images/Icon_navbar/edit.png";
import Favorite from "../../images/Icon_navbar/heart.png";
import Logout from "../../images/Icon_navbar/logout.png";
import Add from "../../images/Icon_navbar/add.png";
import Logo from "../../images/Home/logo.png";

function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const dropdownRef = useRef(null);
  const currentURL = window.location.href;
  const clietUrl = process.env.REACT_APP_SITE;


  function ctrlDropdown() {
    setOpen(!open);
  }

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  function logout() {
    auth.logout();
    navigate("/");
  }


  function onNav(percorso) {
    setOpen(false);
    navigate(percorso);
  }

  return (
    <div>
      {currentURL === clietUrl?

        <NavbarHome />
        :
        <nav className="navigation">
          <a href='/'><img className="logo_navbar" src={Logo} alt="logo Icon"></img></a>
          <button
            className="hamburger"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
          </button>
          <div
            className={
              isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            }
          >
            {auth.user ?
              <div className='dropdown_navbar profile_not_home' ref={dropdownRef}>
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
              <div className='user_access'>
                <Link to='/login'>
                  <div className='login'>
                    Accedi
                  </div>
                </Link>
                <Link to='/register'>
                  <div className='register'>
                    Registrati
                  </div>
                </Link>
              </div>}
          </div>
        </nav>
      }

    </div>
  )
}

export default Navbar;
