import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../estilos/barraNavegacion.css';

function BarraNavegacion() {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const usuarioRaw = localStorage.getItem('usuario');
  const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  const isLoggedIn = !!usuario;

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuario');
    sessionStorage.removeItem('cita-modificar');
    sessionStorage.removeItem('cita-pendiente');
    setMenuAbierto(false);
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada correctamente.',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={cerrarMenu}>
        <span>Pet Center</span>
      </Link>

      <button
        className={`navbar-hamburger ${menuAbierto ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${menuAbierto ? 'open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'} onClick={cerrarMenu}>Inicio</NavLink>
        <NavLink to="/productos" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'} onClick={cerrarMenu}>Productos</NavLink>
        <NavLink to="/servicios" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'} onClick={cerrarMenu}>Servicios</NavLink>

        {isLoggedIn ? (
          <>
            <NavLink to="/mis-citas" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'} onClick={cerrarMenu}>Mis Citas</NavLink>
            <NavLink to="/mi-carrito" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'} onClick={cerrarMenu}>Mi Carrito</NavLink>
            <NavLink to="/informacion-mascota" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'} onClick={cerrarMenu}>Mi Mascota</NavLink>
            <span className="navbar-link">👤 Hola, {usuario.nombre}</span>
            <button
              className="navbar-link"
              onClick={handleCerrarSesion}
              style={{
                backgroundColor: '#159CB3',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                padding: '8px 18px',
                fontWeight: 600,
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0D7D91'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#159CB3'}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <NavLink to="/registro" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'} onClick={cerrarMenu}>Registrarse</NavLink>
            <NavLink to="/iniciar-sesion" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'} onClick={cerrarMenu}>Iniciar Sesión</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default BarraNavegacion;
