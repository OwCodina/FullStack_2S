import { FILTROS_INICIALES, filtrarTorneos } from './filtrosTorneos.js';

const TORNEOS = [
  { id: 1, nombre: 'Copa de Verano', juegoId: 1, estado: 'Inscripciones Abiertas', fechaCierre: '2026-09-30' },
  { id: 2, nombre: 'Valorant Series', juegoId: 2, estado: 'En Curso', fechaCierre: '2026-09-01' },
  { id: 3, nombre: 'CS2 Masters', juegoId: 3, estado: 'Inscripciones Abiertas', fechaCierre: '2026-10-15' },
];

describe('filtrarTorneos', () => {
  it('sin filtros devuelve todos los torneos', () => {
    expect(filtrarTorneos(TORNEOS, FILTROS_INICIALES).length).toBe(3);
  });

  it('filtra por nombre sin distinguir mayúsculas', () => {
    const r = filtrarTorneos(TORNEOS, { ...FILTROS_INICIALES, nombre: 'VALORANT' });
    expect(r.map((t) => t.id)).toEqual([2]);
  });

  it('combina juego y estado', () => {
    const r = filtrarTorneos(TORNEOS, { ...FILTROS_INICIALES, estado: 'Inscripciones Abiertas', juegoId: '3' });
    expect(r.map((t) => t.id)).toEqual([3]);
  });

  it('filtra por rango de fecha de cierre', () => {
    const r = filtrarTorneos(TORNEOS, { ...FILTROS_INICIALES, fechaInicio: '2026-09-15', fechaFin: '2026-10-31' });
    expect(r.map((t) => t.id)).toEqual([1, 3]);
  });
});
