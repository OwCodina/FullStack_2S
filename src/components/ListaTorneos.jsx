import TarjetaTorneo from './TarjetaTorneo.jsx';

// Renderiza una grilla responsiva (Bootstrap) o un mensaje cuando no hay resultados.
export default function ListaTorneos({ torneos, compacta = false }) {
  if (torneos.length === 0) {
    return (
      <p className="mensaje-vacio text-center fst-italic p-4 rounded">
        No se encontraron torneos que cumplan con los filtros seleccionados.
      </p>
    );
  }

  return (
    <div className="row g-4">
      {torneos.map((torneo) => (
        <div key={torneo.id} className="col-12 col-md-6 col-lg-4">
          <TarjetaTorneo torneo={torneo} compacta={compacta} />
        </div>
      ))}
    </div>
  );
}
