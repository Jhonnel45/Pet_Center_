import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../estilos/registrarMascota.css';

function RegistrarMascota() {
  const navigate = useNavigate();

  const handleRegistrar = (e) => {
    e.preventDefault();

    const form = e.target;
    const nombre = form.nombre.value.trim();
    const tipo = form.tipo.value;
    const raza = form.raza.value.trim();
    const edad = form.edad.value.trim();
    const sexo = form.sexo.value;
    const peso = form.peso.value.trim();
    const color = form.color.value.trim();

    if (!nombre || !tipo || !raza || !edad || !sexo || !peso || !color) {
      Swal.fire({
        icon: 'warning',
        title: 'Complete todos los campos',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    const mascota = {
      id: Date.now(),
      nombre,
      tipo,
      raza,
      edad,
      sexo,
      peso,
      color,
      imagen: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80'
    };

    const mascotas = JSON.parse(localStorage.getItem('mascotas') || '[]');
    mascotas.push(mascota);
    localStorage.setItem('mascotas', JSON.stringify(mascotas));

    Swal.fire({
      icon: 'success',
      title: 'Mascota registrada correctamente.',
      text: 'Será dirigido a la información de la mascota.',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/informacion-mascota');
      }
    });
  };

  return (
    <div className="registrar-mascota">
      <div className="container">
        <div className="registrar-header">
          <h1 className="registrar-titulo">🐶 Registrar Mascota</h1>
          <p className="registrar-descripcion">
            Completa los datos de tu mascota para mantener un mejor control de su información.
          </p>
          <div className="registrar-linea" />
        </div>

        <form className="registrar-formulario" onSubmit={handleRegistrar}>
          <div className="registrar-campo">
            <label className="registrar-label" htmlFor="nombre">Nombre de la mascota</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              className="registrar-input"
              placeholder="Ingrese el nombre"
            />
          </div>

          <div className="registrar-campo">
            <label className="registrar-label" htmlFor="tipo">Tipo de mascota</label>
            <select id="tipo" name="tipo" className="registrar-select" defaultValue="">
              <option value="" disabled>Seleccione un tipo</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="registrar-fila">
            <div className="registrar-campo">
              <label className="registrar-label" htmlFor="raza">Raza</label>
              <input
                id="raza"
                name="raza"
                type="text"
                className="registrar-input"
                placeholder="Ej: Labrador"
              />
            </div>
            <div className="registrar-campo">
              <label className="registrar-label" htmlFor="edad">Edad</label>
              <input
                id="edad"
                name="edad"
                type="text"
                className="registrar-input"
                placeholder="Ej: 3 años"
              />
            </div>
          </div>

          <div className="registrar-fila">
            <div className="registrar-campo">
              <label className="registrar-label" htmlFor="sexo">Sexo</label>
              <select id="sexo" name="sexo" className="registrar-select" defaultValue="">
                <option value="" disabled>Seleccione sexo</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>
            <div className="registrar-campo">
              <label className="registrar-label" htmlFor="peso">Peso</label>
              <input
                id="peso"
                name="peso"
                type="text"
                className="registrar-input"
                placeholder="Ej: 12 kg"
              />
            </div>
          </div>

          <div className="registrar-campo">
            <label className="registrar-label" htmlFor="color">Color</label>
            <input
              id="color"
              name="color"
              type="text"
              className="registrar-input"
              placeholder="Ej: Marrón claro"
            />
          </div>

          <button type="submit" className="registrar-boton">
            Registrar Mascota
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrarMascota;
