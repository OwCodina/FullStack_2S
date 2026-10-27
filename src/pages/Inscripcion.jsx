import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FormularioInscripcion from '../components/FormularioInscripcion.jsx';
import { useRol } from '../context/RolContext.jsx';
import { crearInscripcion, listarTorneos } from '../services/db.js';

export default function Inscripcion() {
  const { puedeActuar } = useRol();
  const [parametros] = useSearchParams();
  const [torneos] = useState(() => listarTorneos());
  const [exito, setExito] = useState(false);

  const manejarEnvio = (datos) => {
    crearInscripcion(datos);
    setExito(true);
  };

  return (
    <>
      <h2 className="mb-3">Inscripción a Torneo</h2>
      {exito && (
        <div className="alert alert-success" role="status">
          ¡Inscripción realizada exitosamente!
        </div>
      )}
      <div className="col-lg-7 px-0">
        <FormularioInscripcion
          torneos={torneos}
          torneoInicial={parametros.get('torneo') ?? ''}
          puedeActuar={puedeActuar}
          onEnviar={manejarEnvio}
        />
      </div>
    </>
  );
}
