import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import AdminTorneos from './pages/AdminTorneos.jsx';
import CrearEquipo from './pages/CrearEquipo.jsx';
import DetalleTorneo from './pages/DetalleTorneo.jsx';
import Inicio from './pages/Inicio.jsx';
import Inscripcion from './pages/Inscripcion.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';
import Perfil from './pages/Perfil.jsx';
import Torneos from './pages/Torneos.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="torneos" element={<Torneos />} />
        <Route path="torneos/:id" element={<DetalleTorneo />} />
        <Route path="inscripcion" element={<Inscripcion />} />
        <Route path="equipo" element={<CrearEquipo />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="admin" element={<AdminTorneos />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}
