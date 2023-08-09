import { createContext, useContext, useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';

const Way = createContext({
  way: null,
  updateSrc: () => {},
});

export const WayProvider = ({children}) => {
  const [way, setWay] = useState(null)


  const updateSrc = (path) =>{
    console.log(path);
    setWay(path)
  }

  return <Way.Provider value={{way, updateSrc}}>{children}</Way.Provider>
};

export const useWay = () =>{
  return useContext(Way)
}