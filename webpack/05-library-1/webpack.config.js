/**
 * Created by Balyuk-D on 17.03.2017.
 */

const webpack = require('webpack');
const path = require("path");

module.exports = {
    context: __dirname + '/frontend',
    entry : {
        app: './app.js'
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: "[name].js",
        library: '[name]'
    },
    watch: true,
    /*Подключения скрипта из хтмл в модули*/
    /*
    externals: {
        lodash: '_'
    },*/

    /*Плагин из ноде модуля в модули*/
    /*Это для проверки самых жирных --profile --display-modules --display-reasons*/
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ],
    resolve: {
        /*Подключаем старый скрипт*/
        modules: [path.resolve(__dirname, "./vendor/"),path.resolve(__dirname, "/frontend"), 'node_modules'],
        alias: {
            old: 'old/dist/old'
        }
    },
    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader','-core', '*'],
        extensions: ['.js']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            /*Лоадер только для этого пути, можно массив*/
            include: /\/frontend\//,
            loader: 'babel'
        },{
            /*npm install exports-loader imports-loader || Передает внутрь объекты и экспортирует функции*/
            test: /old.js$/,
            loader: "imports?window=>{hello:'its me'}!exports?Work!exports?Look"
        }]
            /*expose лоадер добавляет скрипт в глобальную переменую*/
        /* noParse и exclude не работает?
        ,
        noParse: /\/lodash\/lodash.js/*/
    }
};