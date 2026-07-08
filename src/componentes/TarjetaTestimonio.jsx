import '../estilos/tarjetas.css';

function TarjetaTestimonio({ imagen, nombre, texto }) {
  return (
    <div className="tarjeta tarjeta-testimonio">
      <div className="tarjeta-cuerpo">
        {imagen && <img className="tarjeta-avatar" src={imagen} alt={nombre} />}
        <p className="tarjeta-texto">{texto}</p>
        <p className="tarjeta-autor">{nombre}</p>
      </div>
    </div>
  );
}

export default TarjetaTestimonio;
