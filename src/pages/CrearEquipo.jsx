import { useState } from 'react';
import FormularioEquipo from '../components/FormularioEquipo.jsx';
import { useRol } from '../context/RolContext.jsx';
import { crearEquipo, listarJuegos } from '../services/db.js';

export default function CrearEquipo() {
  const { puedeActuar } = useRol();
  const [juegos] = useState(() => listarJuegos());
  const [exito, setExito] = useState(false);

  const manejarEnvio = (datos) => {
    crearEquipo(datos);
    setExito(true);
  };

  return (
    <>
      <h2 className="mb-3">Registrar Nuevo Equipo</h2>
      {exito && (
        <div className="alert alert-success" role="status">
          ¡Equipo registrado con éxito!
        </div>
      )}
      <div className="col-lg-7 px-0">
        <FormularioEquipo juegos={juegos} puedeActuar={puedeActuar} onEnviar={manejarEnvio} />
      </div>
    </>
  );
}
