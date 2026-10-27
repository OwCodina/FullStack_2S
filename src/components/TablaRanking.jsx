export default function TablaRanking({ ranking }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle tabla-ranking">
        <thead>
          <tr>
            <th scope="col">Pos.</th>
            <th scope="col">Equipo</th>
            <th scope="col">Victorias</th>
            <th scope="col">Derrotas</th>
            <th scope="col">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((r) => (
            <tr key={r.posicion}>
              <td>
                <strong>#{r.posicion}</strong>
              </td>
              <td>{r.equipo}</td>
              <td>{r.victorias}</td>
              <td>{r.derrotas}</td>
              <td>
                <strong>{r.puntos} pts</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
