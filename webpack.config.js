const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    // template: path.resolve(folderSrc, 'index.html'),
    filename: 'index.html',
    hash: true
});
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const csslPlugin = new MiniCssExtractPlugin({
    template: "./src/css/styles.css"
});


module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    devtool: 'source-map',
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src/css'),
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/i,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }]
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                processive: true,
                                quality: 98
                            }
                        }
                    }
                ]
            },
        ],
    },
    plugins: [htmlPlugin, csslPlugin],
};