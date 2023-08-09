import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from "react-router-dom";
import { NavLink as Link } from 'react-router-dom';
import './navbar.css';


import Profile from "../../images/Icon_navbar/user.png";
import Edit from "../../images/Icon_navbar/edit.png";
import Favorite from "../../images/Icon_navbar/heart.png";
import Logout from "../../images/Icon_navbar/logout.png";
import Add from "../../images/Icon_navbar/add.png";

function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const dropdownRef = useRef(null);

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

  function logout(){
    auth.logout();
    navigate("/");
  }

  function Nav_add(){
    navigate("/insertBuild");
    setOpen(false);
  }

  function onNav(percorso){
    navigate(percorso);
  }

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        Sifim
      </a>
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
          <div className='dropdown_navbar' ref={dropdownRef}>
            <div className="nick_dropdown row" onClick={ctrlDropdown}><img className="icon" src={Profile} alt="Profile Icon" /> <div>        {auth.nick.length > 40
              ? `${auth.nick.slice(0, 40).charAt(0).toUpperCase()}${auth.nick.slice(1, 40).toLowerCase()}...`
              : `${auth.nick.charAt(0).toUpperCase()}${auth.nick.slice(1)}`}</div></div>
            {open &&
              <div className='bar_dropdown'>
                <div className='row'><img className="icon_drop" src={Edit} alt="Edit Icon" />Profilo</div>
                <div className='row' onClick={()=>onNav('/preferiti')} ><img className="icon_drop" src={Favorite} alt="Favorite Icon" />Preferiti</div>
                {auth.ammin&&(<div className='row' onClick={()=>Nav_add()} ><img className="icon_drop" src={Add} alt="Favorite Icon" />Inserisci</div>)}
                <div className='row' onClick={()=>logout()}><img className="icon_drop" src={Logout} alt="Logout Icon"  />Esci</div>
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
  )
}

export default Navbar;
