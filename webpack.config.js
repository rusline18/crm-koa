const path = require('path');

module.exports = {
    entry: './src/header.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: ['babel-loader'],
                exclude: /\/node_module\//
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader'
            },
            {
              test: /\.pug$/,
              use: ['pug-loader']
            }
        ]
    },
    devtool: 'source-map',
    context: __dirname,
    watch: true,
    watchOptions: {
        aggregateTimeout: 300
    }
};