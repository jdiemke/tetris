const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                use: 'ts-loader'
            },
            {
                test: /\.(png|jpg|mp3|ogg|xm|wav)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
