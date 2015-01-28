var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AngularWebpackPlugin = require('angular-webpack-plugin');
AngularWebpackPlugin.prototype.addAngularVariable = function(parser) {
    return true;
};
module.exports = {
    entry: {
        'bootstrap': [
             'webpack-dev-server/client?http://localhost:3000',
             'webpack/hot/dev-server',
             'underscore',
             'jquery',
             'exports?window.angular!imports?$=jquery!angular',
             'ngSanitize',
             'ngAnimate',
             'ngAria',
             'ui.router',
             'ct.ui.router.extras'
        ],
        'app.js': ["webpack-dev-server/client?http://localhost:3000", 'webpack/hot/dev-server', "./src/app.less", "./src/boot-dev.js"]//,
        //'app.css': ["webpack-dev-server/client?http://localhost:3000", 'webpack/hot/dev-server']
    },
    output: {
        path: "build",
        filename: "[name]"
    },
    stats: {
        // Configure the console output
        colors: true,
        modules: false,
        reasons: false
    },
    // stats: false disables the stats output

    cache: true,
    debug: true,
    devtool: 'source-map',

    //storeStatsTo: "xyz", // writes the status to a variable named xyz
    // you may use it later in grunt i.e. <%= xyz.hash %>

    progress: true, // Don't show progress
    // Defaults to true

    //failOnError: false, // don't report error to grunt if webpack find errors
    // Use this if webpack errors are tolerable and grunt should continue

    //watch: true, // use webpacks watcher
    // You need to keep the grunt process alive

    //keepalive: true, // don't finish the grunt task
    // Use this in combination with the watch option

    module: {
        preLoaders: [
            {
                test: /\.js$/, // include .js files
                exclude: [/node_modules/,/web_modules/], // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ],
        loaders: [
            {   test: require.resolve('jquery'), loader: "expose?jQuery" },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader?sourceMap&-minimize!less-loader?sourceMap&-minimize'
//                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap&-minimize!less-loader?sourceMap&-minimize")
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(png|gif|cur)$/,
                loader: "url-loader?name=img/[path][name].[ext]"
            },
            { test: /\.woff2$/, loader: "url-loader?name=fonts/[path][name].[ext]&mimetype=application/font-woff2" },
            { test: /\.woff$/, loader: "url-loader?name=fonts/[path][name].[ext]&mimetype=application/font-woff" },
            { test: /\.ttf$/, loader: "url-loader?name=fonts/[path][name].[ext]&mimetype=application/x-font-truetype" },
            { test: /\.eot$/, loader: "url-loader?name=fonts/[path][name].[ext]&mimetype=application/vnd.ms-fontobject" },
            { test: /\.svg$/, loader: "url-loader?name=fonts/[path][name].[ext]&mimetype=image/svg+xml" },
            { test: /\.woff2\?(v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=fonts/[path][name].[ext]&mimetype=application/font-woff2" },
            { test: /\.woff\?(v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=fonts/[path][name].[ext]&mimetype=application/font-woff" },
            { test: /\.ttf\?(v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=fonts/[path][name].[ext]&mimetype=application/x-font-truetype" },
            { test: /\.eot\?(v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=fonts/[path][name].[ext]&mimetype=application/vnd.ms-fontobject" },
            { test: /\.svg\?(v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=fonts/[path][name].[ext]&mimetype=image/svg+xml" },
            {
                test: /\.swf$/,
                loader: "file-loader?name=[path][name].[ext]"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    },
    resolve: {
        root: [
           path.resolve('src')
        ],
        alias: {
            'ngSanitize': 'angular-sanitize',
            'ngAnimate': 'angular-animate',
            'ngAria': 'angular-aria',
            'ngResource': 'angular-resource',
            'ui.router': 'angular-ui-router',
            'ct.ui.router.extras': 'ui-router-extras/build/ct-ui-router-extras',
            'ui.bootstrap': 'angular-ui-bootstrap/dist/ui-bootstrap-tpls-0.13.0-SNAPSHOT',
            'ngMockE2E': 'angular-mocks'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("bootstrap", "bootstrap.js"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin ({
            _: "underscore",
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': "jquery"
        }),
        new AngularWebpackPlugin(),
        new ExtractTextPlugin("[name]"),
        new HtmlWebpackPlugin({template: 'index.html'})
    ],
    devServer: {
        quiet: false,
        hot: true,
        contentBase: './build',
        stats: {
            colors: true,
            modules: false,
            reasons: false
        }
    }
}
