import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { servicios } from '../datos/servicios';
import { doctores } from '../datos/doctores';
import TarjetaServicio from '../componentes/TarjetaServicio';
import TarjetaDoctor from '../componentes/TarjetaDoctor';
import BotonPrincipal from '../componentes/BotonPrincipal';
import '../estilos/servicios.css';

function Servicios() {
  const navigate = useNavigate();

  const handleReservar = () => {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe iniciar sesión',
        text: 'Inicie sesión para reservar una cita.',
        confirmButtonText: 'Ir a iniciar sesión',
        confirmButtonColor: '#159CB3',
        customClass: { popup: 'swal-servicio' }
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/iniciar-sesion');
        }
      });
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Reserva de cita.',
      text: 'Será dirigido al formulario de agendamiento.',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#159CB3',
      customClass: { popup: 'swal-servicio' }
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/agendar-cita');
      }
    });
  };

  return (
    <div className="servicios-page">
      <div className="container">
        <div className="servicios-header">
          <h1 className="servicios-titulo">
            <span className="servicios-icono">🐾</span> Nuestros Servicios
          </h1>
          <p className="servicios-subtitulo">
            Brindamos atención veterinaria especializada para cuidar la salud y bienestar de tu mascota.
          </p>
          <div className="servicios-linea"></div>
        </div>

        <div className="servicios-grid">
          {servicios.slice(0, 5).map((servicio) => (
            <TarjetaServicio
              key={servicio.id}
              imagen={servicio.imagen}
              titulo={servicio.titulo}
              descripcion={servicio.descripcion}
              boton={
                <BotonPrincipal
                  texto="Reservar"
                  className="btn-reservar"
                  onClick={handleReservar}
                />
              }
            />
          ))}
        </div>

        <div className="doctores-seccion">
          <h2 className="doctores-titulo">
            <span className="servicios-icono">👨‍⚕️</span> Nuestro Equipo
          </h2>
          <p className="servicios-subtitulo">
            Profesionales comprometidos con la salud de tu mascota.
          </p>
          <div className="servicios-linea"></div>

          <div className="doctores-grid">
            {doctores.slice(0, 4).map((doctor) => (
              <TarjetaDoctor
                key={doctor.id}
                imagen={doctor.imagen}
                nombre={doctor.nombre}
                especialidad={doctor.especialidad}
                descripcion={doctor.descripcion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Servicios;
