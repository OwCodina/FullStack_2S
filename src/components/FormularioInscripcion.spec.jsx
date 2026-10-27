import { fireEvent, screen } from '@testing-library/react';
import FormularioInscripcion from './FormularioInscripcion.jsx';
import { TORNEO_PRUEBA, renderConProveedores } from '../testing/renderConProveedores.jsx';

const TORNEOS = [TORNEO_PRUEBA];

describe('FormularioInscripcion', () => {
  it('actualiza el estado del campo cuando el usuario escribe', () => {
    renderConProveedores(<FormularioInscripcion torneos={TORNEOS} puedeActuar onEnviar={() => {}} />);
    const correo = screen.getByLabelText(/correo electrónico/i);
    fireEvent.change(correo, { target: { value: 'jugador@correo.cl' } });
    expect(correo.value).toBe('jugador@correo.cl');
  });

  it('muestra errores de campos obligatorios y no envía si el formulario está vacío', () => {
    const onEnviar = jasmine.createSpy('onEnviar');
    renderConProveedores(<FormularioInscripcion torneos={TORNEOS} puedeActuar onEnviar={onEnviar} />);
    fireEvent.click(screen.getByRole('button', { name: /confirmar inscripción/i }));
    expect(screen.getByText('Debe seleccionar un torneo de la lista.')).toBeTruthy();
    expect(screen.getByText('El correo electrónico es obligatorio.')).toBeTruthy();
    expect(screen.getByText('La edad es obligatoria.')).toBeTruthy();
    expect(onEnviar).not.toHaveBeenCalled();
  });

  it('muestra error de edad fuera de rango', () => {
    renderConProveedores(<FormularioInscripcion torneos={TORNEOS} puedeActuar onEnviar={() => {}} />);
    fireEvent.change(screen.getByLabelText(/edad del competidor/i), { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /confirmar inscripción/i }));
    expect(screen.getByText(/entre 14 y 99/)).toBeTruthy();
  });

  it('con datos válidos llama a onEnviar con los datos y limpia el formulario', () => {
    const onEnviar = jasmine.createSpy('onEnviar');
    renderConProveedores(<FormularioInscripcion torneos={TORNEOS} puedeActuar onEnviar={onEnviar} />);
    fireEvent.change(screen.getByLabelText(/selecciona el torneo/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'jugador@correo.cl' } });
    fireEvent.change(screen.getByLabelText(/edad del competidor/i), { target: { value: '20' } });
    fireEvent.click(screen.getByRole('button', { name: /confirmar inscripción/i }));
    expect(onEnviar).toHaveBeenCalledWith({ torneoId: 1, correo: 'jugador@correo.cl', edad: 20 });
    expect(screen.getByLabelText(/correo electrónico/i).value).toBe('');
  });

  it('oculta el botón de envío cuando el rol no puede actuar (Visitante)', () => {
    renderConProveedores(<FormularioInscripcion torneos={TORNEOS} puedeActuar={false} onEnviar={() => {}} />);
    expect(screen.queryByRole('button', { name: /confirmar inscripción/i })).toBeNull();
  });
});
