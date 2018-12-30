// Webpack 第三方函式庫引用宣告
import webpack from "webpack";
// Webpack 編譯設定物件
import {webpackConfig} from "./webpack.builder.conf";
// DevServer proxy 設定
import {devServerProxyConfig} from "../enum/webpack.enum.proxy";
// Webpack 編譯工具
import {devServerProxy} from "../utils/webpack.util";
// 啟動 proxy server
require('http-proxy').createProxyServer();

// Webpack 開發環境設定
// 啟用開發伺服器，並設定開發平台應使用參數與插見。
export function configureDevServer(config) {
    // 1. 改變輸出對應的檔名
    // HMR requires non-chunkhash
    webpackConfig.output.filename = "js/[name].[hash:8].js";

    // Create entry router.
    const rewrites = [];
    Object.keys(config.pages).forEach((pageName) => {
        rewrites.push({from: new RegExp(`\/${pageName}`), to: `/${pageName}.html`});
    });

    // 2. 設定開發伺服器參數
    // 2.1 基本參數設定
    webpackConfig.devServer = {
        port: 9080,
        historyApiFallback: {rewrites: rewrites},
        hot: true,
        inline: true,
        compress: true,
        stats: "minimal",
        overlay: {
            warnings: true,
            errors: true
        }
    };
    // 2.2 proxy 設定, 依據輸入參數 --devProxy=[proxy name
    if (typeof devServerProxyType === "undefined" ||
    (typeof devServerProxyType !== "undefined" && typeof devServerProxyConfig[devServerProxyType] === "undefined")) {
        webpackConfig.devServer.proxy = devServerProxyConfig[devServerProxyConfig.proxyDefault];
    } else {
        webpackConfig.devServer.proxy = devServerProxyConfig[devServerProxyType];
    }

    // 3. 使用額外插件
    webpackConfig.plugins.push(
        // 在開發時返回更新的檔案名稱，而非檔案id
        new webpack.NamedModulesPlugin(),
        // 可於開發伺服器執行期間，動態將編譯結果，新增、移除、替換到伺服器上的執行環境內
        new webpack.HotModuleReplacementPlugin()
    );
}
