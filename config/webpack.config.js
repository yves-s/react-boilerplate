const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');

module.exports = {
    entry: paths.appIndexJs,
    output: {
        path: paths.appBuild,
        filename: 'bundle.js',
        publicPath: paths.publicPath
    },
    devServer: {
        inline: true,
        port: 3333
    },
    resolve: {
        extensions: ['', '.scss', '.css', '.js', '.json'],
        modulesDirectories: [
            paths.appNodeModules,
            paths.appSrc
        ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-2'],
                    plugins: [ "transform-runtime" ]
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loader: combineLoaders([
                    {
                        loader: ExtractTextPlugin.extract('style', 'css?sourceMap'),
                        query: {
                            modules: true,
                            importLoaders: 1
                        }
                    },
                    {loader: 'postcss'},
                    {loader: 'sass'}
                ])
            },
            {
                test: /\.css$/,
                loader: combineLoaders([
                    {loader: 'style'},
                    {loader: 'css'},
                    {loader: 'postcss'}
                ])
            },
            // Font Definitions
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.(png|jpg)$/,
                loader: `url`
            }
        ]
    },
    postcss: [autoprefixer],
    plugins: [
        new ExtractTextPlugin(
            'bundle.css',
            {
                allChunks: true
            }
        ),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: paths.appHtml,
            metadata: {
                basePath: paths.publicPath
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}