/*Динамическая подгрузка на сайт*/

const webpack = require('webpack');

module.exports = {
    context: __dirname + '/frontend',
    entry : {
        app: './app.js'
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: "[name].js"
    },
    //watch: true,
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js']
    },

    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader', '*'],
        extensions: ['.js']
    },

    /* --display-modules для расшифровки модулей*/
    plugins: [
        /*Оставляет только те файлы которые попали под вторую регулярку, есть еже игнор плагин*/
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(ru|en-gb)$/)
    ]

}