let Encore = require('@symfony/webpack-encore');
var path = require('path');
Encore
    .setOutputPath('public/')
    .setPublicPath('/public')
    .addEntry('lemon', '.src/lemon.js')
    .splitEntryChunks()
    .disableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())

    .enableVersioning(Encore.isProduction())
    .enableSourceMaps(!Encore.isProduction())

    .configureFilenames({
        // js: '[name].[chunkhash].js',
        // css: '[name].[contenthash].css',
        // fonts: 'fonts/[name].[hash:8].[ext]',
        images: 'images/[name].[ext]',
     })
    .configureBabel((babelConfig) => {
        babelConfig.plugins.push('@babel/plugin-transform-runtime');
    }, {
        useBuiltIns: 'usage',
        corejs: 3
    })
    .enableVueLoader(function(options) {})
    .enablePostCssLoader()
    .enableLessLoader()
    .enableIntegrityHashes()
    .addLoader({
        enforce: 'pre',
        test: /\.(js|vue|less)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
            fix: false,
            emitError: true,
            emitWarning: true,
        },
    })
    .autoProvidejQuery({
        $: 'jquery',
    })
;
let config = Encore.getWebpackConfig();
module.exports = config;
