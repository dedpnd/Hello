/**
 * Created by Balyuk-D on 10.03.2017.
 */

/*Мультикомпиляция, если надо сразу несколько сборок ???*/

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    /*Что собираем*/
    context: __dirname + '/frontend',
    /*Несколько точек входа (нельзя вставлять библиотеку которая рекваеться в другую)*/
    entry: {
        home: './home.js',
        about: './about.js',
        common: './common.js'
    },
    output: {
        path: __dirname + '/public',
        /*Куда собираем*/
        filename: '[name].js',
        /*Внешнея переменная для модуля*/
        library: '[name]'
    },

    /*Отслеживание изменений, требуеться запуск webpack*/
    //watch: NODE_ENV == 'development',

    /*Таймаут на сохранение*/
    watchOptions: {
        aggregateTimeout: 100
    },

    /*Отладка sourcemap*/
    devtool: NODE_ENV == 'development' ? "cheap-source-map" : false,


    plugins: [
        /*Если есть ошибки не создает файлов*/
        new webpack.NoEmitOnErrorsPlugin(),
        /*Любые константы для сборки*/
        new webpack.DefinePlugin({
            NODE_ENV : JSON.stringify(NODE_ENV)
        }),
        /*Выносит одинаковые рекваи в name*/
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        })
    ],

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js']
    },

    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader', '*'],
        extensions: ['.js']
    },

    /*Лоадер обработка для IE*/
    module: {
        loaders: [{
            test: /\.js$/,
            /*вынес преобразования кода в модуль*/
            loader: 'babel?optional[]=runtime'
        }]
    }

};

/*Плагин минификации*/
if (NODE_ENV == 'production') {
    module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false,
              drop_console: true,
              unsafe: true
          }
      })
    );
}