import { fireEvent, screen } from '@testing-library/react';
import Header from './Header.jsx';
import AvisoRol from './AvisoRol.jsx';
import { renderConProveedores } from '../testing/renderConProveedores.jsx';

describe('Header', () => {
  it('muestra los enlaces principales de navegación', () => {
    renderConProveedores(<Header />);
    ['Inicio', 'Torneos', 'Inscripción', 'Crear Equipo', 'Perfil'].forEach((texto) => {
      expect(screen.getByRole('link', { name: texto })).toBeTruthy();
    });
  });

  it('el enlace Admin solo aparece para el rol Administrador', () => {
    const { unmount } = renderConProveedores(<Header />, { rol: 'Jugador' });
    expect(screen.queryByRole('link', { name: 'Admin' })).toBeNull();
    unmount();
    renderConProveedores(<Header />, { rol: 'Administrador' });
    expect(screen.getByRole('link', { name: 'Admin' })).toBeTruthy();
  });

  it('al cambiar el selector se llama a setRol con el nuevo rol', () => {
    const setRol = jasmine.createSpy('setRol');
    renderConProveedores(<Header />, { rol: 'Visitante', setRol });
    fireEvent.change(screen.getByLabelText('Rol:'), { target: { value: 'Jugador' } });
    expect(setRol).toHaveBeenCalledWith('Jugador');
  });
});

describe('AvisoRol', () => {
  it('se muestra únicamente para el rol Visitante', () => {
    const { unmount } = renderConProveedores(<AvisoRol />, { rol: 'Visitante' });
    expect(screen.getByRole('alert').textContent).toContain('Visitante');
    unmount();
    renderConProveedores(<AvisoRol />, { rol: 'Jugador' });
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
