import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import BarraNav from './components/BarraNav';
import Home from './layouts/Home'
import Footer from './components/Footer';
import About from './layouts/About';
import Contacto from './layouts/Contacto';
import ProductosContainer from './components/ProductosContainer';
// import Admin from './components/DashboardAdmin';
import DashboardAdmin from './components/DashboardAdmin';
import FormularioProducto from './components/FormularioProducto';
import FormularioEdicion from './components/FormularioEdicion';
import Carrito from './components/Carrito';
import Login3 from './components/Login3';
import ProductoDetalleBoostrap from './components/ProductoDetalle';
import './App.css'

export default function App() {
  const {verificacionLog} = useAuthContext();

  useEffect(() => {
    verificacionLog()
  }, [])
  
  return (
    <Router>
        <BarraNav/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login3/>} />
          <Route path="/productos" element={<ProductosContainer/>}/>
          <Route path="/carrito" element={<Carrito /> }/>      
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/productos/:id" element={<ProductoDetalleBoostrap/>}/>
          <Route path='/dashboardAdmin' element={<DashboardAdmin/>}/>
          <Route path="/dashboardAdmin/agregarProductos" element={<FormularioProducto/>}/>
          <Route path="/dashboardAdmin/editarProducto/:id" element={<FormularioEdicion/>}/>
        </Routes>
        <Footer/>
    </Router>
  )
}