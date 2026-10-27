import { useState } from 'react';
import { useRol } from '../context/RolContext.jsx';
import { listarEquipos, listarInscripciones, listarTorneos } from '../services/db.js';

export default function Perfil() {
  const { rol } = useRol();
  const [inscripciones] = useState(() => listarInscripciones());
  const [equipos] = useState(() => listarEquipos());
  const [torneos] = useState(() => listarTorneos());

  const nombreTorneo = (id) => torneos.find((t) => t.id === id)?.nombre ?? 'Torneo eliminado';

  return (
    <>
      <h2 className="mb-3">Perfil de Competidor</h2>
      <div className="card card-esports mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="perfil-avatar" aria-hidden="true">
              👤
            </div>
            <div>
              <h3 className="h5 mb-1">ProGamer_2026</h3>
              <p className="mb-0">
                <strong>Rol Actual:</strong> <span id="perfil-rol-texto" className="texto-acento">{rol}</span>
              </p>
            </div>
          </div>
          <p>
            <strong>Correo Registrado:</strong> progamer@esports.com
          </p>
          <p>
            <strong>Equipo Actual:</strong> Alpha Squad
          </p>
          <p>
            <strong>Torneos Participados:</strong> 4
          </p>
          <p className="mb-0">
            <strong>Estado de Cuenta:</strong> <span className="badge badge-activo">Activo</span>
          </p>
        </div>
      </div>

      <section className="card card-esports">
        <div className="card-body">
          <h3 className="h5">Mis inscripciones</h3>
          {inscripciones.length === 0 ? (
            <p className="mb-0">Aún no tienes inscripciones registradas.</p>
          ) : (
            <ul className="mb-0">
              {inscripciones.map((i) => (
                <li key={i.id}>
                  {nombreTorneo(i.torneoId)} &mdash; {i.correo}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 mb-0">
            <strong>Equipos registrados:</strong> {equipos.length}
          </p>
        </div>
      </section>
    </>
  );
}
