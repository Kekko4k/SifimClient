import { createContext, useContext, useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';

const AuthContext = createContext({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [nick,setNick] =useState(null) 
  const [ammin, setAmmin] = useState(false)
  const [token, setToken] = useState(null);

 

  useEffect(() => {
    checkLoggedInUser(); // Esegue il controllo del login all'inizializzazione del componente
  }, []);

  const checkLoggedInUser = () => {
    const data = window.localStorage.getItem("id");
    if (data) {
      const nick = window.localStorage.getItem("nick");
      setNick(nick);
      setUser(data);
      try {
        axios.post("http://localhost:5000/users/ammin", {
          id: data
        }).then((response) => {
          if (response.status === 200) {
            setAmmin(true);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };


  const login = (_id,username) =>{
    setToken(token);
    setUser(_id)
    setNick(username)
    window.localStorage.setItem("id", _id);
    window.localStorage.setItem("nick", username);
  }

  const logout = () =>{
    setToken(null);
    setUser(null)
    setNick(null)
    setAmmin(false)
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("nick");
  }
  return <AuthContext.Provider value={{user, ammin, nick, login, logout}}>{children}</AuthContext.Provider>
};

export const useAuth = () =>{
  return useContext(AuthContext)
}