import { screen } from '@testing-library/react';
import ListaTorneos from './ListaTorneos.jsx';
import { TORNEO_PRUEBA, renderConProveedores } from '../testing/renderConProveedores.jsx';

describe('ListaTorneos', () => {
  it('renderiza una tarjeta por cada torneo del conjunto de datos', () => {
    const torneos = [TORNEO_PRUEBA, { ...TORNEO_PRUEBA, id: 2, nombre: 'Otra Copa' }, { ...TORNEO_PRUEBA, id: 3, nombre: 'Tercera Copa' }];
    renderConProveedores(<ListaTorneos torneos={torneos} />);
    expect(screen.getAllByRole('article').length).toBe(3);
  });

  it('muestra el mensaje de estado vacío cuando no hay torneos', () => {
    renderConProveedores(<ListaTorneos torneos={[]} />);
    expect(screen.queryAllByRole('article').length).toBe(0);
    expect(screen.getByText(/no se encontraron torneos/i)).toBeTruthy();
  });
});
