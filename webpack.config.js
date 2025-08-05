
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.tsx',
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.scss'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    ['@babel/preset-react', { runtime: 'automatic' }],
                                    '@babel/preset-typescript',
                                ],
                            },
                        },
                    ],
                },
                { test: /\.(html)$/, use: ['html-loader'] },
                {
                    test: /\.(s[ac]|c)ss$/i,
                    use: [
                        {
                            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                esModule: true,
                                modules: {
                                    localIdentName: '[name]_[local]_[hash:base64:5]',
                                    namedExport: false,
                                    exportLocalsConvention: 'as-is',
                                },
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            'postcss-preset-env',
                                            {},
                                        ],
                                    ],
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    use: ['@svgr/webpack'],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                minify: isProduction,
            }),
            isProduction
                ? new MiniCssExtractPlugin()
                : null,
            isProduction ? null : new ReactRefreshPlugin({ overlay: false }),
        ],
        devServer: {
            static: './dist',
            hot: true,
            historyApiFallback: true,
            port: 3000,
            open: true,
        },
        mode: isProduction ? 'production' : 'development',
        cache: isProduction
            ? false
            : {
                type: 'memory',
            },
        optimization: {
            minimize: isProduction,
            minimizer: isProduction
                ? [new TerserPlugin()]
                : undefined,
        },
    };
}
