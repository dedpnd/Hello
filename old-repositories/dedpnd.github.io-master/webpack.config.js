/**
 * Created by Balyuk-D on 05.05.2017.
 */
const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var options_LRP = {
    port: 8080
}

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        app: ['./app.js',
            './authorization.js',
            './mails/mails.js',
            './users/user-card.js',
            './mails/mailbox/mailbox.js',
            './login/login.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: '/',
        filename: "[name].js",
        library: '[name]'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300
    },
    devtool: 'source-map',
    plugins: [
        new LiveReloadPlugin(options_LRP),
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin([{
            from: './mails/*.html'
        }, {
            from: './users/*.html'
        }, {
            from: './mails/mailbox/*.html'
        }, {
            from: './mails/mail/*.html'
        }, {
            from: './mails/new_letter/*.html'
        }, {
            from: './users/user_edit/*.html'
        }, {
            from: './login/*.html'
        }]),
        new webpack.ProvidePlugin({
            _: 'lodash',
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".css"]
    }
}