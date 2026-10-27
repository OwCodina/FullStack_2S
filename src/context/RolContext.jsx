import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ROLES } from '../data/datos.js';

const CLAVE_ROL = 'esports-arena-rol';

// Valor por defecto: permite renderizar componentes sin proveedor (útil en pruebas).
export const RolContext = createContext({ rol: 'Visitante', setRol: () => {}, puedeActuar: false });

function leerRolGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_ROL);
    return ROLES.includes(guardado) ? guardado : 'Visitante';
  } catch {
    return 'Visitante';
  }
}

export function RolProvider({ children, rolInicial }) {
  const [rol, setRolEstado] = useState(() => rolInicial ?? leerRolGuardado());

  const setRol = useCallback((nuevoRol) => {
    if (!ROLES.includes(nuevoRol)) return;
    setRolEstado(nuevoRol);
    try {
      localStorage.setItem(CLAVE_ROL, nuevoRol);
    } catch {
      // sin persistencia
    }
  }, []);

  const valor = useMemo(() => ({ rol, setRol, puedeActuar: rol !== 'Visitante' }), [rol, setRol]);

  return <RolContext.Provider value={valor}>{children}</RolContext.Provider>;
}

export function useRol() {
  return useContext(RolContext);
}
