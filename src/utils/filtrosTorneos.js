// Lógica de filtrado combinado del catálogo (migrada desde main.js).
export const FILTROS_INICIALES = {
  nombre: '',
  juegoId: '',
  estado: '',
  fechaInicio: '',
  fechaFin: '',
};

export function filtrarTorneos(torneos, filtros) {
  const texto = filtros.nombre.trim().toLowerCase();

  return torneos.filter((t) => {
    const coincideNombre = t.nombre.toLowerCase().includes(texto);
    const coincideJuego = filtros.juegoId === '' || String(t.juegoId) === String(filtros.juegoId);
    const coincideEstado = filtros.estado === '' || t.estado.toLowerCase() === filtros.estado.toLowerCase();
    const desdeOk = !filtros.fechaInicio || t.fechaCierre >= filtros.fechaInicio;
    const hastaOk = !filtros.fechaFin || t.fechaCierre <= filtros.fechaFin;
    return coincideNombre && coincideJuego && coincideEstado && desdeOk && hastaOk;
  });
}
