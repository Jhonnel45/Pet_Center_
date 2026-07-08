import { useNavigate } from 'react-router-dom';
import '../estilos/pagoExitoso.css';

function CitaModificada() {
  const navigate = useNavigate();

  return (
    <div className="pago-exitoso">
      <div className="container">
        <div className="exitoso-contenido">
          <div className="exitoso-icono">
            <span className="exitoso-check">&#10003;</span>
          </div>

          <h1 className="exitoso-titulo">¡CITA MODIFICADA CON ÉXITO!</h1>
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

export default CitaModificada;
