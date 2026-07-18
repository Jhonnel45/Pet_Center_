import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../estilos/login.css';
import '../estilos/registro.css';

function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    dni: '',
    direccion: '',
    password: '',
    confirmar: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, apellido, correo, telefono, dni, direccion, password, confirmar } = form;

    if (!nombre.trim() || !apellido.trim() || !correo.trim() || !telefono.trim() || !dni.trim() || !direccion.trim() || !password.trim() || !confirmar.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Complete todos los campos.',
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: 'swal-login' }
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo.trim())) {
      Swal.fire({
        icon: 'error',
        title: 'Correo electrónico no válido.',
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: 'swal-login' }
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'La contraseña debe tener al menos 6 caracteres.',
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: 'swal-login' }
      });
      return;
    }

    if (password !== confirmar) {
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden.',
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: 'swal-login' }
      });
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const existe = usuarios.some((u) => u.correo === correo.trim().toLowerCase());
    if (existe) {
      Swal.fire({
        icon: 'error',
        title: 'El correo ya está registrado.',
        text: 'Ya existe una cuenta con ese correo electrónico.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0B8FA5',
        customClass: { popup: 'swal-login' }
      });
      return;
    }

    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1;

    usuarios.push({
      id: nuevoId,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      correo: correo.trim().toLowerCase(),
      telefono: telefono.trim(),
      dni: dni.trim(),
      direccion: direccion.trim(),
      password: password
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0B8FA5',
      customClass: { popup: 'swal-login' }
    }).then(() => {
      navigate('/iniciar-sesion');
    });
  };

  return (
    <div className="login-page">
      <div className="login-container registro-container">
        <div className="login-logo">
          <div className="login-logo-icon">🐾</div>
          <span className="login-logo-texto">Pet Center</span>
        </div>

        <div className="login-header">
          <h1 className="login-titulo">Crear Cuenta</h1>
          <div className="login-linea">
            <span className="login-huella">🐾</span>
          </div>
          <p className="login-descripcion">
            Regístrate para reservar citas, administrar tus mascotas y realizar compras.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="registro-grid">
            <div className="login-campo">
              <span className="login-icono">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B8FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <input
                type="text"
                name="nombre"
                className="login-input"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="login-campo">
              <span className="login-icono">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B8FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <input
                type="text"
                name="apellido"
                className="login-input"
                placeholder="Apellido"
                value={form.apellido}
                onChange={handleChange}
              />
            </div>

            <div className="login-campo">
              <span className="login-icono">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B8FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <input
                type="email"
                name="correo"
                className="login-input"
                placeholder="Correo electrónico"
                value={form.correo}
                onChange={handleChange}
              />
            </div>

            <div className="login-campo">
              <span className="login-icono">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B8FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              <input
                type="tel"
                name="telefono"
                className="login-input"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="login-campo">
              <span className="login-icono">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B8FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <line x1="7" y1="9" x2="15" y2="9"/>
                  <line x1="7" y1="13" x2="17" y2="13"/>
                  <line x1="7" y1="17" x2="13" y2="17"/>
                </svg>
              </span>
              <input
                type="text"
                name="dni"
                className="login-input"
                placeholder="DNI"
                value={form.dni}
                onChange={handleChange}
              />
            </div>

            <div className="login-campo">
              <span className="login-icono">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B8FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <input
                type="text"
                name="direccion"
                className="login-input"
                placeholder="Dirección"
                value={form.direccion}
                onChange={handleChange}
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
                name="password"
                className="login-input"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
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
                name="confirmar"
                className="login-input"
                placeholder="Confirmar contraseña"
                value={form.confirmar}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="login-boton">
            Registrarme
          </button>
        </form>

        <div className="login-footer">
          <p className="login-footer-texto">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/iniciar-sesion" className="login-footer-link">Iniciar Sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registro;
