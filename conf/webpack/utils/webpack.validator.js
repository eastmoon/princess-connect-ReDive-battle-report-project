// Webpack 第三方函式庫引用宣告
import fs from "fs";
import glob from "glob";
// Webpack 編譯工具
import {production, resolve} from "./webpack.util";
// Webpack 編譯參數列舉
import {CONFIG} from "../enum/webpack.enum";

const errors = [];

// 檢測檔案是否存在
function assertFileExists(relativePath, key) {
    const absolutePath = resolve(relativePath);
    if (!fs.existsSync(absolutePath)) {
        errors.push(`${key} => file does not exist, path=${absolutePath}`);
    }
}

// 檢測檔案夾是否存在
function assertDirExists(relativePath, key) {
    const absolutePath = resolve(relativePath);
    // 1. 確定路徑正確
    if (!fs.existsSync(absolutePath)) {
        errors.push(`${key} => path does not exist, path=${absolutePath}`);
        return false;
    }
    // 2. 確定為檔案夾
    if (!fs.statSync(absolutePath).isDirectory()) {
        errors.push(`${key} => path is not directory, path=${absolutePath}`);
        return false;
    }
    return true;
}

// 驗證第三方函式庫
function validateLib(config, usedLib) {
    // 檢測設定的資料庫Chunk是否皆使用
    Object.keys(config.lib).forEach(lib => {
        if (!usedLib.has(lib)) {
            errors.push(`config.lib["${lib}"] => lib is not used by any page, lib=${lib}`);
        }
    });
}

// 驗證進入頁面
function validatePages(config, usedLib) {
    Object.keys(config.pages).forEach(pageName => {
        // 1. 取得進入頁面設定參數
        const page = config.pages[pageName];
        // 2. 檢測進入頁面必要檔案
        assertFileExists(`${CONFIG.PATHS.SOURCE.ROOT}/${CONFIG.PATHS.SOURCE.PAGES}/${page.js}`, `config.pages["${pageName}"].js`);
        assertFileExists(`${CONFIG.PATHS.SOURCE.ROOT}/${CONFIG.PATHS.SOURCE.PAGES}/${page.template}`, `config.pages["${pageName}"].template`);
        // 3. 確認相依資料庫是否設定
        page.lib.forEach(lib => {
            if (config.lib[lib] === undefined) {
                errors.push(`config.pages["${pageName}"].lib => lib is not defined in config.lib, lib=${lib}`);
            } else {
                usedLib.add(lib);
            }
        });
    });
}

// 驗證雪碧圖
function validateSprite(config) {
    if (config.sprite === undefined) {
        return;
    }
    Object.keys(config.sprite).forEach(sprite => {
        // 1. 依據設定參數取得對應的資料夾
        const imageDir = resolve(`${CONFIG.PATHS.SOURCE.ROOT}/${config.sprite[sprite]}`);
        const dirExists = assertDirExists(`${CONFIG.PATHS.SOURCE.ROOT}/${config.sprite[sprite]}`, `config.sprite["${sprite}"]`);
        // 2. 檢測資料夾下是否存在png圖
        if (dirExists) {
            const images = glob.sync("**/*.png", {cwd: imageDir});
            if (images.length === 0) {
                errors.push(`config.sprite["${sprite}"] => image dir does not contain any png image, path=${imageDir}`);
            }
        }
    });
}

// 驗證環境參數檔
function validateSys(env, config) {
    if (config.sys === undefined) {
        return;
    }
    assertFileExists(`${CONFIG.PATHS.SOURCE.CONF}/${env}/${config.sys}`, "config.sys");
}

// 驗證排除文件檢查檔夾
function validateLint(config) {
    if (config.lint === undefined || config.lint.exclude === undefined) {
        return;
    }
    assertDirExists(`${CONFIG.PATHS.SOURCE.ROOT}/${CONFIG.PATHS.SOURCE.SCRIPTS}/${config.lint.exclude}`, "config.lint.exclude");
}

// 驗證函數
export function validate(env, config) {
    // 宣告使用中函式庫
    const usedLib = new Set();

    // 驗證進入頁面是否存在
    validatePages(config, usedLib);
    // 驗證函式庫使用狀態
    validateLib(config, usedLib);
    // 驗證雪碧圖是否不為空檔案夾
    validateSprite(config);

    if (production) {
        // 驗證環境參數檔案是否存在
        validateSys(env, config);
        // 驗證排除文件檢查檔案夾是否存在
        validateLint(config);
    }

    // 列出驗證錯誤
    if (errors.length > 0) {
        console.error("validation failed, please fix the following errors:");
        errors.forEach(error => {
            console.error("  ", error);
        });
        console.log();
        process.exit(1);
    }
}
