import '../estilos/botonPrincipal.css';

function BotonPrincipal({ texto, onClick, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      className={`btn-principal ${className}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
}

export default BotonPrincipal;
