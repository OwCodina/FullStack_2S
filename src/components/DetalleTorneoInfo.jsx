const comoLista = (valor) => (Array.isArray(valor) ? valor : valor ? [valor] : []);

// Ficha técnica de un torneo (componente presentacional).
export default function DetalleTorneoInfo({ torneo }) {
  const premios = comoLista(torneo.premios);
  const calendario = comoLista(torneo.calendario);
  const llaves = comoLista(torneo.llaves);

  return (
    <div>
      <article className="mb-3">
        <h2>{torneo.nombre}</h2>
        <p className="lead">{torneo.descripcion}</p>
      </article>

      <div className="row g-3 mb-4">
        {torneo.imagenes.map((src, i) => (
          <div key={src} className="col-12 col-md-6">
            <img className="img-fluid rounded detalle-img" src={src} alt={`Imagen ${i + 1} de ${torneo.nombre}`} />
          </div>
        ))}
      </div>

      <div className="card card-esports mb-3">
        <div className="card-body">
          <p>
            <strong>Juego:</strong> {torneo.juegoNombre}
          </p>
          <p>
            <strong>Estado:</strong> <span className="texto-acento">{torneo.estado}</span>
          </p>
          <p>
            <strong>Cupos Inscritos:</strong> {torneo.cuposOcupados} / {torneo.cuposMaximos}
          </p>
          <p>
            <strong>Cierre de Inscripciones:</strong> {torneo.fechaCierre}
          </p>
          <p className="mb-1">
            <strong>Premios y Recompensas:</strong>
          </p>
          <ul className="mb-0">
            {premios.length ? premios.map((p) => <li key={p}>{p}</li>) : <li>Sin premios registrados</li>}
          </ul>
        </div>
      </div>

      <section className="card card-esports mb-3">
        <div className="card-body">
          <h3 className="h5">Calendario de Partidas</h3>
          <ul className="mb-0">
            {calendario.length ? (
              calendario.map((c) => (
                <li key={`${c.ronda}-${c.fecha}`}>
                  <strong>{c.ronda}:</strong> {c.partido} &mdash; <em>{c.fecha}</em>
                </li>
              ))
            ) : (
              <li>Sin calendario registrado</li>
            )}
          </ul>
        </div>
      </section>

      <section className="card card-esports mb-3">
        <div className="card-body">
          <h3 className="h5">Llaves y Cuadro de Enfrentamientos</h3>
          <ul className="mb-0">
            {llaves.length ? llaves.map((l) => <li key={l}>{l}</li>) : <li>Sin llaves registradas</li>}
          </ul>
        </div>
      </section>
    </div>
  );
}
