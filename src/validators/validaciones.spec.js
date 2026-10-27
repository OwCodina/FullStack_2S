import { validarEquipo, validarInscripcion, validarRangoFechas, validarTorneo } from './validaciones.js';

const JUEGOS = [
  { id: 1, nombre: 'League of Legends', minIntegrantes: 5 },
  { id: 4, nombre: 'Rocket League', minIntegrantes: 3 },
];

describe('validarInscripcion', () => {
  it('no devuelve errores con datos válidos', () => {
    expect(validarInscripcion({ torneoId: '1', correo: 'a@b.cl', edad: '20' })).toEqual({});
  });

  it('exige torneo, correo y edad cuando están vacíos', () => {
    const errores = validarInscripcion({ torneoId: '', correo: '', edad: '' });
    expect(errores.torneoId).toBe('Debe seleccionar un torneo de la lista.');
    expect(errores.correo).toBe('El correo electrónico es obligatorio.');
    expect(errores.edad).toBe('La edad es obligatoria.');
  });

  it('rechaza un correo con formato inválido', () => {
    const errores = validarInscripcion({ torneoId: '1', correo: 'correo-malo', edad: '20' });
    expect(errores.correo).toContain('válido');
  });

  it('rechaza edades fuera del rango 14-99', () => {
    expect(validarInscripcion({ torneoId: '1', correo: 'a@b.cl', edad: '13' }).edad).toContain('14 y 99');
    expect(validarInscripcion({ torneoId: '1', correo: 'a@b.cl', edad: '100' }).edad).toContain('14 y 99');
    expect(validarInscripcion({ torneoId: '1', correo: 'a@b.cl', edad: '14' }).edad).toBeUndefined();
  });
});

describe('validarEquipo', () => {
  it('exige el mínimo de integrantes según el juego', () => {
    const errores = validarEquipo({ juegoId: '1', nombre: 'Dragones', integrantes: '3', pin: '123456' }, JUEGOS);
    expect(errores.integrantes).toBe('Para League of Legends se exige un mínimo de 5 integrantes.');
  });

  it('acepta 3 integrantes en Rocket League', () => {
    const errores = validarEquipo({ juegoId: '4', nombre: 'Turbo', integrantes: '3', pin: '123456' }, JUEGOS);
    expect(errores).toEqual({});
  });

  it('valida largo mínimo del nombre y del PIN', () => {
    const errores = validarEquipo({ juegoId: '4', nombre: 'ab', integrantes: '3', pin: '123' }, JUEGOS);
    expect(errores.nombre).toContain('al menos 3');
    expect(errores.pin).toContain('mínimo de 6');
  });
});

describe('validarRangoFechas', () => {
  it('devuelve error si la fecha inicial es posterior a la final', () => {
    expect(validarRangoFechas('2026-10-10', '2026-10-01')).not.toBe('');
  });

  it('devuelve cadena vacía si el rango es correcto o está incompleto', () => {
    expect(validarRangoFechas('2026-10-01', '2026-10-10')).toBe('');
    expect(validarRangoFechas('2026-10-01', '')).toBe('');
  });
});

describe('validarTorneo', () => {
  it('valida cupos como entero mayor a 0', () => {
    const base = { nombre: 'Copa', juegoId: '1', estado: 'En Curso', fechaCierre: '2026-10-01' };
    expect(validarTorneo({ ...base, cuposMaximos: '0' }).cuposMaximos).toBeDefined();
    expect(validarTorneo({ ...base, cuposMaximos: '8' })).toEqual({});
  });
});
