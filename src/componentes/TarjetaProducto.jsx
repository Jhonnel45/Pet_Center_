import '../estilos/tarjetas.css';

function TarjetaProducto({ imagen, titulo, descripcion, precio, boton }) {
  return (
    <div className="tarjeta">
      <img className="tarjeta-imagen" src={imagen} alt={titulo} />
      <div className="tarjeta-cuerpo">
        <h3 className="tarjeta-titulo">{titulo}</h3>
        {precio && <p className="tarjeta-precio">{precio}</p>}
        {descripcion && (
          <p className="producto-descripcion">{descripcion}</p>
        )}
        {boton && boton}
      </div>
    </div>
  );
}

export default TarjetaProducto;
