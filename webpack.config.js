var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {
    // Single entry point at index.js.
    entry: ["./src/index.js"],
    // Output React App bundle to distribution folder.
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    // Resolve TypeScript and JavaScript extensions.
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            // .ts and .tsx TypeScript files get transpiles by TypeScript loader.
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            // .js and .jsx JavaScript files get transpiled by babel loader's env and react presets.
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['env', 'react']
                }
            }
        ]
    },
    plugins: [
        // Copy public assets to dist.
        new CopyWebpackPlugin([{
            from: "assets/*"
        }]),
        // Generate index.html template for dist.
        new HtmlWebpackPlugin({
            title: "Rss Reader"
        }),
        // Include public asset links in index template.
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [{ path: "assets", glob: '*', globPath: 'assets/' }],
            cssExtensions: ['.css'],
            append: true
        })
    ]
}