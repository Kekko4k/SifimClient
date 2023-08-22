import logo from './logo.svg';
import Home from './pages/home/home'
import Register from './pages/register/register'
import Login from './pages/login/login'
import Navbar from './components/navbar/navbar';
import Insert from './pages/insertBuild/insertBuild'
import Cerca from './pages/cerca/cerca'
import Preferiti from './pages/listaPreferiti/listaPreferiti'
import Build from './pages/showBuild/showBuild'
import Contatti from './pages/contatti/contatti'
import Footer from './components/footer/footer';
import {  Route, Routes, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider>
      <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/insertBuild' element={<Insert/>}></Route>
          <Route path='/cerca' element={<Cerca/>}></Route>
          <Route path='/preferiti' element={<Preferiti/>}></Route>
          <Route path='/contatti' element={<Contatti/>}></Route>
          <Route path='/immobile/:id' element={<Build/>}></Route>
          
        </Routes>
        <Footer/>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
