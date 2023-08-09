import React, {useState} from 'react'
import {useAuth} from '../../components/AuthContext'
import { useNavigate, useLocation} from "react-router-dom";
import axios from 'axios'
import "./login.css"

function Login() {

    const [user, setUser]=useState({email:"",password:""})
    const [check, setCheck] = useState("");
    const [error, setError]= useState("");
    const auth = useAuth();
    const navigate=useNavigate();
    const location= useLocation()
    const redirectPath = location.state?.path || '/'


  const handleChange = (e) =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value})
  }


  async function Postdata (e){
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users/login", {
        email: user.email,
        password: user.password,
      }).then((response) => { 
        auth.login(response.data._id, response.data.username);
        navigate(redirectPath, {replace: true});
      });
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <div id="login_layout">
      <form onSubmit={Postdata}>
      <div><span>Email:</span><br/><input type='text'  name="email" className="input_login" onChange={handleChange}></input></div>
      <div><span>Password:</span><br/><input type='password' name="password" className="input_login" onChange={handleChange}></input></div>
      <button type='submit' id='button_login'>Accedi</button>
      {check.length>1 &&  <div>{check}</div>}
      {error &&  <div id='error_login'>{error}</div>}
      </form>
    </div>
  )
}

export default Login