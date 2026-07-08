import '../estilos/piePagina.css';

function PiePagina() {
  return (
    <footer className="footer">
      <div className="footer-contenido">
        <div className="footer-columna">
          <div className="footer-logo">
            <span className="footer-logo-icono">🐾</span>
            <span>Pet Center</span>
          </div>
          <p className="footer-lema">Cuidamos a tu mejor amigo.</p>
        </div>

        <div className="footer-columna">
          <h4 className="footer-titulo">Contacto</h4>
          <div className="footer-info">
            <p><span className="footer-info-icono">📧</span> contacto@petcenter.com</p>
            <p><span className="footer-info-icono">📞</span> (01) 234-5678</p>
            <p><span className="footer-info-icono">📍</span> Av. Primavera 1234, Lima</p>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} Pet Center. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default PiePagina;
