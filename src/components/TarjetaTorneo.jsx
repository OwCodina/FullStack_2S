import { Link } from 'react-router-dom';

// Props: torneo (objeto) y compacta (boolean). En modo compacto se ocultan cupos y cierre.
export default function TarjetaTorneo({ torneo, compacta = false }) {
  return (
    <article className="card card-esports h-100">
      <div className="card-body d-flex flex-column">
        <div className="tarjeta-imagenes d-flex gap-2 mb-3">
          <img src={torneo.imagenes[0]} alt={`Imagen 1 de ${torneo.nombre}`} />
          <img src={torneo.imagenes[1]} alt={`Imagen 2 de ${torneo.nombre}`} />
        </div>
        <h3 className="h5 card-title">{torneo.nombre}</h3>
        <p className="mb-1">
          <strong>Juego:</strong> {torneo.juegoNombre}
        </p>
        <p className="mb-1">
          <strong>Estado:</strong> <span className="texto-acento">{torneo.estado}</span>
        </p>
        {!compacta && (
          <>
            <p className="mb-1">
              <strong>Cupos:</strong> {torneo.cuposOcupados}/{torneo.cuposMaximos}
            </p>
            <p className="mb-1">
              <strong>Cierre:</strong> {torneo.fechaCierre}
            </p>
          </>
        )}
        <Link to={`/torneos/${torneo.id}`} className="btn btn-esports mt-auto">
          Ver Detalle
        </Link>
      </div>
    </article>
  );
}
