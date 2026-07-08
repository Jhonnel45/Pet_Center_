import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../estilos/informacionMascota.css';

function InformacionMascota() {
  const navigate = useNavigate();
  const [mascotas] = useState(
    () => JSON.parse(localStorage.getItem('mascotas') || '[]')
  );

  const handleVerHistorial = (id) => {
    navigate(`/historial-medico?id=${id}`);
  };

  if (mascotas.length === 0) {
    return (
      <div className="info-mascota">
        <div className="container">
          <div className="info-header">
            <h1 className="info-titulo">🐶 Información de la Mascota</h1>
            <p className="info-descripcion">
              Consulta los datos registrados de tu mascota.
            </p>
            <div className="info-linea" />
          </div>
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🐶</div>
            <p style={{ fontSize: '1.1rem', color: '#888', marginBottom: '24px' }}>
              Aún no tienes mascotas registradas.
            </p>
            <button
              className="info-btn info-btn-primario"
              style={{ display: 'inline-block' }}
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
    <div className="info-mascota">
      <div className="container">
        <div className="info-header">
          <h1 className="info-titulo">🐶 Información de la Mascota</h1>
          <p className="info-descripcion">
            Consulta los datos registrados de tu mascota.
          </p>
          <div className="info-linea" />
        </div>

        {mascotas.map((mascota) => (
          <div key={mascota.id} className="info-tarjeta">
            <img
              className="info-imagen"
              src={mascota.imagen}
              alt={mascota.nombre}
            />

            <div className="info-columnas">
              <div className="info-columna">
                <div className="info-fila">
                  <span className="info-etiqueta">Nombre:</span>
                  <span className="info-valor">{mascota.nombre}</span>
                </div>
                <div className="info-divisor" />
                <div className="info-fila">
                  <span className="info-etiqueta">Tipo:</span>
                  <span className="info-valor">{mascota.tipo}</span>
                </div>
                <div className="info-divisor" />
                <div className="info-fila">
                  <span className="info-etiqueta">Raza:</span>
                  <span className="info-valor">{mascota.raza}</span>
                </div>
                <div className="info-divisor" />
                <div className="info-fila">
                  <span className="info-etiqueta">Edad:</span>
                  <span className="info-valor">{mascota.edad}</span>
                </div>
              </div>

              <div className="info-columna">
                <div className="info-fila">
                  <span className="info-etiqueta">Sexo:</span>
                  <span className="info-valor">{mascota.sexo}</span>
                </div>
                <div className="info-divisor" />
                <div className="info-fila">
                  <span className="info-etiqueta">Peso:</span>
                  <span className="info-valor">{mascota.peso}</span>
                </div>
                <div className="info-divisor" />
                <div className="info-fila">
                  <span className="info-etiqueta">Color:</span>
                  <span className="info-valor">{mascota.color}</span>
                </div>
                <div className="info-divisor" />
                <div className="info-fila">
                  <span className="info-etiqueta">Estado:</span>
                  <span className="info-valor info-valor--activo">Activo</span>
                </div>
              </div>
            </div>

            <div className="info-botones">
              <button
                className="info-btn info-btn-primario"
                onClick={() => handleVerHistorial(mascota.id)}
              >
                Ver Historial Médico
              </button>
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '32px' }}>
          <button
            className="info-btn info-btn-secundario"
            onClick={() => navigate('/registrar-mascota')}
          >
            Registrar otra mascota
          </button>
        </div>
      </div>
    </div>
  );
}

export default InformacionMascota;
