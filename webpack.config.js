module.exports = {
    entry: './main',
    output: { filename: "app.js" },
    module: {
        loaders: [
            {
                test: /.ts$/,
                loader: "ts-loader",
                exclude: 'node_modules'
            }
        ]
    },
    resolve: {
        extensions: ["", ".ts", ".js"]
    }
}