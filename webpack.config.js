const webpack = require("webpack");

module.exports = {
    entry: './index.js',
    context: __dirname,
    plugins: [
        new webpack.NamedModulesPlugin()
    ],
    loader: {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-laoder',
        query: {
            presets: ['es2015']
        }
    },
    devServer: {
        contentBase: ["app"],
        port: 9000
    }
}