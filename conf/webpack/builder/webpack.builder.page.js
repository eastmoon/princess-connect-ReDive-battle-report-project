// Webpack 第三方函式庫引用宣告
import webpack from "webpack";
import HTMLPlugin from "html-webpack-plugin";
// Webpack 編譯設定物件
import {webpackConfig} from "./webpack.builder.conf";
// Webpack 編譯工具
import {production, resolve} from "../utils/webpack.util";
// Webpack 編譯參數列舉
import {CONFIG} from "../enum/webpack.enum";

// 配至頁面
// 此函數會依據設定檔規劃需編譯的頁面(進入點)
export function configurePages(config) {
    // 0. 變數宣告
    const libChunks = [];
    const pageChunks = [];

    // 1. 依據 config.lib 設定，配置共通用途的第三方函式庫
    Object.keys(config.lib).forEach((name) => {
        // 1.1 宣告變數
        const chunks = [];
        // 1.2 若有頁面使用此第三方函式庫
        Object.keys(config.pages).forEach((pageName) => {
            if (config.pages[pageName].lib.includes(name)) {
                // 保存 page 資料於 chunk 資訊，並設定此頁為必須重整頁面
                chunks.push(pageName);
                if (!pageChunks.includes(pageName)) {
                    pageChunks.push(pageName);
                }
                // 抽離共通於第三方函式庫程式
                webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
                    name: name,
                    chunks: [name, pageName]
                }));
            }
        });
        // 1.3 第三方至少有一個 pages 使用到才設置到 entry
        if (chunks.length > 0) {
            webpackConfig.entry[name] = config.lib[name];
            libChunks.push(name);
        }
    });

    // 2.1 由引用有函式庫的頁面，抽出其中的共通模塊，單一模塊只要存在於 2 個 chunk 即抽出。
    // 抽出模塊會包括第三方函式庫、專案框架、工具等。
    // duplicate page core move to common chunk, it will have project common code and third-party library.
    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: "common",
        chunks: pageChunks,
        minChunks: 2
    }));

    // 2.3 抽出第三方函式庫共通的函式庫核心。
    /*
    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: "lib-core",
        chunks: libChunks
    }));
    */

    // 2.4 指定產生 manifest 檔案；將 Webpack 操作檔案轉為共通函式庫
    // duplicate library core move to manifest
    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
    }));

    // 3. 依據 config.pages 設定，配置需編譯輸出的頁面進入點
    Object.keys(config.pages).forEach((name) => {
        // 3.1 宣告變數
        const page = config.pages[name];
        pageChunks.push(name);
        // 3.2 指定進入點檔名與對應的頁面程式碼
        webpackConfig.entry[name] = resolve(CONFIG.PATHS.SOURCE.ROOT + "/" + CONFIG.PATHS.SOURCE.PAGES + `/${page.js}`);
        // 3.3 宣告程式碼壓縮格式
        const minify = {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        };
        // 3.4 設定對應的 HTML 程式樣板
        // template : 指定樣版程式碼
        // chunks : 指定該樣版編譯時會引用的 chunk，以此為例，引用 page 本身與對應的共通函式庫 (第三方、manifest)
        // favicon : faviconw圖檔路徑，通過 webpack 引入同時可以生成 hash 值
        // chunksSortMode : 調整chunk的順序如同指定的列表
        const chunkList = ["manifest", "lib-core", ...page.lib, "common", name];
        webpackConfig.plugins.push(new HTMLPlugin({
            filename: `${name}.html`,
            template: resolve(CONFIG.PATHS.SOURCE.ROOT + "/" + CONFIG.PATHS.SOURCE.PAGES + `/${page.template}`),
            favicon: resolve(CONFIG.PATHS.SOURCE.ROOT + "/" + `/${config.favicon}`),
            chunks: chunkList,
            chunksSortMode: (chunk1, chunk2) => {
                let index1 = chunkList.indexOf(chunk1.names[0]);
                let index2 = chunkList.indexOf(chunk2.names[0]);
                return index1 - index2;
            },
            minify: production ? minify : false
        }));
    });
}
