import '../estilos/tarjetas.css';

function TarjetaDoctor({ imagen, nombre, especialidad, descripcion }) {
  return (
    <div className="tarjeta">
      <img className="tarjeta-imagen" src={imagen} alt={nombre} />
      <div className="tarjeta-cuerpo">
        <h3 className="tarjeta-titulo">{nombre}</h3>
        {especialidad && <p className="tarjeta-subtitulo">{especialidad}</p>}
        <p className="tarjeta-descripcion">{descripcion}</p>
      </div>
    </div>
  );
}

export default TarjetaDoctor;
