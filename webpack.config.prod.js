const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

// rules and module are applied on file level (per each file)
// plugins - applied to the general workflow

module.exports = {
    mode: 'production',
    entry: './src/app.ts',
    output: {
        // filename: 'bundle.[contenthash].ts' <- WP will create unique hash
        filename: 'bundle.ts',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'none', // not to generate source maps
    module: {
        rules: [
            {
                test: /\.ts$/, // to test if webpack rule applies for each file: ends with .ts
                use: 'ts-loader',  // from dev dependencies
                exclude: [/node_modules/, /js/]
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ]
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
};
