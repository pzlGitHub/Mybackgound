/*
    webpack配置
    1.入口，输出文件，
    2.css配置（抽离css插件，编译css插件，css压缩插件）
    3.图片配置（html和css图片引入） 功能：图片压缩，图片解析  全部变成编码
    4.插件功能配置
        css输出路径
        html输出路径，模板，压缩html功能
        下载最新的打包文件，前面的文件都删除的插件
    5.监控插件

    压缩js文件命令行
    uglifyjs ./src/js/index.js -o index.min.js
    css压缩插件
    cnpm install postcss-loader autoprefixer cssnano postcss-cssnext -D

    外引入的工具库文件，需要自己手动放位置 如BootStrap库
*/

var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/demo'
    },
    output: {
        path: path.resolve(__dirname, 'dist/src'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 先用css-loader在用MiniCssExtractPlugin.loader工具
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // 针对什么插件 
                            ident: 'postcss',
                            // 引用插件的功能
                            plugins: [
                                // 添加前缀和解析less独特的语法的插件
                                require('postcss-cssnext')(),
                                // 压缩打包后的css文件
                                require('cssnano')()
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: [
                    // 图片解析 打包成图片还是base64编码
                    {
                        loader: "url-loader",
                        options: {
                            // [ext] 找到引入的图片格式，生成一样的图片格式
                            name: '[name].[ext]',
                            // 限制图片大小 单位字节  <=100kb 编译base64编码 大于就不编译
                            limit: 1000000,
                            // 若不是base64编码，则输出图片到images文件夹下面
                            outputPath: 'images',
                        }
                    },
                    // 图片压缩
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                // 执行插件内的关于png格式图片压缩功能
                                require('imagemin-pngquant')({
                                    // 压缩的体积  压缩  最少0 - 最完美1
                                    quality: [0.3, 0.5]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        // 处理html文件引入的一些内容 的插件
                        loader: 'html-loader',
                        options: {
                            attrs:['img:src']
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            // 输出的html
            filename: 'index.html',
            // 模板
            template: './src/index.html',
            // 压缩
            minify: {
                // 去除注释 和 空格
                removeComments: true,
                // collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin(),
    ],
    mode: 'development'
}

// 实现html自动加载js和css
