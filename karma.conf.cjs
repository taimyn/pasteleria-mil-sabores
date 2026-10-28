module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],

        // Archivos de pruebas
        files: [
            {
                pattern: 'tests/catalogo.spec.js',
                watched: false
            },
            {
                pattern: 'tests/react.spec.js',
                watched: false
            }
        ],

        // Procesar JavaScript y React
        preprocessors: {
            'tests/catalogo.spec.js': ['esbuild'],
            'tests/react.spec.js': ['esbuild']
        },

        esbuild: {
            bundle: true,
            target: 'es2020',
            format: 'iife',
            sourcemap: 'inline'
        },

        // Ejecutar pruebas
        reporters: ['progress'],
        browsers: ['ChromeHeadless'],
        singleRun: true,

        client: {
            captureConsole: true
        }
    });
};
