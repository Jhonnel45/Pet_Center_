import { BrowserRouter } from 'react-router-dom';
import AppRouter from './rutas/AppRouter';
import BarraNavegacion from './componentes/BarraNavegacion';
import PiePagina from './componentes/PiePagina';

function App() {
  return (
    <BrowserRouter>
      <BarraNavegacion />
      <main className="contenido-principal">
        <AppRouter />
      </main>
      <PiePagina />
    </BrowserRouter>
  );
}

export default App;
