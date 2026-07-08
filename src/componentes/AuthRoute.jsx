import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AuthRoute({ children }) {
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario');

  if (!usuario) {
    Swal.fire({
      icon: 'warning',
      title: 'Debe iniciar sesión',
      text: 'Inicie sesión para continuar.',
      confirmButtonText: 'Ir a iniciar sesión'
    }).then(() => {
      navigate('/iniciar-sesion');
    });
    return null;
  }

  return children;
}

export default AuthRoute;
