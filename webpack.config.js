const path = require('path')

module.exports = {
    entry: {
        index: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.js'],
        edit: ['core-js/stable', 'regenerator-runtime/runtime', './src/edit.js'],
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name]-bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]'
                }
              }
            ]
          }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: "/scripts/",
        watchContentBase: true
    },
    devtool: 'source-map'
}