import { useState } from 'react';
import FormularioTorneo from '../components/FormularioTorneo.jsx';
import { useRol } from '../context/RolContext.jsx';
import { ESTADOS_TORNEO } from '../data/datos.js';
import {
  actualizarTorneo,
  crearTorneo,
  eliminarTorneo,
  listarEquipos,
  listarInscripciones,
  listarJuegos,
  listarTorneos,
} from '../services/db.js';

// Vista de administración: demuestra el CRUD completo de torneos sobre la BD simulada.
export default function AdminTorneos() {
  const { rol } = useRol();
  const [juegos] = useState(() => listarJuegos());
  const [torneos, setTorneos] = useState(() => listarTorneos());
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  if (rol !== 'Administrador') {
    return (
      <div className="alert alert-warning" role="alert">
        Acceso restringido. Selecciona el rol 'Administrador' en el selector superior para ver este panel.
      </div>
    );
  }

  const refrescar = () => setTorneos(listarTorneos());

  const guardar = (datos) => {
    if (editando) {
      actualizarTorneo(editando.id, datos);
      setMensaje('Torneo actualizado correctamente.');
      setEditando(null);
    } else {
      crearTorneo(datos);
      setMensaje('Torneo creado correctamente.');
    }
    refrescar();
  };

  const eliminar = (torneo) => {
    if (!window.confirm(`¿Eliminar el torneo "${torneo.nombre}"?`)) return;
    eliminarTorneo(torneo.id);
    if (editando?.id === torneo.id) setEditando(null);
    setMensaje('Torneo eliminado.');
    refrescar();
  };

  return (
    <>
      <h2 className="mb-3">Panel de Administración</h2>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card card-esports text-center p-3">
            <div className="display-6">{torneos.length}</div>
            <div>Torneos</div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card card-esports text-center p-3">
            <div className="display-6">{listarInscripciones().length}</div>
            <div>Inscripciones</div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card card-esports text-center p-3">
            <div className="display-6">{listarEquipos().length}</div>
            <div>Equipos</div>
          </div>
        </div>
      </div>

      {mensaje && (
        <div className="alert alert-success" role="status">
          {mensaje}
        </div>
      )}

      <FormularioTorneo
        key={editando ? editando.id : 'nuevo'}
        juegos={juegos}
        estados={ESTADOS_TORNEO}
        torneoEditando={editando}
        onGuardar={guardar}
        onCancelar={() => setEditando(null)}
      />

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Juego</th>
              <th scope="col">Estado</th>
              <th scope="col">Cupos</th>
              <th scope="col">Cierre</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {torneos.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.nombre}</td>
                <td>{t.juegoNombre}</td>
                <td>{t.estado}</td>
                <td>
                  {t.cuposOcupados}/{t.cuposMaximos}
                </td>
                <td>{t.fechaCierre}</td>
                <td className="text-nowrap">
                  <button type="button" className="btn btn-sm btn-outline-info me-2" onClick={() => setEditando(t)}>
                    Editar
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => eliminar(t)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
