import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../auth/firebase';
import { Mensaje } from '../assets/SweetAlert';
import { Helmet } from 'react-helmet';

export default function Login3() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true)
  const { login, user, logout, admin } = useAuthContext();
  const navegar = useNavigate();


  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password).then((user) => {
      login(usuario)
      Mensaje("Registro exitoso", "", "success", "Confirmar");
      limpiaFormu();
      if (admin) navegar('/dashboardAdmin');
    }).catch((error) => {
      if (error.code == "auth/invalid-credential") {
        Mensaje("Credenciales incorrectas", "", "error", "Cerrar")
      } if (error.code == "auth/weak-password") {
        Mensaje("Contraseña debil", "Password should be at least 6 characters", "error", "Cerrar")
      }
    })
  }

  const handleSubmit2 = (e) => {
    logout();
  }

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    loginEmailPass(usuario, password)
      .then((user) => {
        login(usuario);
        Mensaje("Logeo exitoso", "", "success", "Confirmar");
        limpiaFormu();
        if (admin) {
          navegar('/dashboardAdmin');
        } else {
          navegar('/productos')
        }
      })
      .catch((error) => {
        if (error.code == "auth/invalid-credential") {
          Mensaje("Credenciales incorrectas", "", "error", "Cerrar");
          limpiaFormu();
        }
      })
  }

  const limpiaFormu = () => {
    setUsuario('');
    setPassword('');
  }

  function handleShow(e) {
    e.preventDefault();
    setShow(!show)
  }

  // if (user || admin) {
  //   return (

  //     <form onSubmit={handleSubmit2}>
  //       <button type="submit" className="btn btn-danger">Cerrar sesión</button>

  //     </form>
  //   )
  // } 
  if (admin) {
    navegar('/dashboardAdmin');
  } 
  if (user) {
    navegar('/productos')
  }

  if (!user && show) {
    return (
      <div className='d-flex flex-column align-items-center min-vh-100'>
        <Helmet>
          <title>Login/BroncoMuebles</title>
          <meta name="description" content="Explora nuestra variedad de productos." />
        </Helmet>
        <h2 className='titulo'>inicio de sesion</h2>

        <form onSubmit={iniciarSesionEmailPass} className="p-4 border rounded shadow ">
          <h3 className='titulo-cap'>se requieren tu email y pass</h3>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input value={usuario}
              onChange={(e) => setUsuario(e.target.value)} type="email" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary w-50">Ingresar</button>
          <button style={{ marginTop: "2px" }} className="btn btn-secondary w-50" onClick={handleShow}>Registrate</button>
        </form>
      </div>
    )
  } if (!user && !show) {
    return (
      <div>
        <form onSubmit={registrarUsuario}>
          <h2 className='titulo'>Registrarse</h2>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Registrase</button>
        </form>
        <button style={{ marginTop: "2px" }} onClick={handleShow}>Iniciar Sesión</button>
      </div>
    )
  }
}

