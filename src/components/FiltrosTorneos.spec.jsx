import { fireEvent, screen } from '@testing-library/react';
import FiltrosTorneos from './FiltrosTorneos.jsx';
import { JUEGOS_PRUEBA, renderConProveedores } from '../testing/renderConProveedores.jsx';

const FILTROS = { nombre: '', juegoId: '', estado: '', fechaInicio: '', fechaFin: '' };

describe('FiltrosTorneos', () => {
  it('notifica al padre el campo y valor cuando se escribe en el buscador', () => {
    const onCambio = jasmine.createSpy('onCambio');
    renderConProveedores(<FiltrosTorneos filtros={FILTROS} juegos={JUEGOS_PRUEBA} onCambio={onCambio} />);
    fireEvent.change(screen.getByLabelText(/buscar por nombre/i), { target: { value: 'copa' } });
    expect(onCambio).toHaveBeenCalledWith('nombre', 'copa');
  });

  it('lista los juegos recibidos por props y notifica la selección', () => {
    const onCambio = jasmine.createSpy('onCambio');
    renderConProveedores(<FiltrosTorneos filtros={FILTROS} juegos={JUEGOS_PRUEBA} onCambio={onCambio} />);
    expect(screen.getByRole('option', { name: 'Rocket League' })).toBeTruthy();
    fireEvent.change(screen.getByLabelText('Juego:'), { target: { value: '4' } });
    expect(onCambio).toHaveBeenCalledWith('juegoId', '4');
  });

  it('muestra el error de fechas solo cuando existe', () => {
    const { rerender } = renderConProveedores(<FiltrosTorneos filtros={FILTROS} juegos={JUEGOS_PRUEBA} onCambio={() => {}} />);
    expect(screen.queryByRole('alert')).toBeNull();
    rerender(<FiltrosTorneos filtros={FILTROS} juegos={JUEGOS_PRUEBA} onCambio={() => {}} errorFecha="Rango inválido" />);
    expect(screen.getByRole('alert').textContent).toBe('Rango inválido');
  });
});
