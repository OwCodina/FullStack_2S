import { useRol } from '../context/RolContext.jsx';

// Renderizado condicional: solo se muestra si el rol es Visitante.
export default function AvisoRol() {
  const { rol } = useRol();
  if (rol !== 'Visitante') return null;

  return (
    <div className="alert alert-danger" role="alert">
      Estás navegando como Visitante. Selecciona el rol 'Jugador' en el selector superior para habilitar las
      inscripciones.
    </div>
  );
}
