import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../estilos/misCitas.css';

function MisCitas() {
  const navigate = useNavigate();
  const [citas, setCitas] = useState(
    () => JSON.parse(localStorage.getItem('citas') || '[]')
  );

  const handleModificar = (cita) => {
    sessionStorage.setItem('cita-modificar', JSON.stringify(cita));
    navigate('/modificar-cita');
  };

  const handleCancelar = (cita) => {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea cancelar esta cita?',
      text: 'Esta acción eliminará la cita programada.',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      confirmButtonColor: '#d33',
      cancelButtonText: 'No',
      cancelButtonColor: '#159CB3'
    }).then((result) => {
      if (result.isConfirmed) {
        const actuales = JSON.parse(localStorage.getItem('citas') || '[]');
        const filtradas = actuales.filter((c) => c.id !== cita.id);
        localStorage.setItem('citas', JSON.stringify(filtradas));
        setCitas(filtradas);

        Swal.fire({
          icon: 'success',
          title: 'Cita cancelada correctamente.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  return (
    <div className="mis-citas">
      <div className="container">
        <div className="citas-header">
          <h1 className="citas-titulo">📅 Mis Citas</h1>
          <p className="citas-descripcion">
            Aquí podrás visualizar las citas veterinarias programadas para tus mascotas.
          </p>
          <div className="citas-linea" />
        </div>

        {citas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📅</div>
            <p style={{ fontSize: '1.1rem', color: '#888', marginBottom: '24px' }}>
              No tienes citas programadas.
            </p>
            <button
              className="citas-boton"
              onClick={() => navigate('/agendar-cita')}
            >
              Agendar Nueva Cita
            </button>
          </div>
        ) : (
          <>
            <div className="citas-lista">
              {citas.map((cita) => (
                <div key={cita.id} className="cita-tarjeta">
                  <img
                    className="cita-imagen"
                    src={cita.mascotaImagen || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&q=80'}
                    alt={cita.mascota}
                  />
                  <div className="cita-info">
                    <h3 className="cita-mascota">{cita.mascota}</h3>
                    <p className="cita-detalle">
                      <span className="cita-label">Servicio:</span> {cita.servicio}
                    </p>
                    <p className="cita-detalle">
                      <span className="cita-label">Veterinario:</span> {cita.veterinario}
                    </p>
                    <p className="cita-detalle">
                      <span className="cita-label">Fecha:</span> {cita.fecha} - {cita.hora}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    <div className={`cita-estado cita-estado--${cita.estado.toLowerCase()}`}>
                      {cita.estado}
                    </div>
                    <button
                      onClick={() => handleModificar(cita)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#159CB3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#0D7D91'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#159CB3'}
                    >
                      Modificar Cita
                    </button>
                    <button
                      onClick={() => handleCancelar(cita)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#fff',
                        color: '#d33',
                        border: '1px solid #d33',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease, color 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#d33';
                        e.target.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#fff';
                        e.target.style.color = '#d33';
                      }}
                    >
                      Cancelar Cita
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="citas-accion">
              <button
                className="citas-boton"
                onClick={() => navigate('/agendar-cita')}
              >
                Agendar Nueva Cita
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MisCitas;
