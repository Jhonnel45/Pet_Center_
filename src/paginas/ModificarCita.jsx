import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicios } from '../datos/servicios';
import { doctores } from '../datos/doctores';
import '../estilos/modificarCita.css';

function ModificarCita() {
  const navigate = useNavigate();
  const [cita, setCita] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [mascotaId, setMascotaId] = useState('');
  const [mascota, setMascota] = useState('');
  const [servicio, setServicio] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const [motivo, setMotivo] = useState('');
  const [hora, setHora] = useState('');

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('cita-modificar') || '{}');
    if (!data.id) {
      navigate('/mis-citas');
      return;
    }
    setCita(data);

    const pendiente = JSON.parse(sessionStorage.getItem('cita-pendiente') || '{}');

    if (pendiente.hora) {
      setMascotaId(pendiente.mascotaId || '');
      setMascota(pendiente.mascota || '');
      setServicio(pendiente.servicio || '');
      setVeterinario(pendiente.veterinario || '');
      setMotivo(pendiente.motivo || '');
      setHora(pendiente.hora || '');
    } else {
      setMascotaId(data.mascotaId || '');
      setMascota(data.mascota || '');
      setServicio(data.servicio || '');
      setVeterinario(data.veterinario || '');
      setMotivo(data.motivo || '');
      setHora(data.hora || '');
    }

    const mascs = JSON.parse(localStorage.getItem('mascotas') || '[]');
    setMascotas(mascs);
  }, [navigate]);

  const handleEditarHorario = () => {
    if (!cita) return;
    const pendiente = {
      mascotaId: mascotaId,
      mascota: mascota,
      mascotaImagen: cita.mascotaImagen,
      servicio: servicio,
      veterinario: veterinario,
      motivo: motivo,
      _origen: 'modificar'
    };
    sessionStorage.setItem('cita-pendiente', JSON.stringify(pendiente));
    navigate('/horarios');
  };

  const handleModificar = () => {
    if (!cita) return;
    const pendiente = JSON.parse(sessionStorage.getItem('cita-pendiente') || '{}');
    const citas = JSON.parse(localStorage.getItem('citas') || '[]');
    const index = citas.findIndex((c) => c.id === cita.id);
    if (index !== -1) {
      citas[index].mascotaId = mascotaId;
      citas[index].mascota = mascota;
      citas[index].servicio = servicio;
      citas[index].veterinario = veterinario;
      citas[index].motivo = motivo;
      citas[index].fecha = pendiente.fecha || cita.fecha;
      citas[index].hora = pendiente.hora || hora;
      localStorage.setItem('citas', JSON.stringify(citas));
    }
    sessionStorage.removeItem('cita-modificar');
    sessionStorage.removeItem('cita-pendiente');
    navigate('/cita-modificada');
  };

  if (!cita) return null;

  return (
    <div className="modificar-cita">
      <div className="container">
        <div className="modificar-contenido">
          <div className="modificar-header">
            <h1 className="modificar-titulo">Modificar tu Cita</h1>
            <div className="modificar-linea" />
          </div>

          <div className="modificar-tarjeta">
            <div className="modificar-campo">
              <label className="modificar-label">Mascota</label>
              <select
                className="modificar-input"
                value={mascota}
                onChange={(e) => {
                  const selected = mascotas.find((m) => m.nombre === e.target.value);
                  setMascota(e.target.value);
                  setMascotaId(selected ? selected.id : '');
                }}
              >
                <option value="">Seleccione una mascota</option>
                {mascotas.map((m) => (
                  <option key={m.id} value={m.nombre}>{m.nombre}</option>
                ))}
              </select>
            </div>

            <div className="modificar-campo">
              <label className="modificar-label">Servicio</label>
              <select
                className="modificar-input"
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
              >
                <option value="">Seleccione un servicio</option>
                {servicios.map((s) => (
                  <option key={s.id} value={s.titulo}>{s.titulo}</option>
                ))}
              </select>
            </div>

            <div className="modificar-campo">
              <label className="modificar-label">Veterinario</label>
              <select
                className="modificar-input"
                value={veterinario}
                onChange={(e) => setVeterinario(e.target.value)}
              >
                <option value="">Seleccione un veterinario</option>
                {doctores.map((d) => (
                  <option key={d.id} value={d.nombre}>{d.nombre}</option>
                ))}
              </select>
            </div>

            <div className="modificar-campo">
              <label className="modificar-label">Motivo de consulta</label>
              <input
                className="modificar-input"
                type="text"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </div>

            <div className="modificar-separador" />

            <div className="modificar-horario">
              <span className="modificar-horario-label">Horarios</span>
              <div className="modificar-horario-control">
                <button className="modificar-horario-boton" onClick={handleEditarHorario}>
                  Editar horario
                </button>
                <span className="modificar-horario-hora">{hora}</span>
              </div>
            </div>

            <button className="modificar-boton" onClick={handleModificar}>
              Modificar Cita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModificarCita;
