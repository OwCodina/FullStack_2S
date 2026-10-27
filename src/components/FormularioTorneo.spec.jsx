import { fireEvent, screen } from '@testing-library/react';
import FormularioTorneo from './FormularioTorneo.jsx';
import { JUEGOS_PRUEBA, TORNEO_PRUEBA, renderConProveedores } from '../testing/renderConProveedores.jsx';

const ESTADOS = ['Inscripciones Abiertas', 'En Curso', 'Finalizado'];

describe('FormularioTorneo (admin)', () => {
  it('en modo creación valida campos obligatorios y no llama a onGuardar', () => {
    const onGuardar = jasmine.createSpy('onGuardar');
    renderConProveedores(<FormularioTorneo juegos={JUEGOS_PRUEBA} estados={ESTADOS} onGuardar={onGuardar} />);
    fireEvent.click(screen.getByRole('button', { name: /crear torneo/i }));
    expect(screen.getByText('El nombre del torneo es obligatorio.')).toBeTruthy();
    expect(onGuardar).not.toHaveBeenCalled();
  });

  it('en modo edición precarga los valores y muestra el botón Cancelar', () => {
    renderConProveedores(
      <FormularioTorneo juegos={JUEGOS_PRUEBA} estados={ESTADOS} torneoEditando={TORNEO_PRUEBA} onGuardar={() => {}} onCancelar={() => {}} />,
    );
    expect(screen.getByLabelText(/^nombre/i).value).toBe('Copa de Prueba');
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeTruthy();
  });

  it('al guardar envía los datos convertidos a los tipos correctos', () => {
    const onGuardar = jasmine.createSpy('onGuardar');
    renderConProveedores(
      <FormularioTorneo juegos={JUEGOS_PRUEBA} estados={ESTADOS} torneoEditando={TORNEO_PRUEBA} onGuardar={onGuardar} onCancelar={() => {}} />,
    );
    fireEvent.change(screen.getByLabelText(/cupos máximos/i), { target: { value: '32' } });
    fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }));
    expect(onGuardar).toHaveBeenCalledWith(jasmine.objectContaining({ cuposMaximos: 32, juegoId: 1, nombre: 'Copa de Prueba' }));
  });
});
