import { Routes, Route } from 'react-router-dom';

import Inicio from '../paginas/Inicio';
import Productos from '../paginas/Productos';
import Servicios from '../paginas/Servicios';
import Nosotros from '../paginas/Nosotros';
import IniciarSesion from '../paginas/IniciarSesion';
import Registro from '../paginas/Registro';
import AuthRoute from '../componentes/AuthRoute';
import MiCarrito from '../paginas/MiCarrito';
import MetodoPago from '../paginas/MetodoPago';
import PagoExitoso from '../paginas/PagoExitoso';
import MisCitas from '../paginas/MisCitas';
import AgendarCita from '../paginas/AgendarCita';
import Horarios from '../paginas/Horarios';
import CitaRegistrada from '../paginas/CitaRegistrada';
import RegistrarMascota from '../paginas/RegistrarMascota';
import InformacionMascota from '../paginas/InformacionMascota';
import HistorialMedico from '../paginas/HistorialMedico';
import ModificarCita from '../paginas/ModificarCita';
import CitaModificada from '../paginas/CitaModificada';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/iniciar-sesion" element={<IniciarSesion />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/mi-carrito" element={<AuthRoute><MiCarrito /></AuthRoute>} />
      <Route path="/metodo-pago" element={<AuthRoute><MetodoPago /></AuthRoute>} />
      <Route path="/pago-exitoso" element={<PagoExitoso />} />
      <Route path="/mis-citas" element={<MisCitas />} />
      <Route path="/agendar-cita" element={<AgendarCita />} />
      <Route path="/horarios" element={<Horarios />} />
      <Route path="/cita-registrada" element={<CitaRegistrada />} />
      <Route path="/registrar-mascota" element={<RegistrarMascota />} />
      <Route path="/informacion-mascota" element={<InformacionMascota />} />
      <Route path="/historial-medico" element={<HistorialMedico />} />
      <Route path="/modificar-cita" element={<ModificarCita />} />
      <Route path="/cita-modificada" element={<CitaModificada />} />
    </Routes>
  );
}

export default AppRouter;
