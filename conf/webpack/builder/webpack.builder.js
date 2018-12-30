// ref : webpack 2.0 configuration, https://webpack.js.org/configuration/
// Webpack 第三方函式庫引用宣告
const webpack = require("webpack");
const CleanPlugin = require("clean-webpack-plugin");

// Webpack 編譯設定物件
import {webpackConfig} from "./webpack.builder.conf";
// Webpack 開發環境設定函數
import {configureDevServer} from "./webpack.builder.dev";
// Webpack 進入頁面設定函數
import {configurePages} from "./webpack.builder.page";
// Webpack 雪碧圖(sprite)設定函數
import {configureSprite} from "./webpack.builder.sprite";
// Webpack 文件檢查(ESlint, Stylelint)設定函數
import {configureLint} from "./webpack.builder.lint";
// 參數驗證函數
import {validate} from "../utils/webpack.validator";
// Webpack 編譯工具
import {production, envType, readJSON, resolve} from "../utils/webpack.util";
// Webpack 編譯參數列舉
import {CONFIG} from "../enum/webpack.enum";

function configureSystem(env, config) {
    // 依據環境設定檔案，修正編譯設定的參數
    if (config.sys === undefined) return;
    // 1. 取得環境設定檔案
    const sys = readJSON(`${CONFIG.PATHS.SOURCE.CONF}/${env}/${config.sys}`);
    // 2. 若存在參數，將原有參數替代
    if (sys.publicPath) {
        webpackConfig.output.publicPath = sys.publicPath;
    }
}

function configureProvide(config) {
    // 若設定參數內有提供內容，將此內容以插件形式放入編譯設定
    if (config.provide === undefined) return;
    webpackConfig.plugins.push(new webpack.ProvidePlugin(config.provide));
}

function configureAlias(env, config) {
    // 指定別名 conf，lib 與對應的檔案夾
    webpackConfig.resolve.alias = {
        conf: resolve( CONFIG.PATHS.SOURCE.CONF + `/${env}`),
        lib: resolve( CONFIG.PATHS.SOURCE.LIBRARY)
    };
    // 合併設定檔別名
    if (config.alias === undefined) return;
    webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias, config.alias);
}

// 編譯模組輸出
module.exports = (config) => {

    // 取得環境設定參數，若無環境指定，指定為本地
    let env = envType;
    if (env === undefined) env = "local";

    // 驗證參數是否合法
    //validate(env, config);
    // 配置別名
    configureAlias(env, config);
    // 配置進入頁面 (Entry page)
    configurePages(config);
    // 配置雪碧圖(sprite)
    configureSprite(config);
    // 配置文件檢查
    configureLint(config);
    // 配置提供設定
    configureProvide(config);
    // 配置系統參數
    configureSystem(env, config);


    // 指定開發工具
    webpackConfig.devtool = production ? "source-map" : "cheap-module-source-map";

    // 宣告 Commit Hash 變數，透過執行命令取得字串。
    const commitHash = "1234567890";
    const pluginInfo = {
        "process.env": {
            NODE_ENV: (!production) ? JSON.stringify("development") : JSON.stringify("production"),
            BUILD_ENV: JSON.stringify(env),
            COMMIT_HASH: JSON.stringify(commitHash)
        },
    }

    // 依據開發、生產版本，配置對應的檢測工具
    if (!production) {
        // 開發版本，以設定函數處理編譯設定
        configureDevServer(config);
        // 使用額外插件
        webpackConfig.plugins.push(...[
            // 設定宣告參數
            new webpack.DefinePlugin(pluginInfo),
        ]);
    } else {
        // 產品版本
        webpackConfig.bail = true;
        // 使用額外插件
        webpackConfig.plugins.push(...[
            // 移除不必要的檔案夾，此為舊編譯結果
            new CleanPlugin(resolve(CONFIG.PATHS.BUILD.ROOT), {root: resolve("")}),
            // 設定宣告參數
            new webpack.DefinePlugin(pluginInfo),
            // 設定精簡壓縮輸出的 JavaScript
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
        			dead_code: true,
        			unused: true,
        			drop_console: true
        		},
        		output: {
        			comments: false
        		}
            })
        ]);
    }
    return webpackConfig;
};
