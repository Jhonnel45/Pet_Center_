import atencionMedica from '../assets/imagenes/servicios/atencion-medica.jpg';
import peluqueria from '../assets/imagenes/servicios/peluqueria.jpg';
import rayosX from '../assets/imagenes/servicios/rayos-x.jpg';
import desparasitacion from '../assets/imagenes/servicios/desparasitacion.jpg';
import cirugia from '../assets/imagenes/servicios/cirugia.jpg';

export const servicios = [
  {
    id: 1,
    imagen: atencionMedica,
    titulo: 'ATENCIÓN MÉDICA',
    descripcion: 'Consultas generales, chequeos de salud, vacunas y diagnósticos iniciales para las mascotas.'
  },
  {
    id: 2,
    imagen: peluqueria,
    titulo: 'PELUQUERÍA',
    descripcion: 'Servicio de baño, corte de pelo, secado y cuidado estético para mantener la higiene del animal.'
  },
  {
    id: 3,
    imagen: rayosX,
    titulo: 'RAYOS X',
    descripcion: 'Radiografías y diagnóstico por imágenes para detectar fracturas, problemas internos o cuerpos extraños.'
  },
  {
    id: 4,
    imagen: desparasitacion,
    titulo: 'DESPARASITACIÓN',
    descripcion: 'Elimina parásitos internos y externos para proteger la salud y el bienestar de la mascota.'
  },
  {
    id: 5,
    imagen: cirugia,
    titulo: 'CIRUGÍA',
    descripcion: 'Intervenciones quirúrgicas programadas o de emergencia en un entorno estéril y seguro.'
  }
];
