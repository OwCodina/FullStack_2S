// Usado por babel-loader dentro de Karma (Vite usa su propio plugin de React).
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { chrome: '100' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
