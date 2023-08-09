import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../components/AuthContext'
import { useNavigate } from "react-router-dom";
import "./showBuilding.css"

import Pref from "../../images/Search/red_heart.png";
import Not_Pref from "../../images/Search/heart.png";

function ShowBuilding({ posts, favorites, setFavorites }) {

  const auth = useAuth();
  const [images, setImages] = useState([])
 const navigate = useNavigate();

  useEffect(() => {

    const fetchPosts = async () => {
      if (posts.length > 0) {
        const ids = posts.map(post => post._id); // Estrai solo gli ID degli elementi

        try {
          const response = await axios.get('http://localhost:5000/inserBuild/files', {
            params: {
              ids: ids.join(",") // Passa gli ID degli annunci separati da virgola
            }
          });

          setImages(response.data)
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchPosts();

  }, [posts]);


  function getImage(id, i) {
    let link = "http://localhost:5000/site/search/No_immage.png";
    if (images.length > 0) {
      images.map((build, index) => (
        build.id_app === id ? link = build.images[i] : null
      ))
    }
    return link;
  }

  const changeImageNext = (e, id) => {
    e.stopPropagation();
    const element = document.getElementById(id);
    const currentSrc = element.src;

    images.forEach((image) => {
      if (image.id_app === id) {
        const currentIndex = image.images.findIndex((link) => link === currentSrc);
        const nextIndex = (currentIndex + 1);
        console.log(nextIndex)
        console.log(image.images.length)
        if ((currentIndex + 1) === image.images.length) {
          element.src = image.images[0];
        } else {
          element.src = image.images[nextIndex];
        }
      }
    });
  };

  const changeImagePre = (e, id) => {
    e.stopPropagation();
    setImages((prevImages) => {
      return prevImages.map((image) => {
        if (image.id_app === id) {
          const currentIndex = image.currentIndex || 0;
          const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : image.images.length - 1;
          const updatedImages = [...image.images];
          const updatedElement = document.getElementById(id);
          if (updatedElement) {
            updatedElement.src = updatedImages[prevIndex];
          }
          const newCurrentIndex = prevIndex;
          return { ...image, currentIndex: newCurrentIndex };
        }
        return image;
      });
    });
  };


  async function addFavorite(e, id) {
    e.stopPropagation();
    if (auth.user) {
      try {
        await axios.post("http://localhost:5000/inserBuild/favoriteAdd", {
          id_build: id,
          id_user: auth.user
        }).then((response) => {
          setFavorites(prevState => [...prevState, id]);
        });
      } catch (error) {
        console.log(error)
      }
    } else {
      // Creare il div con il messaggio di avviso e il pulsante "Accedi"
      const loginReminderDiv = document.createElement("div");
      loginReminderDiv.innerHTML = `
      <div class="layoutFavorite">
        <div class="messageFavorite">
        <div class="close" id="closePref">✖</div>
          Se desideri aggiungerlo nella lista dei preferiti, effettua prima l'accesso
          <div class="buttons_pref"><button class="button_pref" id="loginButton">Accedi</button><button class="button_pref" id="registerButton">Registrati</button></div>
        <div>
      </div>
    `;

      // Aggiungere il div al corpo del documento
      document.body.appendChild(loginReminderDiv);

      // Aggiungere un gestore di eventi al pulsante "Accedi"
      const closeButton = loginReminderDiv.querySelector("#closePref");
      closeButton.addEventListener("click", () => {
        loginReminderDiv.remove(); // Rimuovi il div dalla finestra
      });

      // Aggiungere un gestore di eventi al pulsante "Accedi"
      const loginButton = loginReminderDiv.querySelector("#loginButton");
      loginButton.addEventListener("click", () => {
        navigate("/login");
        loginReminderDiv.remove(); // Rimuovi il div dalla finestra
      });

      const registerButton = loginReminderDiv.querySelector("#registerButton");
      registerButton.addEventListener("click", () => {
        navigate("/register");
        loginReminderDiv.remove(); // Rimuovi il div dalla finestra
      });
    }
  }

  async function removeFavorite(e, id) {
    e.stopPropagation();
     // Creare il div con il messaggio di avviso e il pulsante "Accedi"
     const loginReminderDiv = document.createElement("div");
     loginReminderDiv.innerHTML = `
     <div class="layoutFavorite">
       <div class="messageFavorite">
       <div class="close" id="closePref">✖</div>
        Sei sicuro di volerlo toglierlo fra i preferiti?
        <div class="buttons_pref"><button class="button_pref" id="SiButton">Si</button><button class="button_pref" id="noButton">No</button></div>
       <div>
     </div>
   `;

     // Aggiungere il div al corpo del documento
     document.body.appendChild(loginReminderDiv);

     // Aggiungere un gestore di eventi al pulsante "Accedi"
     const closeButton = loginReminderDiv.querySelector("#closePref");
     closeButton.addEventListener("click", () => {
       loginReminderDiv.remove(); // Rimuovi il div dalla finestra
     });

     // Aggiungere un gestore di eventi al pulsante "Accedi"
     const siButton = loginReminderDiv.querySelector("#SiButton");
     siButton.addEventListener("click", () => {
      try {
          axios.post("http://localhost:5000/inserBuild/favoriteRemove", {
          id_build: id,
          id_user: auth.user
        }).then((response) => {
          // Rimuovi un elemento dall'array usando setElement
          setFavorites(prevState => prevState.filter(item => item !== id));
        });
      } catch (error) {
        console.log(error)
      }
       loginReminderDiv.remove(); // Rimuovi il div dalla finestra
     });

     const noButton = loginReminderDiv.querySelector("#noButton");
     noButton.addEventListener("click", () => {
       loginReminderDiv.remove(); // Rimuovi il div dalla finestra
     });

  }

  function linkBuild(id) {
    navigate("/immobile/"+id)
  }

  return (
    <div className='LayoutPosts' >
      {posts.map((build, index) => (
        <div className='singlePost' onClick={() => linkBuild(build._id)}>
          <div className='layout_image'>
            <img className='image' id={build._id} src={getImage(build._id, 0)} ></img>
            <button className="arrow right" id={"button" + build._id} onClick={(e) => changeImageNext(e, build._id)}>{'>'}</button>
            <button className="arrow left" id={"button" + build._id} onClick={(e) => changeImagePre(e, build._id)} >{'<'} </button>
          </div>
          <div className='description'>
            <span id='title_build'>{build.titolo}</span><br />
            <span id='prezzo_build'>{build.prezzo.toLocaleString('it-IT')}€</span>
            <div className='info_build'>
              <div className='single_info'><div >{build.stanze}</div><div>locali</div></div>
              <div className='single_info'><div >{build.superficie} m2</div><div>superficie</div></div>
            </div>
            <br />
            <div>{build.descrizione> 320 ? build.descrizione.slice(0, 320) + "..." : build.descrizione}</div>
          </div>
          <div className='favorite'>
            {favorites.includes(build._id) ? (
              <div onClick={(e) => removeFavorite(e, build._id)}><img src={Pref} /></div>
            ) : (
              <div onClick={(e) => addFavorite(e, build._id)}><img src={Not_Pref} /></div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShowBuilding