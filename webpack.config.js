const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        login: './src/public/js/auth/login.js',
        register: './src/public/js/auth/register.js',
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/src/public/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/resources/views/auth/login-email.hbs',
            filename: 'login-email.html',
            chunks: ['login'],
        }),
        new HtmlWebpackPlugin({
            template: './src/resources/views/auth/register-email.hbs',
            filename: 'register-email.html',
            chunks: ['register'],
        }),
    ],
    resolve: {
        extensions: ['.js'],
        fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "crypto": require.resolve("crypto-browserify"),
            "buffer": require.resolve("buffer/"),
            "stream": require.resolve("stream-browserify"),
            "vm": require.resolve("vm-browserify")
        }
    },
    devServer: {
        port: 3001,
        hot: true,
        static: {
            directory: path.join(__dirname, 'src/public'),
        },
        historyApiFallback: true,
        proxy: [
            {
                context: ['/'],
                target: 'http://localhost:3000',
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        usedExports: true,
    }
};
