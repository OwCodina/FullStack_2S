import { Link, useParams } from 'react-router-dom';
import DetalleTorneoInfo from '../components/DetalleTorneoInfo.jsx';
import { useRol } from '../context/RolContext.jsx';
import { obtenerTorneo } from '../services/db.js';

export default function DetalleTorneo() {
  const { id } = useParams();
  const { puedeActuar } = useRol();
  const torneo = obtenerTorneo(id);

  if (!torneo) {
    return (
      <div className="alert alert-warning" role="alert">
        El torneo solicitado no existe. <Link to="/torneos">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <>
      <DetalleTorneoInfo torneo={torneo} />
      <div className="d-flex flex-wrap gap-2">
        {puedeActuar && (
          <Link to={`/inscripcion?torneo=${torneo.id}`} className="btn btn-esports">
            Inscribirse en este Torneo
          </Link>
        )}
        <Link to="/torneos" className="btn btn-outline-light">
          Volver al Catálogo
        </Link>
      </div>
    </>
  );
}
