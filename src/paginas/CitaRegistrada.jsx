import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/pagoExitoso.css';

function CitaRegistrada() {
  const navigate = useNavigate();
  const [cita, setCita] = useState(null);

  useEffect(() => {
    const pendiente = JSON.parse(sessionStorage.getItem('cita-pendiente') || '{}');

    if (!pendiente.mascota || !pendiente.servicio || !pendiente.hora) {
      navigate('/agendar-cita');
      return;
    }

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

    setCita(nueva);
    sessionStorage.removeItem('cita-pendiente');
  }, [navigate]);

  if (!cita) return null;

  return (
    <div className="pago-exitoso">
      <div className="container">
        <div className="exitoso-contenido">
          <div className="exitoso-icono">
            <span className="exitoso-check">&#10003;</span>
          </div>

          <h1 className="exitoso-titulo">¡CITA REGISTRADA CON ÉXITO!</h1>
          <p className="exitoso-mensaje">¡Te esperamos junto a tu amigo!</p>

          <div className="exitoso-botones">
            <button
              className="exitoso-btn exitoso-btn-primario"
              onClick={() => navigate('/mis-citas')}
            >
              Ver mi cita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CitaRegistrada;
