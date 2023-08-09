import React, { useState } from 'react'
import axios from 'axios';
import "./register.css"

import Show from "../../images/Register/show.png";
import Not_Show from "../../images/Register/hide.png";
import Checkbox from '../../components/filter/checkbox/checkbox';

function Register() {

  const [user, setUser]=useState({name:"", email:"", password:""});
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorName, setErrorName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPass, setErrorPass] = useState(null);
  const [errorCheck, setErrorCheck] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const ShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  function isValidName(name) {
    if (name !== "" && /^[a-zA-Z ]*$/.test(name)) {
      return true;
    } else {
      return false;
    }

  }
  
  const setChecked = () => {
    setIsChecked((prev) => !prev)
}
  
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPassword(pass) {
    if (pass !== "") {
      // Almeno 4 caratteri alfanumerici, almeno 1 numero e almeno 1 carattere speciale
      var regexAlphanumeric = /[a-zA-Z0-9]{3,}/;
      var regexNumber = /[0-9]/;
      var regexSpecialChar = /[^a-zA-Z0-9]/;
  
      if (
        regexAlphanumeric.test(pass) &&
        regexNumber.test(pass) &&
        regexSpecialChar.test(pass)
      ) {
        return 0; // Password valida
      } else {
        return 2; // Requisiti non soddisfatti
      }
    } else {
      return 1; // Campo password vuoto
    }
  }
  


  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  async function postData(e) {
    e.preventDefault();
    setErrorName(null);
    setErrorEmail(null);
    setErrorPass(null);
    setErrorCheck(null);


    if (isValidEmail(user.email) && isValidName(user.name) && isValidPassword(user.password)===0 && isChecked) {
      const date = new Date().toJSON().slice(0, 10);
      try {
          await axios.post("http://localhost:5000/users/register", {
            username: user.name,
            email: user.email,
            password: user.password,
            date: date
          }).then((response) => { 
            if(response.data.message==="400"){
              setErrorEmail("Email già presente")
            }else{

            }
          });
        } catch (error) {
          console.log(error)
        }
      }    else {
        if (!isValidEmail(user.email)) {
          setErrorEmail("Email non valida");
        }
        if (!isValidName(user.name)) {
          setErrorName("Formato errato");
        }
        const errorP=isValidPassword(user.password);
        console.log(errorP)
        if (errorP===1) {
          setErrorPass("Password non inserita");
        }else if(errorP===2){
          setErrorPass("Scrivi almeno 3 caratteri con almeno un carattere speciale e un numero");
        }
  
        if(!isChecked){
          setErrorCheck("Accetta i termini di codizione");
        }
      }
  }


  return (
    <div id="login_layout">
        <form onSubmit={postData} >
            <div><span>Name:</span><br/><input type="text" className="input_login"  value={user.name} name="name" onChange={handlechange}></input></div>
            {errorName && <span className="Error email">{errorName}</span>}
            <div><span>Email:</span><br/><input type="text" className="input_login"  value={user.email} name="email" onChange={handlechange}></input></div>
            {errorEmail && <span className="Error email">{errorEmail}</span>}
            <div><span>Password:</span><br/><input type={passwordShown ? "text" : "password"} className="input_login"  value={user.password} name="password"onChange={handlechange}></input>
            <img  src={passwordShown ? Show : Not_Show} id="visiblePassword"  alt="Show Passowrd" onClick={ShowPassword} />
            </div>
            {errorPass && <div className="Error pass">{errorPass}</div>}
            <div>
              <br />  
              <label className="inputDiv">
                <input type="checkbox" onChange={setChecked} />
                <span className="inputDescription" id="condizioni" >Accetto i termini e condizioni</span>
              </label>
            </div>
            {errorCheck && <span className="Error email">{errorCheck}</span>}
            <button type="submit" id='button_login'>Send</button>
        </form>
    </div>
  )
}

export default Register;