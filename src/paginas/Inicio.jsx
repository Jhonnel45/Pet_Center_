import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { productos } from '../datos/productos';
import { testimonios } from '../datos/testimonios';
import { locales } from '../datos/local';
import TarjetaProducto from '../componentes/TarjetaProducto';
import TarjetaTestimonio from '../componentes/TarjetaTestimonio';
import TarjetaLocal from '../componentes/TarjetaLocal';
import BotonPrincipal from '../componentes/BotonPrincipal';
import '../estilos/inicio.css';
import banner from "../assets/imagenes/banners/banner.png";

function Inicio() {
  const navigate = useNavigate();

  const agregarAlCarrito = (producto) => {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe iniciar sesión',
        text: 'Inicie sesión para agregar productos al carrito.',
        confirmButtonText: 'Ir a iniciar sesión'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/iniciar-sesion');
        }
      });
      return;
    }

    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const existe = carrito.some((item) => item.id === producto.id);

    if (!existe) {
      carrito.push({
        id: producto.id,
        titulo: producto.titulo,
        precio: producto.precio,
        imagen: producto.imagen
      });
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    Swal.fire({
      icon: 'success',
      title: 'Producto agregado correctamente.',
      text: 'Seleccione una opción.',
      confirmButtonText: 'Ir al carrito',
      cancelButtonText: 'Seguir comprando',
      showCancelButton: true,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/mi-carrito');
      }
    });
  };

  return (
    <div className="inicio">

      <section className="banner">
        <div className="container">
          <img
            className="banner-imagen"
            src={banner}
            alt="Banner Pet Center"
          />
        </div>
      </section>

      <section className="seccion-productos">
        <div className="container">
          <div className="productos-header">
            <h2 className="titulo-seccion">Busca tus marcas y productos favoritos</h2>
            <div className="productos-linea">
            </div>
          </div>
          <div className="productos-lista">
            {productos.slice(0, 3).map((producto) => (
              <TarjetaProducto
                key={producto.id}
                imagen={producto.imagen}
                titulo={producto.titulo}
                descripcion={producto.descripcion}
                precio={producto.precio}
                boton={
                  <BotonPrincipal
                    texto="Agregar"
                    className="btn-agregar"
                    onClick={() => agregarAlCarrito(producto)}
                  />
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="seccion-resenas">
        <div className="container">
          <h2 className="titulo-seccion">Reseña de Nuestros Clientes</h2>
          <div className="resenas-grid">
            {testimonios.map((testimonio) => (
              <TarjetaTestimonio
                key={testimonio.id}
                imagen={testimonio.imagen}
                nombre={testimonio.nombre}
                texto={testimonio.texto}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="seccion-localidades">
        <div className="container">
          <h2 className="titulo-seccion">Localidades</h2>
          <div className="localidades-grid">
            {locales.map((local) => (
              <TarjetaLocal
                key={local.id}
                imagen={local.imagen}
                nombre={local.nombre}
                telefono={local.telefono}
                horario={local.horario}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Inicio;
