import { screen } from '@testing-library/react';
import TarjetaTorneo from './TarjetaTorneo.jsx';
import { TORNEO_PRUEBA, renderConProveedores } from '../testing/renderConProveedores.jsx';

describe('TarjetaTorneo', () => {
  it('renderiza nombre, juego, estado, cupos y cierre recibidos por props', () => {
    renderConProveedores(<TarjetaTorneo torneo={TORNEO_PRUEBA} />);
    expect(screen.getByRole('heading', { name: 'Copa de Prueba' })).toBeTruthy();
    expect(screen.getByText('League of Legends')).toBeTruthy();
    expect(screen.getByText('Inscripciones Abiertas')).toBeTruthy();
    expect(screen.getByText('12/16')).toBeTruthy();
    expect(screen.getByText('2026-09-30')).toBeTruthy();
  });

  it('el enlace "Ver Detalle" apunta a la ruta del torneo', () => {
    renderConProveedores(<TarjetaTorneo torneo={TORNEO_PRUEBA} />);
    expect(screen.getByRole('link', { name: /ver detalle/i }).getAttribute('href')).toBe('/torneos/1');
  });

  it('en modo compacto oculta cupos y fecha de cierre (renderizado condicional)', () => {
    renderConProveedores(<TarjetaTorneo torneo={TORNEO_PRUEBA} compacta />);
    expect(screen.queryByText(/cupos/i)).toBeNull();
    expect(screen.queryByText(/cierre/i)).toBeNull();
  });
});
