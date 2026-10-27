// Lógica de validación migrada desde js/validaciones.js.
// Son funciones puras: reciben valores y devuelven un objeto { campo: mensaje }.
export const EDAD_MINIMA = 14;
export const EDAD_MAXIMA = 99;
export const PIN_MINIMO = 6;
export const NOMBRE_EQUIPO_MINIMO = 3;
export const NOMBRE_TORNEO_MINIMO = 3;

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarInscripcion({ torneoId, correo, edad }) {
  const errores = {};
  const correoLimpio = (correo ?? '').trim();

  if (!torneoId) errores.torneoId = 'Debe seleccionar un torneo de la lista.';

  if (!correoLimpio) {
    errores.correo = 'El correo electrónico es obligatorio.';
  } else if (!REGEX_EMAIL.test(correoLimpio)) {
    errores.correo = 'Ingrese un correo electrónico válido (ejemplo@dominio.com).';
  }

  const edadNumero = parseInt(edad, 10);
  if (edad === '' || edad === null || edad === undefined) {
    errores.edad = 'La edad es obligatoria.';
  } else if (Number.isNaN(edadNumero) || edadNumero < EDAD_MINIMA || edadNumero > EDAD_MAXIMA) {
    errores.edad = `La edad debe estar comprendida entre ${EDAD_MINIMA} y ${EDAD_MAXIMA} años.`;
  }

  return errores;
}

export function validarEquipo({ juegoId, nombre, integrantes, pin }, juegos) {
  const errores = {};
  const nombreLimpio = (nombre ?? '').trim();

  if (!juegoId) errores.juegoId = 'Debe seleccionar el juego principal.';

  if (!nombreLimpio) {
    errores.nombre = 'El nombre del equipo es obligatorio.';
  } else if (nombreLimpio.length < NOMBRE_EQUIPO_MINIMO) {
    errores.nombre = `El nombre del equipo debe tener al menos ${NOMBRE_EQUIPO_MINIMO} caracteres.`;
  }

  const juego = juegos.find((j) => String(j.id) === String(juegoId));
  const cantidad = parseInt(integrantes, 10);
  if (integrantes === '' || integrantes === null || integrantes === undefined) {
    errores.integrantes = 'Debe indicar la cantidad de integrantes.';
  } else if (Number.isNaN(cantidad)) {
    errores.integrantes = 'Ingrese un número válido de integrantes.';
  } else if (juego && cantidad < juego.minIntegrantes) {
    errores.integrantes = `Para ${juego.nombre} se exige un mínimo de ${juego.minIntegrantes} integrantes.`;
  }

  if (!pin) {
    errores.pin = 'El PIN de seguridad es obligatorio.';
  } else if (pin.length < PIN_MINIMO) {
    errores.pin = `El PIN de seguridad debe tener un mínimo de ${PIN_MINIMO} caracteres.`;
  }

  return errores;
}

export function validarRangoFechas(fechaInicio, fechaFin) {
  if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
    return "La fecha 'Cierre Desde' no puede ser posterior a 'Cierre Hasta'.";
  }
  return '';
}

// Validación del formulario de administración de torneos (vista nueva).
export function validarTorneo({ nombre, juegoId, estado, cuposMaximos, fechaCierre }) {
  const errores = {};
  const nombreLimpio = (nombre ?? '').trim();

  if (!nombreLimpio) {
    errores.nombre = 'El nombre del torneo es obligatorio.';
  } else if (nombreLimpio.length < NOMBRE_TORNEO_MINIMO) {
    errores.nombre = `El nombre debe tener al menos ${NOMBRE_TORNEO_MINIMO} caracteres.`;
  }

  if (!juegoId) errores.juegoId = 'Debe seleccionar un juego.';
  if (!estado) errores.estado = 'Debe seleccionar un estado.';

  const cupos = Number(cuposMaximos);
  if (cuposMaximos === '' || cuposMaximos === null || cuposMaximos === undefined) {
    errores.cuposMaximos = 'Los cupos máximos son obligatorios.';
  } else if (!Number.isInteger(cupos) || cupos < 1) {
    errores.cuposMaximos = 'Los cupos máximos deben ser un número entero mayor a 0.';
  }

  if (!fechaCierre) errores.fechaCierre = 'La fecha de cierre es obligatoria.';

  return errores;
}
