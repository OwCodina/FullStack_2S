import { useMemo, useState } from 'react';
import FiltrosTorneos from '../components/FiltrosTorneos.jsx';
import ListaTorneos from '../components/ListaTorneos.jsx';
import { listarJuegos, listarTorneos } from '../services/db.js';
import { FILTROS_INICIALES, filtrarTorneos } from '../utils/filtrosTorneos.js';
import { validarRangoFechas } from '../validators/validaciones.js';

export default function Torneos() {
  const [torneos] = useState(() => listarTorneos());
  const [juegos] = useState(() => listarJuegos());
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  const errorFecha = validarRangoFechas(filtros.fechaInicio, filtros.fechaFin);

  const filtrados = useMemo(() => {
    // Con un rango de fechas inválido se ignoran las fechas y se muestra el error.
    const aplicados = errorFecha ? { ...filtros, fechaInicio: '', fechaFin: '' } : filtros;
    return filtrarTorneos(torneos, aplicados);
  }, [torneos, filtros, errorFecha]);

  const cambiarFiltro = (campo, valor) => setFiltros((previos) => ({ ...previos, [campo]: valor }));

  return (
    <>
      <h2 className="mb-3">Catálogo de Torneos</h2>
      <FiltrosTorneos filtros={filtros} juegos={juegos} onCambio={cambiarFiltro} errorFecha={errorFecha} />
      <ListaTorneos torneos={filtrados} />
    </>
  );
}
