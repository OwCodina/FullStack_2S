// Karma + Jasmine + webpack (babel-loader) para probar componentes React.
// Requiere Google Chrome instalado (o definir CHROME_BIN).
module.exports = function (config) {
  const conCobertura = process.argv.includes('--coverage');

  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    files: [{ pattern: 'src/tests.index.cjs', watched: false }],
    preprocessors: { 'src/tests.index.cjs': ['webpack', 'sourcemap'] },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          { test: /\.m?js$/, resolve: { fullySpecified: false } },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                plugins: conCobertura
                  ? [['istanbul', { exclude: ['**/*.spec.js', '**/*.spec.jsx', 'src/testing/**', 'src/tests.index.cjs'] }]]
                  : [],
              },
            },
          },
        ],
      },
    },

    reporters: conCobertura ? ['progress', 'coverage'] : ['progress'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'lcovonly' }],
    },

    browsers: ['ChromeHeadlessSinSandbox'],
    customLaunchers: {
      ChromeHeadlessSinSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox'] },
    },

    client: { jasmine: { random: true } },
    restartOnFileChange: true,
  });
};
