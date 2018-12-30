// Library :
import Webpack from "webpack";
import chalk from "chalk";
// 編譯前端頁面
import {startupWebpack} from "./express.startup.webpack";
// 執行後端伺服器
import {startupServer} from "./express.startup.server";
// 工具
import {production} from "../utils/exporess.util";

// 編譯模組輸出
module.exports = (config) => {
    startupWebpack(config, () => {
        startupServer(config);
    });
}
