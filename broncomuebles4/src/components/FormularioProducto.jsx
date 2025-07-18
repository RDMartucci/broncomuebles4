import React, { useState } from 'react';
import { Mensaje } from '../assets/SweetAlert';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useProductosContext } from '../contexts/ProductosContext';
import { Helmet } from 'react-helmet';
import { Button } from 'react-bootstrap';

function FormularioProducto({}) {
  const {agregarProducto} = useProductosContext();
  const {admin} = useAuthContext();
  const navegar = useNavigate();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ""
  });

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return("El nombre es obligatorio.")
    }
    if (!producto.price || producto.price <= 0) {
      return("El precio debe ser mayor a 0.")
    }
    console.log(producto.description.trim())
    if (!producto.description.trim() || producto.description.length < 10) {
      return("La descripción debe tener al menos 10 caracteres.")
    }
    if(!producto.imagen.trim()){
      return("La url de la imagen no debe estar vacía")
    }
    else{
      return true
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario()
    if (validarForm == true) {
      agregarProducto(producto)
      .then((data) => {
        Mensaje('Producto agregado con exito!','','success','cerrar')
        setProducto({ name: '', price: '', description: '', imagen: ""});
      })
      .catch((error) => {
        Mensaje("Hubo un problema al agregar el producto", error, "error", "Cerrar")
      })
    } else{
      Mensaje("Error en la carga de producto", validarForm, "error", "Cerrar")
    }
  }

  if(!admin){
    return(
      <Navigate to="/login" replace/>
    )
  }

  const handleCancelar = () => { 
    navegar('/dashboardAdmin');
  }

  return ( 
    <div className='d-flex flex-column  justify-content-center  align-items-center'>
                <Helmet>
                <title>Agregar/BroncoMuebles</title>
                <meta name="description" content="Explora nuestra variedad de productos." />
            </Helmet>
        <h3 className='titulo m-5'>agregar producto nuevo</h3>
      <form onSubmit={handleSubmit2} className="p-4 border rounded shadow w-100">
        <div>
          <label className="form-label">Nombre:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={producto.name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="form-label">Imagen URL:</label>
          <input
            type="text" className="form-control" name="imagen" value={producto.imagen} onChange={handleChange} required/>
        </div>
        <div>
          <label className="form-label">Precio:</label>
          <input
            type="number"
            name="price"
            value={producto.price || ''}
            onChange={handleChange}
            required
            className="form-control"
            min="0"
          />
        </div>
        <div>
          <label className="form-label">Descripcion:</label>
          <textarea
            name="description"
            value={producto.description || ''}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit">Confirmar Agregar Producto</button>
      </form>
      <Button variant="danger" onClick={handleCancelar} >Cancelar</Button>
    </div>
  );
}

export default FormularioProducto;
  