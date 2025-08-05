const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config"); // Require default Webpack config
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    return {
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
                                sourceMap: !isProduction,
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
                                sourceMap: !isProduction,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !isProduction,
                            }
                        }
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
                                sourceMap: !isProduction,
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
            extensions: ['.js', '.scss'],
            alias: {
                jquery: 'jquery/src/jquery'
            },
        },
        devtool: isProduction ? false : 'source-map',
        stats: {
            all: true,
        },

    }
};
