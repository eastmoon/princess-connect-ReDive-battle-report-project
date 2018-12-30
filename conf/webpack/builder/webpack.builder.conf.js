// Webpack 第三方函式庫引用宣告
//import autoprefixer from "autoprefixer";
import CopyPlugin from "copy-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
// Webpack 編譯工具
import {production, resolve} from "../utils/webpack.util";
// Webpack 編譯參數列舉
import {CONFIG} from "../enum/webpack.enum";

// 配置 Webpack 編譯設定
export const webpackConfig = {
    // 頁面進入點，進入頁面設定於webpack.config.js
    entry: {},
    // 頁面輸出
    // filename : 對應進入點的 js 輸出
    // chunkFilename : 對應 chunk file 的 js 輸出
    output: {
        path: resolve(CONFIG.PATHS.BUILD.ROOT),
        filename: CONFIG.PATHS.BUILD.SCRIPTS + "/[name].[chunkhash:8].js",
        chunkFilename: CONFIG.PATHS.BUILD.SCRIPTS + "/[name]-[id].[chunkhash:8].js",
        publicPath: ""
    },
    // 檔案、路徑解析
    resolve: {
        // 指定擴展的副檔名
        extensions: [".js", ".jsx", ".css", ".sass", "scss"],
        // 指定模組相對路徑
        // CONFIG.PATHS.SOURCE.ROOT, CONFIG.PATHS.SOURCE.SCRITPS
        modules: ["node_modules", CONFIG.PATHS.SOURCE.ROOT, CONFIG.PATHS.SOURCE.SCRIPTS],
        // 指定模組別名
        alias: {}
    },
    // Webpack 編譯用模組
    module: {
        rules: [
            // JavaScript ES6 編譯模組
            // 對於版本支援度，採用babel-preset-env進行管控
            // ref : https://babeljs.io/docs/plugins/preset-env/
            // ref : https://python.freelycode.com/contribution/detail/715
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                include: resolve(CONFIG.PATHS.SOURCE.ROOT),
                options: {
                    presets: [["env", {
                        targets: {
                            browsers: ["ie >= 9"]
                        },
                        modules: false,
                        loose: true
                    }],"react", "stage-0"],
                    plugins: [
                        "transform-proto-to-assign"
                    ],
                    babelrc: false,
                    cacheDirectory: true
                }
            },
            // CSS 編譯模組
            // 針對所有位置來源的css檔案
            {
                test: /\.(css)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader", options: {
                            minimize: {safe: true},
                            sourceMap: true
                        }
                    }],
                    fallback: "style-loader",
                    publicPath: "../"
                })
            },
            // SCSS、SASS 編譯模組
            // 針對專案檔案夾下的程式
            {
                test: /\.(scss|sass)$/,
                include: resolve(CONFIG.PATHS.SOURCE.ROOT),
                exclude: /\.useable\.(css|scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader", options: {
                            minimize: {safe: true},
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true,
                            includePaths: [resolve("node_modules/compass-mixins/lib")]
                        }
                    }],
                    fallback: "style-loader",
                    publicPath: "../"
                })
            },
            // CSS useable, ref : https://github.com/webpack-contrib/style-loader#useable
            // 針對專案檔案夾下的程式，其檔名為[filename].useable.[css|scss|sass]
            {
                test: /\.useable\.(scss|sass)$/,
                include: resolve(CONFIG.PATHS.SOURCE.ROOT),
                use: [{
                    loader: "style-loader/useable"
                }, {
                    loader: "css-loader", options: {
                        minimize: {safe: true}
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true,
                        includePaths: [resolve("node_modules/compass-mixins/lib")]
                    }
                }]
            },
            // 影像資源檔案編譯模組
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: "url-loader",
                query: {
                    limit: 8192,
                    name: CONFIG.PATHS.BUILD.ASSETS + "/[name].[hash:8].[ext]"
                }
            },
            {
                test: /\.(swf)$/,
                loader: "file-loader",
                query: {
                    name: CONFIG.PATHS.BUILD.ASSETS + "/[name].[hash:8].[ext]"
                }
            },
            // 靜態文檔編譯模組；用於字型檔案
            {
                test: /.(woff|woff2|eot|ttf)$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: CONFIG.PATHS.BUILD.TEXT_FORMAT + "/[name].[hash:8].[ext]"
                }
            }
        ]
    },
    // Webpack 編譯插件；不同插件的執行時期會分編譯前後發生
    plugins: [
        // 擷取檔案插件，配合css-loader執行
        new ExtractTextPlugin({
            filename: CONFIG.PATHS.BUILD.STYLES + "/[name].[chunkhash:8].css",
            //disable: !production
        }),
        // 複製檔案
        new CopyPlugin([{from: resolve(CONFIG.PATHS.SOURCE.ROOT + "/" + CONFIG.PATHS.SOURCE.STATIC)}])
    ]
};
