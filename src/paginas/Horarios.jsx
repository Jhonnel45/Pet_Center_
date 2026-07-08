import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../estilos/horarios.css';

const horarios = [
  '08:00 AM',
  '09:00 AM',
  '10:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM'
];

function Horarios() {
  const navigate = useNavigate();
  const [seleccionado, setSeleccionado] = useState(null);

  const handleConfirmar = () => {
    if (!seleccionado) {
      Swal.fire({
        icon: 'warning',
        title: 'Seleccione un horario',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    const pendiente = JSON.parse(sessionStorage.getItem('cita-pendiente') || '{}');
    pendiente.hora = seleccionado;
    pendiente.fecha = '15/07/2026';
    sessionStorage.setItem('cita-pendiente', JSON.stringify(pendiente));

    if (pendiente._origen === 'modificar') {
      const modificar = JSON.parse(sessionStorage.getItem('cita-modificar') || '{}');
      if (modificar.id) {
        const citas = JSON.parse(localStorage.getItem('citas') || '[]');
        const index = citas.findIndex((c) => c.id === modificar.id);
        if (index !== -1) {
          citas[index].mascotaId = pendiente.mascotaId || modificar.mascotaId;
          citas[index].mascota = pendiente.mascota || modificar.mascota;
          citas[index].mascotaImagen = pendiente.mascotaImagen || modificar.mascotaImagen;
          citas[index].servicio = pendiente.servicio || modificar.servicio;
          citas[index].veterinario = pendiente.veterinario || modificar.veterinario;
          citas[index].motivo = pendiente.motivo || modificar.motivo;
          citas[index].fecha = pendiente.fecha;
          citas[index].hora = pendiente.hora;
          localStorage.setItem('citas', JSON.stringify(citas));
        }
      }
      sessionStorage.removeItem('cita-modificar');
      sessionStorage.removeItem('cita-pendiente');
      navigate('/cita-modificada');
    } else {
      const citas = JSON.parse(localStorage.getItem('citas') || '[]');

      const nueva = {
        id: Date.now(),
        mascotaId: pendiente.mascotaId,
        mascota: pendiente.mascota,
        mascotaImagen: pendiente.mascotaImagen || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&q=80',
        servicio: pendiente.servicio,
        veterinario: pendiente.veterinario,
        motivo: pendiente.motivo || '',
        fecha: pendiente.fecha,
        hora: pendiente.hora,
        estado: 'Confirmada'
      };

      const duplicado = citas.some(
        (c) =>
          c.mascota === nueva.mascota &&
          c.servicio === nueva.servicio &&
          c.fecha === nueva.fecha &&
          c.hora === nueva.hora
      );

      if (!duplicado) {
        citas.push(nueva);
        localStorage.setItem('citas', JSON.stringify(citas));
      }

      sessionStorage.removeItem('cita-pendiente');

      Swal.fire({
        icon: 'success',
        title: '¡Cita registrada con éxito!',
        text: '¡Te esperamos junto a tu amigo!',
        confirmButtonText: 'Ver mi cita',
        confirmButtonColor: '#159CB3',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/mis-citas');
        }
      });
    }
  };

  return (
    <div className="horarios-page">
      <div className="container">
        <div className="horarios-header">
          <h1 className="horarios-titulo">🕒 Horarios Disponibles</h1>
          <p className="horarios-descripcion">
            Selecciona el horario que mejor se adapte a tu disponibilidad.
          </p>
          <div className="horarios-linea" />
        </div>

        <div className="horarios-contenido">
          <div className="horarios-calendario">
            <span className="horarios-calendario-icono">📅</span>
            <div>
              <p className="horarios-calendario-label">Fecha seleccionada</p>
              <p className="horarios-calendario-fecha">15 de Julio de 2026</p>
            </div>
          </div>

          <div className="horarios-lista">
            {horarios.map((hora) => (
              <button
                key={hora}
                className={`horarios-item ${seleccionado === hora ? 'horarios-item--activo' : ''}`}
                onClick={() => setSeleccionado(hora)}
              >
                {hora}
              </button>
            ))}
          </div>

          <button className="horarios-boton" onClick={handleConfirmar}>
            Confirmar Cita
          </button>
        </div>
      </div>
    </div>
  );
}

export default Horarios;
