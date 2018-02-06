/**
 * @Project beagle
 * @author  h4wldev
 *
 * Created by h4wldev on 2017. 07. 27..
 */

import path from 'path';

import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import RobotstxtPlugin from 'robotstxt-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import AutoInjectVersionPlugin from 'webpack-auto-inject-version';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';


const plugins = ((process.env.NODE_ENV || 'development') === 'production') ? [
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /bundle\.[0-9a-zA-Z]+.min.css$/g,
        cssProcessor: require('cssnano')({ zindex: false }),
        np: { discardComments: {removeAll: true } },
        canPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
    }),
] : [];


export default {
    entry: './src/app.js',
    output: {
        filename: 'bundle.[hash].min.js',
        path: path.resolve(__dirname, './build')
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, './src'),
            '&': path.resolve(__dirname, './static')
        }
    },
    plugins: [
        ...plugins,
        new ExtractTextPlugin('bundle.[hash].min.css'),
        new HtmlPlugin({
            title: require("./package.json").title || '2017 디미고 축제 \'백야\' - 디미가왕',
            template: 'src/layout.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "Chart": "chart.js"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'VERSION': JSON.stringify(require("./package.json").version)
        }),
        new CleanWebpackPlugin(['build']),
        new RobotstxtPlugin({
            policy: [
                {
                    userAgent: '*',
                    disallow: '/'
                }
            ]
        }),
        new AutoInjectVersionPlugin({
            components: {
                AutoIncreaseVersion: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.s[a|c]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|ttf|woff2?|eot)$/,
                loader: 'file-loader',
                options: { name: '[name].[ext]?[hash]' }
            }
        ]
    }
}
