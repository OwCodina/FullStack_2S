import { useState } from 'react';
import CampoFormulario from './CampoFormulario.jsx';
import { validarInscripcion } from '../validators/validaciones.js';

const VALORES_INICIALES = { torneoId: '', correo: '', edad: '' };

// Props: torneos, torneoInicial, puedeActuar, onEnviar(datos)
export default function FormularioInscripcion({ torneos, torneoInicial = '', puedeActuar, onEnviar }) {
  const [valores, setValores] = useState({ ...VALORES_INICIALES, torneoId: String(torneoInicial) });
  const [errores, setErrores] = useState({});

  const cambiar = (campo) => (valor) => setValores((previos) => ({ ...previos, [campo]: valor }));

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!puedeActuar) return;

    const nuevosErrores = validarInscripcion(valores);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    onEnviar({ torneoId: Number(valores.torneoId), correo: valores.correo.trim(), edad: Number(valores.edad) });
    setValores(VALORES_INICIALES);
  };

  const opcionesTorneo = [
    { valor: '', texto: '-- Selecciona un Torneo --' },
    ...torneos.map((t) => ({ valor: String(t.id), texto: t.nombre })),
  ];

  return (
    <form id="form-inscripcion" className="formulario card card-esports p-4" onSubmit={manejarEnvio} noValidate>
      <CampoFormulario
        id="select-torneo"
        etiqueta="Selecciona el Torneo *"
        valor={valores.torneoId}
        onCambio={cambiar('torneoId')}
        opciones={opcionesTorneo}
        error={errores.torneoId}
      />
      <CampoFormulario
        id="input-correo"
        etiqueta="Correo Electrónico de Contacto *"
        tipo="email"
        valor={valores.correo}
        onCambio={cambiar('correo')}
        placeholder="ejemplo@correo.com"
        error={errores.correo}
      />
      <CampoFormulario
        id="input-edad"
        etiqueta="Edad del Competidor *"
        tipo="number"
        valor={valores.edad}
        onCambio={cambiar('edad')}
        placeholder="Edad (14 - 99)"
        error={errores.edad}
      />
      {puedeActuar && (
        <button type="submit" className="btn btn-esports">
          Confirmar Inscripción
        </button>
      )}
    </form>
  );
}
