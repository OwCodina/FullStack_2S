// Base de datos simulada con persistencia en localStorage.
// Expone funciones CRUD que los componentes React consumen.
import { DATOS_INICIALES } from '../data/datos.js';

export const CLAVE_BD = 'esports-arena-bd-v1';

const clonar = (obj) => JSON.parse(JSON.stringify(obj));

function crearBDInicial() {
  return { ...clonar(DATOS_INICIALES), inscripciones: [], equipos: [] };
}

export function guardarBD(bd) {
  try {
    localStorage.setItem(CLAVE_BD, JSON.stringify(bd));
  } catch {
    // Almacenamiento no disponible: la app sigue funcionando sin persistir.
  }
}

export function cargarBD() {
  try {
    const crudo = localStorage.getItem(CLAVE_BD);
    if (crudo) return JSON.parse(crudo);
  } catch {
    // JSON corrupto o acceso bloqueado: se vuelve a los datos iniciales.
  }
  const inicial = crearBDInicial();
  guardarBD(inicial);
  return inicial;
}

export function reiniciarBD() {
  const inicial = crearBDInicial();
  guardarBD(inicial);
  return inicial;
}

const siguienteId = (lista) => lista.reduce((max, item) => Math.max(max, item.id), 0) + 1;

// ---------- Lecturas generales ----------
export const listarJuegos = () => cargarBD().juegos;
export const listarRanking = () => cargarBD().ranking;

// ---------- CRUD de torneos ----------
export const listarTorneos = () => cargarBD().torneos;

export const obtenerTorneo = (id) => cargarBD().torneos.find((t) => t.id === Number(id)) ?? null;

export function crearTorneo(datos) {
  const bd = cargarBD();
  const id = siguienteId(bd.torneos);
  const juego = bd.juegos.find((j) => j.id === Number(datos.juegoId));
  const nuevo = {
    destacado: false,
    cuposOcupados: 0,
    descripcion: '',
    imagenes: [
      `https://picsum.photos/400/250?random=${id * 2 - 1}`,
      `https://picsum.photos/400/250?random=${id * 2}`,
    ],
    premios: [],
    calendario: [],
    llaves: [],
    ...datos,
    id,
    juegoId: Number(datos.juegoId),
    juegoNombre: juego ? juego.nombre : '',
  };
  bd.torneos.push(nuevo);
  guardarBD(bd);
  return nuevo;
}

export function actualizarTorneo(id, cambios) {
  const bd = cargarBD();
  const indice = bd.torneos.findIndex((t) => t.id === Number(id));
  if (indice === -1) return null;

  const actualizado = { ...bd.torneos[indice], ...cambios, id: bd.torneos[indice].id };
  if (cambios.juegoId !== undefined) {
    actualizado.juegoId = Number(cambios.juegoId);
    const juego = bd.juegos.find((j) => j.id === actualizado.juegoId);
    actualizado.juegoNombre = juego ? juego.nombre : '';
  }
  bd.torneos[indice] = actualizado;
  guardarBD(bd);
  return actualizado;
}

export function eliminarTorneo(id) {
  const bd = cargarBD();
  const cantidadAntes = bd.torneos.length;
  bd.torneos = bd.torneos.filter((t) => t.id !== Number(id));
  if (bd.torneos.length === cantidadAntes) return false;
  guardarBD(bd);
  return true;
}

// ---------- Inscripciones ----------
export const listarInscripciones = () => cargarBD().inscripciones;

export function crearInscripcion({ torneoId, correo, edad }) {
  const bd = cargarBD();
  const nueva = {
    id: siguienteId(bd.inscripciones),
    torneoId: Number(torneoId),
    correo,
    edad: Number(edad),
    fecha: new Date().toISOString(),
  };
  bd.inscripciones.push(nueva);
  guardarBD(bd);
  return nueva;
}

// ---------- Equipos ----------
export const listarEquipos = () => cargarBD().equipos;

export function crearEquipo({ juegoId, nombre, integrantes, pin }) {
  const bd = cargarBD();
  const nuevo = {
    id: siguienteId(bd.equipos),
    juegoId: Number(juegoId),
    nombre,
    integrantes: Number(integrantes),
    pin,
  };
  bd.equipos.push(nuevo);
  guardarBD(bd);
  return nuevo;
}
