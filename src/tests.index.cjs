// Punto de entrada de Karma. Es .cjs a propósito: el proyecto usa "type": "module",
// y en un módulo ES webpack no permite require.context.
// Carga todos los archivos *.spec.js / *.spec.jsx.
const contextoPruebas = require.context('./', true, /\.spec\.jsx?$/);
contextoPruebas.keys().forEach(contextoPruebas);
