import { useNavigate } from 'react-router-dom';
import '../estilos/pagoExitoso.css';

function PagoExitoso() {
  const navigate = useNavigate();

  const fecha = new Date().toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="pago-exitoso">
      <div className="container">
        <div className="exitoso-contenido">
          <div className="exitoso-icono">
            <span className="exitoso-check">&#10003;</span>
          </div>

          <h1 className="exitoso-titulo">Pago realizado correctamente</h1>
          <p className="exitoso-mensaje">
            Gracias por confiar en Pet Center.<br />
            Tu compra ha sido registrada exitosamente.
          </p>

          <div className="exitoso-tarjeta">
            <div className="exitoso-fila">
              <span className="exitoso-etiqueta">Número de pedido:</span>
              <span className="exitoso-valor">#PC-0001</span>
            </div>
            <div className="exitoso-divisor" />
            <div className="exitoso-fila">
              <span className="exitoso-etiqueta">Total pagado:</span>
              <span className="exitoso-valor">S/147.90</span>
            </div>
            <div className="exitoso-divisor" />
            <div className="exitoso-fila">
              <span className="exitoso-etiqueta">Método de pago:</span>
              <span className="exitoso-valor">Tarjeta de crédito</span>
            </div>
            <div className="exitoso-divisor" />
            <div className="exitoso-fila">
              <span className="exitoso-etiqueta">Fecha:</span>
              <span className="exitoso-valor">{fecha}</span>
            </div>
          </div>

          <div className="exitoso-botones">
            <button
              className="exitoso-btn exitoso-btn-primario"
              onClick={() => navigate('/')}
            >
              Volver al Inicio
            </button>
            <button
              className="exitoso-btn exitoso-btn-secundario"
              onClick={() => navigate('/productos')}
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagoExitoso;
