/**
 * Created by Balyuk-D on 26.04.2017.
 */
const webpack = require('webpack');
const path = require("path");
var LiveReloadPlugin = require('webpack-livereload-plugin');
var options = {
    port: 8080
}

module.exports = {
    context: __dirname + '/js',
    entry: {
        app: './app.js'
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: "[name].js",
        library: '[name]'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    plugins: [
        new LiveReloadPlugin(options)
    ]
}