import { Link } from 'react-router-dom';

export default function NoEncontrada() {
  return (
    <div className="text-center py-5">
      <h2>Página no encontrada</h2>
      <p>La ruta que buscas no existe.</p>
      <Link to="/" className="btn btn-esports">
        Volver al inicio
      </Link>
    </div>
  );
}
