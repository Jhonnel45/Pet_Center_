import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/miCarrito.css';

function MiCarrito() {
  const navigate = useNavigate();
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem('carrito') || '[]')
  );

  const total = items.reduce((acc, item) => {
    const precio = parseFloat(item.precio.replace('S/ ', '').replace(',', ''));
    return acc + precio;
  }, 0);

  const formatearTotal = (valor) =>
    'S/' + valor.toFixed(2);

  const handleEliminar = (id) => {
    const actualizados = items.filter((item) => item.id !== id);
    setItems(actualizados);
    localStorage.setItem('carrito', JSON.stringify(actualizados));
  };

  if (items.length === 0) {
    return (
      <div className="mi-carrito">
        <div className="container">
          <div className="carrito-header">
            <h1 className="carrito-titulo">🛒 Mi Carrito</h1>
            <p className="carrito-descripcion">
              Revisa los productos seleccionados antes de finalizar tu compra.
            </p>
            <div className="carrito-linea" />
          </div>
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: '1.1rem', color: '#888', marginBottom: '24px' }}>
              Tu carrito está vacío.
            </p>
            <button
              className="carrito-continuar"
              style={{ maxWidth: '300px', margin: '0 auto', display: 'block' }}
              onClick={() => navigate('/productos')}
            >
              Ir a Productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mi-carrito">
      <div className="container">
        <div className="carrito-header">
          <h1 className="carrito-titulo">🛒 Mi Carrito</h1>
          <p className="carrito-descripcion">
            Revisa los productos seleccionados antes de finalizar tu compra.
          </p>
          <div className="carrito-linea" />
        </div>

        <div className="carrito-lista">
          {items.map((producto) => (
            <div key={producto.id} className="carrito-item">
              <img
                className="carrito-item-imagen"
                src={producto.imagen}
                alt={producto.titulo}
              />
              <div className="carrito-item-info">
                <h3 className="carrito-item-nombre">{producto.titulo}</h3>
                <button
                  className="carrito-item-eliminar"
                  onClick={() => handleEliminar(producto.id)}
                >
                  Eliminar
                </button>
              </div>
              <div className="carrito-item-precio">{producto.precio}</div>
            </div>
          ))}
        </div>

        <div className="carrito-resumen">
          <div className="carrito-resumen-tarjeta">
            <div className="carrito-resumen-fila">
              <span>Subtotal</span>
              <span>{formatearTotal(total)}</span>
            </div>
            <div className="carrito-resumen-divisor" />
            <div className="carrito-resumen-fila carrito-resumen-total">
              <span>Total</span>
              <span>{formatearTotal(total)}</span>
            </div>
          </div>
          <button
            className="carrito-continuar"
            onClick={() => navigate('/metodo-pago')}
          >
            Continuar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiCarrito;
