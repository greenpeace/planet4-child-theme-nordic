const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config"); // Require default Webpack config
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const ProvidePlugin = require('buffer');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    // ...defaultConfig,
    entry: {
        index: './assets/src/js/app.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/assets/build'
    },
    module: {
        // ...defaultConfig.module,
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer'),
                                ],
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                ]
            },
            {
                test: /icons\/.*\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: '../../images/symbol/svg/sprite.symbol.svg',
                    runtimeCompat: true
                }
            },
            {
                test: /\.xlsx$/,
                use: [{ loader: './assets/src/js/sheetjs-loader' }]
            },
            {
                test: /\.(js|jsx)$/,  
                exclude: /node_modules/,  
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',  
                            '@babel/preset-react' 
                        ]
                    }
                }
            },

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.min.css',
            chunkFilename: '[id].min.css',
            ignoreOrder: false,
        }),
        new RemovePlugin({
            after: {
                test: [{
                    folder: 'assets/build/',
                    method: (filePath) => {
                        return [
                            'style.deps.json',
                            'index.asset.php',
                            'style.asset.php',
                            'index.js.LICENSE.txt'
                        ].some(item => new RegExp(item, 'm').test(filePath));
                    }
                }]
            }
        }),
        new SpriteLoaderPlugin({
            plainSprite: true
        }),
        new DependencyExtractionWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
                default: {
                    name: 'default',
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    enforce: true,
                },
            },
        },
        minimizer: [
            new TerserJSPlugin({}),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                            sourceMap: true,
                        },
                    ],
                },
            }),
        ],
    },
    resolve: {
        fallback: {
            buffer: require.resolve('buffer/'),
        },
        extensions: ['.js', '.jsx', '.json', '.scss'],
        alias: {
            jquery: 'jquery/src/jquery',
        },
    },
    devtool: 'source-map',
    stats: {
        all: true,
    },
};
