import { useState } from 'react';
import ListaTorneos from '../components/ListaTorneos.jsx';
import TablaRanking from '../components/TablaRanking.jsx';
import { listarRanking, listarTorneos } from '../services/db.js';

export default function Inicio() {
  const [destacados] = useState(() => listarTorneos().filter((t) => t.destacado));
  const [ranking] = useState(() => listarRanking());

  return (
    <>
      <section className="hero p-4 p-md-5 mb-5 rounded">
        <h2>Bienvenido a la Plataforma Competitiva de Esports</h2>
        <p className="mb-0">Compite en los mejores torneos de League of Legends, Valorant, CS2 y Rocket League.</p>
      </section>

      <section className="mb-5">
        <h2 className="mb-3">Torneos Destacados</h2>
        <ListaTorneos torneos={destacados} compacta />
      </section>

      <section>
        <h2 className="mb-3">Ranking Global de Equipos</h2>
        <TablaRanking ranking={ranking} />
      </section>
    </>
  );
}
