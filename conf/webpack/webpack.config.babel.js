// Webpack 第三方函式庫引用宣告
const webpack = require("webpack");
// Webpack 編譯函式庫
const webpacklib = require("./builder/webpack.builder");

// 編譯配置
module.exports = () => {
    // 編譯設定
    const config = {
        // 共通函式庫設定
    		lib: {
            "framework": [
                "babel-polyfill", "browser-polyfill", "socket.io-client",
                "react", "react-dom", "react-cookie",
                "redux", "react-redux", "redux-saga"
          	],
            "utils": [
                "rsvp"
            ]
    		},
        // 頁面設定
    		pages: {
            "record": {
                js: "record/index.jsx",
                template: "record/index.html",
                lib: ["framework", "utils"]
            },
            "index": {
                js: "search/index.jsx",
                template: "search/index.html",
                lib: ["framework", "utils"]
            }
        },
        // Sprite 設定
    		sprite: {
    			   "sprite": "assets/sprites"
    		},
        // 文件檢查排除檔案夾
        /* lint: { exclude: "legacy" }, */
        // 環境參數檔名
        sys: "sys.json",
        // 專案參數檔名
        app: "app.json",
        // favicon 檔案位置
        favicon: "assets/images/favicon.ico",
        // 編譯設定
        provide: {},
        // 別名設定
        // 此項參數除非特別需求，否則請勿任意增加使第三方函式間的關聯無法閱讀
        alias: {
            "browser-polyfill": "lib/browser-polyfill"
        }
    };
    const module = webpacklib(config);
    return module;
};
