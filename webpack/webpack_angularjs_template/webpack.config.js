/**
 * Created by Balyuk-D on 05.05.2017.
 */
const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');

var options_LRP = {
    port: 8080
}

module.exports = {
    context : path.resolve(__dirname, "src"),
    entry : {
        app: './app.js'
    },
    output : {
        path : path.resolve(__dirname, "public"),
        publicPath: '/',
        filename: "[name].js",
        library: '[name]'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool : 'development',
    plugins: [
        new LiveReloadPlugin(options_LRP),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            _:          'lodash'
        })
    ]
}