import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { servicios } from '../datos/servicios';
import { doctores } from '../datos/doctores';
import '../estilos/agendarCita.css';

function AgendarCita() {
  const navigate = useNavigate();
  const [mascotas] = useState(
    () => JSON.parse(localStorage.getItem('mascotas') || '[]')
  );

  const handleContinuar = (e) => {
    e.preventDefault();

    const form = e.target;
    const mascotaId = Number(form.mascota.value);
    const mascota = mascotas.find((m) => m.id === mascotaId);
    const servicio = form.servicio.value;
    const veterinario = form.veterinario.value;
    const motivo = form.motivo.value.trim();

    if (!mascotaId || !servicio || !veterinario || !motivo) {
      Swal.fire({
        icon: 'warning',
        title: 'Complete todos los campos',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    sessionStorage.removeItem('cita-modificar');
    sessionStorage.setItem('cita-pendiente', JSON.stringify({
      mascotaId: mascota.id,
      mascota: mascota.nombre,
      mascotaImagen: mascota.imagen,
      servicio,
      veterinario,
      motivo
    }));

    navigate('/horarios');
  };

  if (mascotas.length === 0) {
    return (
      <div className="agendar-cita">
        <div className="container">
          <div className="agendar-header">
            <h1 className="agendar-titulo">📋 Agendar Cita</h1>
            <p className="agendar-descripcion">
              Completa la información para solicitar una cita veterinaria.
            </p>
            <div className="agendar-linea" />
          </div>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: '1.1rem', color: '#888', marginBottom: '24px' }}>
              No tienes mascotas registradas. Registra una primero.
            </p>
            <button
              className="agendar-boton"
              style={{ width: 'auto', padding: '14px 32px' }}
              onClick={() => navigate('/registrar-mascota')}
            >
              Registrar Mascota
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agendar-cita">
      <div className="container">
        <div className="agendar-header">
          <h1 className="agendar-titulo">📋 Agendar Cita</h1>
          <p className="agendar-descripcion">
            Completa la información para solicitar una cita veterinaria.
          </p>
          <div className="agendar-linea" />
        </div>

        <form className="agendar-formulario" onSubmit={handleContinuar}>
          <div className="agendar-campo">
            <label className="agendar-label" htmlFor="mascota">Mascota</label>
            <select id="mascota" name="mascota" className="agendar-select" defaultValue="">
              <option value="" disabled>Seleccione una mascota</option>
              {mascotas.map((m) => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
              ))}
            </select>
          </div>

          <div className="agendar-campo">
            <label className="agendar-label" htmlFor="servicio">Servicio</label>
            <select id="servicio" name="servicio" className="agendar-select" defaultValue="">
              <option value="" disabled>Seleccione un servicio</option>
              {servicios.map((s) => (
                <option key={s.id} value={s.titulo}>{s.titulo}</option>
              ))}
            </select>
          </div>

          <div className="agendar-campo">
            <label className="agendar-label" htmlFor="veterinario">Veterinario</label>
            <select id="veterinario" name="veterinario" className="agendar-select" defaultValue="">
              <option value="" disabled>Seleccione un veterinario</option>
              {doctores.map((d) => (
                <option key={d.id} value={d.nombre}>{d.nombre}</option>
              ))}
            </select>
          </div>

          <div className="agendar-campo">
            <label className="agendar-label" htmlFor="motivo">Motivo de la consulta</label>
            <textarea
              id="motivo"
              name="motivo"
              className="agendar-textarea"
              placeholder="Describa el motivo de la consulta"
              rows={4}
            />
          </div>

          <button type="submit" className="agendar-boton">
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AgendarCita;
