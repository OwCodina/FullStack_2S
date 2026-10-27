// Utilidades de prueba: renderiza con Router y contexto de rol controlado.
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RolContext } from '../context/RolContext.jsx';

export function renderConProveedores(ui, { rol = 'Jugador', setRol = () => {}, ruta = '/' } = {}) {
  const valor = { rol, setRol, puedeActuar: rol !== 'Visitante' };
  return render(
    <RolContext.Provider value={valor}>
      <MemoryRouter initialEntries={[ruta]}>{ui}</MemoryRouter>
    </RolContext.Provider>,
  );
}

export const JUEGOS_PRUEBA = [
  { id: 1, nombre: 'League of Legends', minIntegrantes: 5 },
  { id: 4, nombre: 'Rocket League', minIntegrantes: 3 },
];

export const TORNEO_PRUEBA = {
  id: 1,
  nombre: 'Copa de Prueba',
  juegoId: 1,
  juegoNombre: 'League of Legends',
  estado: 'Inscripciones Abiertas',
  destacado: true,
  cuposMaximos: 16,
  cuposOcupados: 12,
  fechaCierre: '2026-09-30',
  descripcion: 'Torneo usado en pruebas.',
  imagenes: ['https://picsum.photos/400/250?random=1', 'https://picsum.photos/400/250?random=2'],
  premios: ['1er Lugar: $1,500 USD'],
  calendario: [{ ronda: 'Final', partido: 'A vs B', fecha: '2026-10-05' }],
  llaves: ['Llave Superior'],
};
