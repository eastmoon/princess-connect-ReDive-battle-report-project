// 編譯設定
export const CONFIG = {
    // 路徑設定
    PATHS: {
        // 編譯資料來源
        SOURCE: {
            // 資料來源根目錄
            ROOT: "app/client",
            // 資料來源子目錄 : 專案原始碼
            SCRIPTS: "scripts",
            // 資料來源子目錄 : 專案頁面進入點
            PAGES: "scripts/pages",
            // 資料來源子目錄 : 專案資源 (樣式、圖檔)
            ASSETS: "assets",
            // 資料來源子目錄 : 專案靜態檔案
            STATIC: "static",
            // 編譯環境參數
            CONF: "conf/env",
            // 第三方函式庫
            LIBRARY: "lib"
        },
        // 編譯結果
        BUILD: {
            // 編譯輸出根目錄
            ROOT: "build/publish",
            // 編譯輸出子目錄 : 專案函式庫
            SCRIPTS: "js",
            // 編譯輸出子目錄 : 專案圖檔
            ASSETS: "images",
            // 編譯輸出子目錄 : 專案樣式
            STYLES: "css",
            // 編譯輸出子目錄 : 專案字型
            TEXT_FORMAT: "front",
            // 編譯過程產出的暫存內容
            TEMP: "build/generated"
        },
}}
