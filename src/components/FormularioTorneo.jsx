import { useState } from 'react';
import CampoFormulario from './CampoFormulario.jsx';
import { validarTorneo } from '../validators/validaciones.js';

const VALORES_NUEVO = {
  nombre: '',
  juegoId: '',
  estado: 'Inscripciones Abiertas',
  cuposMaximos: '16',
  fechaCierre: '',
  destacado: false,
  descripcion: '',
};

function valoresDesde(torneo) {
  if (!torneo) return VALORES_NUEVO;
  return {
    nombre: torneo.nombre,
    juegoId: String(torneo.juegoId),
    estado: torneo.estado,
    cuposMaximos: String(torneo.cuposMaximos),
    fechaCierre: torneo.fechaCierre,
    destacado: Boolean(torneo.destacado),
    descripcion: torneo.descripcion ?? '',
  };
}

// Formulario para crear o editar un torneo (vista de administración).
// Props: juegos, estados, torneoEditando (o null), onGuardar(datos), onCancelar()
export default function FormularioTorneo({ juegos, estados, torneoEditando = null, onGuardar, onCancelar }) {
  const [valores, setValores] = useState(() => valoresDesde(torneoEditando));
  const [errores, setErrores] = useState({});

  const cambiar = (campo) => (valor) => setValores((previos) => ({ ...previos, [campo]: valor }));

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = validarTorneo(valores);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    onGuardar({
      nombre: valores.nombre.trim(),
      juegoId: Number(valores.juegoId),
      estado: valores.estado,
      cuposMaximos: Number(valores.cuposMaximos),
      fechaCierre: valores.fechaCierre,
      destacado: valores.destacado,
      descripcion: valores.descripcion.trim(),
    });
    if (!torneoEditando) setValores(VALORES_NUEVO);
  };

  return (
    <form id="form-torneo" className="card card-esports p-4 mb-4" onSubmit={manejarEnvio} noValidate>
      <h3 className="h5 mb-3">{torneoEditando ? `Editar torneo #${torneoEditando.id}` : 'Nuevo torneo'}</h3>
      <div className="row">
        <div className="col-12 col-md-6">
          <CampoFormulario id="torneo-nombre" etiqueta="Nombre *" valor={valores.nombre} onCambio={cambiar('nombre')} error={errores.nombre} />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario
            id="torneo-juego"
            etiqueta="Juego *"
            valor={valores.juegoId}
            onCambio={cambiar('juegoId')}
            opciones={[{ valor: '', texto: '-- Selecciona un Juego --' }, ...juegos.map((j) => ({ valor: String(j.id), texto: j.nombre }))]}
            error={errores.juegoId}
          />
        </div>
        <div className="col-12 col-md-4">
          <CampoFormulario
            id="torneo-estado"
            etiqueta="Estado *"
            valor={valores.estado}
            onCambio={cambiar('estado')}
            opciones={estados.map((e) => ({ valor: e, texto: e }))}
            error={errores.estado}
          />
        </div>
        <div className="col-12 col-md-4">
          <CampoFormulario
            id="torneo-cupos"
            etiqueta="Cupos máximos *"
            tipo="number"
            valor={valores.cuposMaximos}
            onCambio={cambiar('cuposMaximos')}
            error={errores.cuposMaximos}
          />
        </div>
        <div className="col-12 col-md-4">
          <CampoFormulario
            id="torneo-fecha"
            etiqueta="Cierre de inscripciones *"
            tipo="date"
            valor={valores.fechaCierre}
            onCambio={cambiar('fechaCierre')}
            error={errores.fechaCierre}
          />
        </div>
      </div>
      <CampoFormulario
        id="torneo-descripcion"
        etiqueta="Descripción"
        tipo="textarea"
        valor={valores.descripcion}
        onCambio={cambiar('descripcion')}
      />
      <div className="form-check mb-3">
        <input
          id="torneo-destacado"
          type="checkbox"
          className="form-check-input"
          checked={valores.destacado}
          onChange={(e) => setValores((previos) => ({ ...previos, destacado: e.target.checked }))}
        />
        <label htmlFor="torneo-destacado" className="form-check-label">
          Mostrar como torneo destacado
        </label>
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-esports">
          {torneoEditando ? 'Guardar cambios' : 'Crear torneo'}
        </button>
        {torneoEditando && (
          <button type="button" className="btn btn-outline-light" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
