import { fireEvent, screen } from '@testing-library/react';
import FormularioEquipo from './FormularioEquipo.jsx';
import { JUEGOS_PRUEBA, renderConProveedores } from '../testing/renderConProveedores.jsx';

describe('FormularioEquipo', () => {
  it('exige el mínimo de integrantes según el juego seleccionado', () => {
    renderConProveedores(<FormularioEquipo juegos={JUEGOS_PRUEBA} puedeActuar onEnviar={() => {}} />);
    fireEvent.change(screen.getByLabelText(/juego principal/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/nombre del equipo/i), { target: { value: 'Dragones' } });
    fireEvent.change(screen.getByLabelText(/cantidad de integrantes/i), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText(/pin de seguridad/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /registrar equipo/i }));
    expect(screen.getByText('Para League of Legends se exige un mínimo de 5 integrantes.')).toBeTruthy();
  });

  it('envía los datos del equipo cuando todo es válido', () => {
    const onEnviar = jasmine.createSpy('onEnviar');
    renderConProveedores(<FormularioEquipo juegos={JUEGOS_PRUEBA} puedeActuar onEnviar={onEnviar} />);
    fireEvent.change(screen.getByLabelText(/juego principal/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/nombre del equipo/i), { target: { value: 'Turbo FC' } });
    fireEvent.change(screen.getByLabelText(/cantidad de integrantes/i), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText(/pin de seguridad/i), { target: { value: 'abcdef' } });
    fireEvent.click(screen.getByRole('button', { name: /registrar equipo/i }));
    expect(onEnviar).toHaveBeenCalledWith({ juegoId: 4, nombre: 'Turbo FC', integrantes: 3, pin: 'abcdef' });
  });
});
