const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
    
    module.exports ={
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module :{
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    } 
                },
                { 
                    test: /\.css$/,
                    use: ['style-loader','css-loader']
                },{
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    exclude: /node_modules/,
                    loader: 'url-loader',
                    options:{
                        publicPath: './src/fonts',
                        name: './src/fonts/[name].[ext]',
                        limit: 1000
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ]
    }