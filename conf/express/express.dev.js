//
import nodemonStartup from "./startup/nodemon.startup";

// 編譯模組輸出
module.exports = (config) => {
    nodemonStartup(config);
}

module.exports({
    // 測試檔案根目錄
    ROOT: "app",
    // 監測檔案類型
    EXT: "html js jsx css sass scss json",
    // 執行程式
    DEVELOP: "conf/express/express.config.js"
});
