const fs = require('node:fs/promises');
const path = require('node:path');
const { createInstrumenter } = require('istanbul-lib-instrument');

const carpetaSrc = path.join(__dirname, 'src') + path.sep;

const pluginCobertura = {
    name: 'cobertura-pasteleria',
    setup(build) {
        build.onLoad({ filter: /\.jsx?$/ }, async (args) => {
            if (!args.path.startsWith(carpetaSrc)) {
                return;
            }

            const codigo = await fs.readFile(args.path, 'utf8');

            const archivo = path.relative(__dirname, args.path)
                .split(path.sep)
                .join('/');

            const instrumentador = createInstrumenter({
                esModules: true,
                compact: false,
                parserPlugins: ['jsx']
            });

            return {
                contents: instrumentador.instrumentSync(codigo, archivo),
                loader: args.path.endsWith('.jsx') ? 'jsx' : 'js'
            };
        });
    }
};

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],

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

        preprocessors: {
            'tests/catalogo.spec.js': ['esbuild'],
            'tests/react.spec.js': ['esbuild']
        },

        esbuild: {
            bundle: true,
            target: 'es2020',
            format: 'iife',
            sourcemap: 'inline',
            plugins: [pluginCobertura]
        },

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: 'coverage',
            reporters: [
                { type: 'text-summary' },
                { type: 'html', subdir: 'html' },
                { type: 'lcovonly', subdir: '.' }
            ]
        },

        browsers: ['ChromeHeadless'],
        singleRun: true,

        client: {
            captureConsole: true
        }
    });
};
