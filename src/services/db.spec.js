import {
  CLAVE_BD,
  actualizarTorneo,
  crearEquipo,
  crearInscripcion,
  crearTorneo,
  eliminarTorneo,
  listarEquipos,
  listarInscripciones,
  listarTorneos,
  obtenerTorneo,
  reiniciarBD,
} from './db.js';

describe('db (CRUD + persistencia en localStorage)', () => {
  beforeEach(() => reiniciarBD());

  it('carga los 4 torneos iniciales', () => {
    expect(listarTorneos().length).toBe(4);
  });

  it('crearTorneo agrega el registro, asigna id y nombre del juego, y lo persiste', () => {
    const nuevo = crearTorneo({ nombre: 'Copa Nueva', juegoId: 2, estado: 'En Curso', cuposMaximos: 8, fechaCierre: '2026-12-01' });
    expect(nuevo.id).toBe(5);
    expect(nuevo.juegoNombre).toBe('Valorant');
    expect(listarTorneos().length).toBe(5);
    expect(JSON.parse(localStorage.getItem(CLAVE_BD)).torneos.length).toBe(5);
  });

  it('actualizarTorneo modifica los campos indicados y devuelve null si no existe', () => {
    const actualizado = actualizarTorneo(1, { nombre: 'Nombre editado', juegoId: 4 });
    expect(actualizado.nombre).toBe('Nombre editado');
    expect(actualizado.juegoNombre).toBe('Rocket League');
    expect(obtenerTorneo(1).nombre).toBe('Nombre editado');
    expect(actualizarTorneo(999, { nombre: 'x' })).toBeNull();
  });

  it('eliminarTorneo quita el registro y devuelve false si no existe', () => {
    expect(eliminarTorneo(2)).toBeTrue();
    expect(obtenerTorneo(2)).toBeNull();
    expect(eliminarTorneo(2)).toBeFalse();
  });

  it('guarda inscripciones y equipos', () => {
    crearInscripcion({ torneoId: 1, correo: 'a@b.cl', edad: 20 });
    crearEquipo({ juegoId: 4, nombre: 'Turbo', integrantes: 3, pin: '123456' });
    expect(listarInscripciones().length).toBe(1);
    expect(listarEquipos()[0].nombre).toBe('Turbo');
  });

  it('usa localStorage.setItem al guardar (mock con spy)', () => {
    const espia = spyOn(Storage.prototype, 'setItem').and.callThrough();
    crearEquipo({ juegoId: 1, nombre: 'Dragones', integrantes: 5, pin: '123456' });
    expect(espia).toHaveBeenCalledWith(CLAVE_BD, jasmine.any(String));
  });

  it('vuelve a los datos iniciales si el JSON guardado está corrupto (mock con spy)', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('{json-invalido');
    expect(listarTorneos().length).toBe(4);
  });
});
