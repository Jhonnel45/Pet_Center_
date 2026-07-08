import '../estilos/tarjetas.css';

function TarjetaServicio({ imagen, titulo, descripcion, boton }) {
  return (
    <div className="tarjeta">
      <img className="tarjeta-imagen" src={imagen} alt={titulo} />
      <div className="tarjeta-cuerpo">
        <h3 className="tarjeta-titulo">{titulo}</h3>
        <p className="tarjeta-descripcion">{descripcion}</p>
        {boton && boton}
      </div>
    </div>
  );
}

export default TarjetaServicio;
