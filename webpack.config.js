const path = require('path');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8085
    },
    entry: './src/app.ts',
    output: {
       // filename: 'bundle.[contenthash].ts' <- WP will create unique hash
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist' // required for WP dev server to serve instantly
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/, // to test if webpack rule applies for each file: ends with .ts
                use: 'ts-loader',  // from dev dependencies
                exclude: [/node_modules/, /js/]
            }
        ]
    },
    watch: true,
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ]
    }
};
