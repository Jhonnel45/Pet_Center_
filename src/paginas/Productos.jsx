import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { productos } from '../datos/productos';
import TarjetaProducto from '../componentes/TarjetaProducto';
import BotonPrincipal from '../componentes/BotonPrincipal';
import '../estilos/productos.css';

function Productos() {
  const navigate = useNavigate();

  const agregarAlCarrito = (producto) => {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe iniciar sesión',
        text: 'Inicie sesión para agregar productos al carrito.',
        confirmButtonText: 'Ir a iniciar sesión',
        customClass: { popup: 'swal-producto' }
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
      reverseButtons: true,
      customClass: { popup: 'swal-producto' }
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/mi-carrito');
      }
    });
  };

  return (
    <div className="productos-page">
      <div className="container">
        <div className="productos-header">
          <h1 className="productos-titulo">Busca tus marcas y productos favoritos</h1>
          <div className="productos-linea">
          </div>
        </div>
        <div className="productos-grid-completo">
          {productos.map((producto) => (
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
    </div>
  );
}

export default Productos;
