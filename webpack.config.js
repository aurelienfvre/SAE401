const Encore = require('@symfony/webpack-encore');
const path = require('path');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/app.js')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })
    .configureDefinePlugin(options => {
        if (!options['process.env']) {
            options['process.env'] = {};
        }
        options['process.env'].BASE_URL = JSON.stringify('/');
    })
    .enableSassLoader()
    .enableVueLoader(() => {}, { runtimeCompilerBuild: false }) // Ajouter cette ligne pour activer le support Vue
    // Configuration des alias pour faciliter les importations
    .addAliases({
        '@': path.resolve(__dirname, './assets/vue'),
        'vue$': 'vue/dist/vue.esm-bundler.js', // Utiliser la build complète de Vue
    })

;

module.exports = Encore.getWebpackConfig();
