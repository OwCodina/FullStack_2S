# Esports Arena – Parte 2 (React)

Migración de la plataforma de torneos (Parte 1, HTML/CSS/JS) a **React + Bootstrap**, con pruebas unitarias en **Jasmine + Karma**.

## Requisitos
- Node.js 18+ y Google Chrome instalado (Karma lo usa en modo headless; si no lo detecta, define `CHROME_BIN`).

## Comandos
```bash
npm install
npm run dev            # servidor de desarrollo (Vite)
npm run build          # build de producción
npm test               # pruebas Jasmine/Karma (una pasada)
npm run test:watch     # pruebas en modo observación
npm run test:coverage  # pruebas + reporte de cobertura en /coverage
```

## Estructura
```
src/
├── data/datos.js              # Datos semilla (migrado de js/datos.js)
├── services/db.js             # BD simulada: CRUD + persistencia en localStorage
├── validators/validaciones.js # Validaciones puras (migrado de js/validaciones.js)
├── utils/filtrosTorneos.js    # Filtro combinado del catálogo
├── context/RolContext.jsx     # Rol activo (Visitante / Jugador / Administrador)
├── components/                # Componentes reutilizables (+ *.spec.jsx)
└── pages/                     # Vistas enrutadas con react-router
```

## Migración Parte 1 → React
| Parte 1 (HTML/JS) | React |
|---|---|
| `index.html`, `torneos.html`, `detalle-torneo.html`, `inscripcion.html`, `equipo.html`, `perfil.html` | `pages/Inicio`, `Torneos`, `DetalleTorneo`, `Inscripcion`, `CrearEquipo`, `Perfil` |
| Header/footer repetidos en cada HTML | `Header`, `Footer`, `Layout` (una sola vez) |
| `renderizarDestacados / renderizarTorneosCompleto` (innerHTML) | `ListaTorneos` + `TarjetaTorneo` (props) |
| Filtros con `addEventListener` | `FiltrosTorneos` (componente controlado) + `filtrarTorneos` |
| `?id=X` con `URLSearchParams` | Ruta `/torneos/:id` con `useParams` |
| `DATOS_SIMULADOS.rolActual` global | `RolContext` (estado compartido) |
| `validaciones.js` con `getElementById` | `FormularioInscripcion` / `FormularioEquipo` con estado + `validaciones.js` puras |
| `alert()` | Alertas Bootstrap |
| CSS Grid propio | Bootstrap (`container`, `row`, `col-*`, navbar colapsable) |

## Vistas nuevas
- `/admin`: panel con CRUD de torneos (solo rol Administrador).
