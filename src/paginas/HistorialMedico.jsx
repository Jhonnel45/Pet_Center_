import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../estilos/historialMedico.css';

function HistorialMedico() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mascotaId = params.get('id');

  const mascotas = useMemo(
    () => JSON.parse(localStorage.getItem('mascotas') || '[]'),
    []
  );

  const mascota = useMemo(
    () => mascotas.find((m) => String(m.id) === mascotaId) || null,
    [mascotaId, mascotas]
  );

  const citas = useMemo(
    () => JSON.parse(localStorage.getItem('citas') || '[]'),
    []
  );

  const historial = useMemo(
    () => citas.filter((c) => c.mascotaId === Number(mascotaId)),
    [citas, mascotaId]
  );

  if (!mascota) {
    return (
      <div className="historial-page">
        <div className="container">
          <div className="historial-header">
            <h1 className="historial-titulo">🩺 Historial Médico</h1>
            <p className="historial-descripcion">
              Consulta el historial de atenciones médicas de tu mascota.
            </p>
            <div className="historial-linea" />
          </div>
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: '1.1rem', color: '#888', marginBottom: '24px' }}>
              Mascota no encontrada.
            </p>
            <button
              className="historial-boton"
              onClick={() => navigate('/informacion-mascota')}
            >
              Volver a Información
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="historial-page">
      <div className="container">
        <div className="historial-header">
          <h1 className="historial-titulo">🩺 Historial Médico</h1>
          <p className="historial-descripcion">
            Consulta el historial de atenciones médicas de tu mascota.
          </p>
          <div className="historial-linea" />
        </div>

        <div className="historial-mascota">
          <img
            className="historial-mascota-imagen"
            src={mascota.imagen}
            alt={mascota.nombre}
          />
          <div className="historial-mascota-info">
            <div className="historial-mascota-fila">
              <span className="historial-mascota-label">Nombre:</span>
              <span className="historial-mascota-valor">{mascota.nombre}</span>
            </div>
            <div className="historial-mascota-fila">
              <span className="historial-mascota-label">Raza:</span>
              <span className="historial-mascota-valor">{mascota.raza}</span>
            </div>
            <div className="historial-mascota-fila">
              <span className="historial-mascota-label">Edad:</span>
              <span className="historial-mascota-valor">{mascota.edad}</span>
            </div>
            <div className="historial-mascota-fila">
              <span className="historial-mascota-label">Estado:</span>
              <span className="historial-mascota-valor historial-mascota-valor--activo">Activo</span>
            </div>
          </div>
        </div>

        {historial.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: '1.1rem', color: '#888', marginBottom: '24px' }}>
              Esta mascota aún no tiene historial médico.
            </p>
          </div>
        ) : (
          <div className="historial-lista">
            {historial.map((r) => (
              <div key={r.id} className="historial-registro">
                <div className="historial-registro-cabecera">
                  <span className="historial-registro-fecha">{r.fecha}</span>
                  <span className="historial-registro-servicio">{r.servicio}</span>
                </div>
                <div className="historial-registro-detalle">
                  <div className="historial-registro-fila">
                    <span className="historial-registro-label">Veterinario:</span>
                    <span className="historial-registro-valor">{r.veterinario}</span>
                  </div>
                  <div className="historial-registro-fila">
                    <span className="historial-registro-label">Motivo:</span>
                    <span className="historial-registro-valor">{r.motivo || 'No especificado'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="historial-accion">
          <button
            className="historial-boton"
            onClick={() => navigate('/informacion-mascota')}
          >
            Volver a Información
          </button>
        </div>
      </div>
    </div>
  );
}

export default HistorialMedico;
