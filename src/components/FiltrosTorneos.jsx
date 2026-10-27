import CampoFormulario from './CampoFormulario.jsx';
import { ESTADOS_TORNEO } from '../data/datos.js';

// Componente controlado: el estado de los filtros vive en el padre (Torneos).
export default function FiltrosTorneos({ filtros, juegos, onCambio, errorFecha = '' }) {
  const opcionesJuego = [{ valor: '', texto: 'Todos los Juegos' }, ...juegos.map((j) => ({ valor: String(j.id), texto: j.nombre }))];
  const opcionesEstado = [{ valor: '', texto: 'Todos los Estados' }, ...ESTADOS_TORNEO.map((e) => ({ valor: e, texto: e }))];

  return (
    <section className="filtros-torneos p-3 rounded mb-4" aria-label="Filtros de torneos">
      <div className="row g-3">
        <div className="col-12 col-md-6 col-lg-4">
          <CampoFormulario
            id="filtro-nombre"
            etiqueta="Buscar por Nombre:"
            valor={filtros.nombre}
            onCambio={(v) => onCambio('nombre', v)}
            placeholder="Nombre del torneo..."
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <CampoFormulario
            id="filtro-juego"
            etiqueta="Juego:"
            valor={filtros.juegoId}
            onCambio={(v) => onCambio('juegoId', v)}
            opciones={opcionesJuego}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <CampoFormulario
            id="filtro-estado"
            etiqueta="Estado:"
            valor={filtros.estado}
            onCambio={(v) => onCambio('estado', v)}
            opciones={opcionesEstado}
          />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario
            id="filtro-fecha-inicio"
            etiqueta="Cierre Desde:"
            tipo="date"
            valor={filtros.fechaInicio}
            onCambio={(v) => onCambio('fechaInicio', v)}
          />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario
            id="filtro-fecha-fin"
            etiqueta="Cierre Hasta:"
            tipo="date"
            valor={filtros.fechaFin}
            onCambio={(v) => onCambio('fechaFin', v)}
          />
        </div>
      </div>
      {errorFecha && (
        <div className="text-danger" role="alert" id="error-filtro-fecha">
          {errorFecha}
        </div>
      )}
    </section>
  );
}
