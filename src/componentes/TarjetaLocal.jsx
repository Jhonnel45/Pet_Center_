import '../estilos/tarjetas.css';

function TarjetaLocal({ imagen, nombre, direccion, telefono, horario }) {
  return (
    <div className="tarjeta">
      <img className="tarjeta-imagen" src={imagen} alt={nombre} />
      <div className="tarjeta-cuerpo">
        <h3 className="tarjeta-titulo">{nombre}</h3>
        {direccion && <p className="tarjeta-info">📍 {direccion}</p>}
        {telefono && <p className="tarjeta-info">📞 {telefono}</p>}
        {horario && <p className="tarjeta-info">🕒 {horario}</p>}
      </div>
    </div>
  );
}

export default TarjetaLocal;
