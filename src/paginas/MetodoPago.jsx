import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../estilos/metodoPago.css';

function MetodoPago() {
  const navigate = useNavigate();

  const handlePagar = (e) => {
    e.preventDefault();

    const form = e.target;
    const titular = form.titular.value.trim();
    const numero = form.numero.value.trim();
    const fecha = form.fecha.value.trim();
    const cvv = form.cvv.value.trim();

    if (!titular || !numero || !fecha || !cvv) {
      Swal.fire({
        icon: 'warning',
        title: 'Complete todos los campos',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Pago realizado correctamente',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      navigate('/pago-exitoso');
    });
  };

  return (
    <div className="metodo-pago">
      <div className="container">
        <div className="pago-header">
          <h1 className="pago-titulo">💳 Método de Pago</h1>
          <p className="pago-descripcion">
            Completa los datos para finalizar tu compra.
          </p>
          <div className="pago-linea" />
        </div>

        <div className="pago-contenido">
          <div className="pago-resumen">
            <h3 className="pago-resumen-titulo">Resumen de compra</h3>
            <ul className="pago-resumen-lista">
              <li className="pago-resumen-item">Alimento Premium</li>
              <li className="pago-resumen-item">Arena para Gatos</li>
              <li className="pago-resumen-item">Shampoo para Mascotas</li>
            </ul>
            <div className="pago-resumen-divisor" />
            <div className="pago-resumen-total">
              <span>Total</span>
              <span>S/147.90</span>
            </div>
          </div>

          <form className="pago-formulario" onSubmit={handlePagar}>
            <div className="pago-campo">
              <label className="pago-label" htmlFor="titular">Nombre del titular</label>
              <input
                id="titular"
                name="titular"
                type="text"
                className="pago-input"
                placeholder="Ingrese el nombre del titular"
              />
            </div>

            <div className="pago-campo">
              <label className="pago-label" htmlFor="numero">Número de tarjeta</label>
              <input
                id="numero"
                name="numero"
                type="text"
                className="pago-input"
                placeholder="0000 0000 0000 0000"
              />
            </div>

            <div className="pago-fila">
              <div className="pago-campo">
                <label className="pago-label" htmlFor="fecha">Fecha de vencimiento</label>
                <input
                  id="fecha"
                  name="fecha"
                  type="text"
                  className="pago-input"
                  placeholder="MM/AA"
                />
              </div>
              <div className="pago-campo">
                <label className="pago-label" htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  name="cvv"
                  type="text"
                  className="pago-input"
                  placeholder="123"
                />
              </div>
            </div>

            <button type="submit" className="pago-boton">
              Pagar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MetodoPago;
