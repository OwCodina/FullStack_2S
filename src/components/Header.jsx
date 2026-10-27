import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useRol } from '../context/RolContext.jsx';
import { ROLES } from '../data/datos.js';

const ENLACES_BASE = [
  { a: '/', texto: 'Inicio', exacto: true },
  { a: '/torneos', texto: 'Torneos' },
  { a: '/inscripcion', texto: 'Inscripción' },
  { a: '/equipo', texto: 'Crear Equipo' },
  { a: '/perfil', texto: 'Perfil' },
];

export default function Header() {
  const { rol, setRol } = useRol();
  const [abierto, setAbierto] = useState(false);

  const enlaces = rol === 'Administrador' ? [...ENLACES_BASE, { a: '/admin', texto: 'Admin' }] : ENLACES_BASE;

  return (
    <header className="navbar navbar-expand-lg navbar-esports border-bottom border-primary">
      <div className="container">
        <Link className="navbar-brand logo" to="/">
          🎮 Esports Arena
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="menu-principal"
          aria-expanded={abierto}
          aria-label="Mostrar u ocultar navegación"
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="menu-principal" className={`collapse navbar-collapse${abierto ? ' show' : ''}`}>
          <nav className="navbar-nav me-auto" aria-label="Navegación principal">
            {enlaces.map((enlace) => (
              <NavLink
                key={enlace.a}
                to={enlace.a}
                end={enlace.exacto}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={() => setAbierto(false)}
              >
                {enlace.texto}
              </NavLink>
            ))}
          </nav>

          <div className="d-flex align-items-center gap-2">
            <label htmlFor="select-rol-simulado" className="mb-0">
              Rol:
            </label>
            <select
              id="select-rol-simulado"
              className="form-select form-select-sm w-auto"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
