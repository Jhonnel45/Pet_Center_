import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../estilos/login.css';

function IniciarSesion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Complete todos los campos.',
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: 'swal-login' }
      });
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo === email.trim().toLowerCase() && u.password === password
    );

    if (!usuarioEncontrado) {
      Swal.fire({
        icon: 'error',
        title: 'Correo o contraseña incorrectos.',
        confirmButtonText: 'Aceptar',
        customClass: { popup: 'swal-login' }
      });
      return;
    }

    localStorage.setItem(
      'usuario',
      JSON.stringify({
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        correo: usuarioEncontrado.correo
      })
    );

    Swal.fire({
      icon: 'success',
      title: 'Bienvenido ' + usuarioEncontrado.nombre + '.',
      confirmButtonText: 'Ir al inicio',
      customClass: { popup: 'swal-login' }
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">

        </div>

        <div className="login-header">
          <h1 className="login-titulo">Iniciar Sesión</h1>
          <div className="login-linea">
            <span className="login-huella">🐾</span>
          </div>
          <p className="login-descripcion">
            Accede para administrar tus citas, mascotas y compras.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-campo">
            <span className="login-icono">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B8FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <input
              type="email"
              className="login-input"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-campo">
            <span className="login-icono">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B8FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </span>
            <input
              type="password"
              className="login-input"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-boton">
            Iniciar Sesión
          </button>
        </form>

        <div className="login-footer">
          <p className="login-footer-texto">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="login-footer-link">Registrarse</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default IniciarSesion;
