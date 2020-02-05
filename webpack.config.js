const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const { basename } = require('path')

module.exports = {
    module: {
        rules: [
            {
                test: /\.js&/,
                exclude: /node_modules/,
                use: [{loader: "babel-loader"}]
            },
            {
                test: /\.html$/,
                use: [{loader: "html-loader", options: {minimize: true}}]
            },
            {
               test: /\.(png|svg|jpg|gif)$/,
               use: ["file-loader"]
            },
            {
                test: /\.png$/,
                use: ["file-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new FaviconsWebpackPlugin({
            logo: "./src/public/img/favicon.png",
            outputPath: './assets/',
            cache: true,
            inject: htmlPlugin => basename(htmlPlugin.options.filename) === 'index.html'
        })
    ]
}