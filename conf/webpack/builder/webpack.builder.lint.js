// Webpack 第三方函式庫引用宣告
import StylelintPlugin from "stylelint-webpack-plugin";
// Webpack 編譯設定物件
import {webpackConfig} from "./webpack.builder.conf";
// Webpack 編譯工具
import {production, resolve} from "../utils/webpack.util";
// Webpack 編譯參數列舉
import {CONFIG} from "../enum/webpack.enum";

function configureESLint(config) {
    // 1. 設定模組，使 js、jsx 受 ESlint 檢查，以確保程式編寫風格正確
    const eslintRule = {
        test: /\.(js|jsx)$/,
        loader: "eslint-loader",
        include: resolve(CONFIG.PATHS.SOURCE.ROOT),
        enforce: "pre",
        options: {
            parser: "babel-eslint",
            configFile: resolve("conf/lint/eslint.json"),
            parserOptions: {sourceType: "module", ecmaFeatures: {jsx: true}},
            envs: ["es6", "browser", "node"],
            failOnWarning: true,
            failOnError: true
        }
    };

    // 2. 依據開發、產品變更檢查項目

    // 3. 若存在Provide，將內容指定為全域
    if (config.provide !== undefined) {
        eslintRule.options.globals = Object.keys(config.provide);
    }

    // 4. 指定不處理檔案夾位置
    if (config.lint !== undefined && config.lint.exclude !== undefined) {
        eslintRule.exclude = resolve(`${CONFIG.PATHS.SOURCE.ROOT}/${CONFIG.PATHS.SOURCE.SCRIPTS}/${config.lint.exclude}`);
    }

    // 5. 將ESlint規則放入Webpack編譯設定
    webpackConfig.module.rules.push(eslintRule);
}

function configureStylelint(config) {
    // 1. 設定 SCSS、SASS 檔案受 Stylelint 檢查
    const options = {
        configFile: resolve("conf/lint/stylelint.json"),
        context: resolve(CONFIG.PATHS.SOURCE.ROOT),
        files: "**/*.s[ac]ss",
        syntax: "scss"
    };

    // 2. 指定不處理檔案夾位置與下屬的樣式檔案
    if (config.lint !== undefined && config.lint.exclude !== undefined) {
        options.files = `!(${config.lint.exclude})/**/*.s[ac]ss`;
    }

    // 3. 將Stylelint規則放入Webpack編譯設定
    webpackConfig.plugins.push(new StylelintPlugin(options));
}

export function configureLint(config) {
    configureESLint(config);
    //configureStylelint(config);
}
