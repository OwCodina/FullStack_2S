import { useState } from 'react';
import CampoFormulario from './CampoFormulario.jsx';
import { validarEquipo } from '../validators/validaciones.js';

const VALORES_INICIALES = { juegoId: '', nombre: '', integrantes: '', pin: '' };

// Props: juegos, puedeActuar, onEnviar(datos)
export default function FormularioEquipo({ juegos, puedeActuar, onEnviar }) {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});

  const cambiar = (campo) => (valor) => setValores((previos) => ({ ...previos, [campo]: valor }));

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!puedeActuar) return;

    const nuevosErrores = validarEquipo(valores, juegos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    onEnviar({
      juegoId: Number(valores.juegoId),
      nombre: valores.nombre.trim(),
      integrantes: Number(valores.integrantes),
      pin: valores.pin,
    });
    setValores(VALORES_INICIALES);
  };

  const opcionesJuego = [
    { valor: '', texto: 'Selecciona un Juego' },
    ...juegos.map((j) => ({ valor: String(j.id), texto: `${j.nombre} (Mínimo ${j.minIntegrantes} jugadores)` })),
  ];

  return (
    <form id="form-equipo" className="formulario card card-esports p-4" onSubmit={manejarEnvio} noValidate>
      <CampoFormulario
        id="select-juego-equipo"
        etiqueta="Juego Principal *"
        valor={valores.juegoId}
        onCambio={cambiar('juegoId')}
        opciones={opcionesJuego}
        error={errores.juegoId}
      />
      <CampoFormulario
        id="input-nombre-equipo"
        etiqueta="Nombre del Equipo *"
        valor={valores.nombre}
        onCambio={cambiar('nombre')}
        placeholder="Ej: Dragon Knights"
        error={errores.nombre}
      />
      <CampoFormulario
        id="input-integrantes"
        etiqueta="Cantidad de Integrantes *"
        tipo="number"
        valor={valores.integrantes}
        onCambio={cambiar('integrantes')}
        placeholder="Número de jugadores"
        error={errores.integrantes}
      />
      <CampoFormulario
        id="input-pin"
        etiqueta="PIN de Seguridad del Equipo *"
        tipo="password"
        valor={valores.pin}
        onCambio={cambiar('pin')}
        placeholder="Mínimo 6 caracteres"
        error={errores.pin}
      />
      {puedeActuar && (
        <button type="submit" className="btn btn-esports">
          Registrar Equipo
        </button>
      )}
    </form>
  );
}
