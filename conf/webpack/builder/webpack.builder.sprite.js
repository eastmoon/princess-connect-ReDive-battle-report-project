// Webpack 第三方函式庫引用宣告
import SpritesmithPlugin from "webpack-spritesmith";
import path from "path";
// Webpack 編譯設定物件
import {webpackConfig} from "./webpack.builder.conf";
// Webpack 編譯工具
import {resolve} from "../utils/webpack.util";
// Webpack 編譯參數列舉
import {CONFIG} from "../enum/webpack.enum";

// 配置 Sprite (雪碧圖)
// 此函數會依據設定規劃 Sprite 輸出
export function configureSprite(config) {
    // 1. 若不存在設定檔，離開函數
    if (config.sprite === undefined) return;

    // 2. 逐一取得指定處理的位置與名稱
    Object.keys(config.sprite).forEach(sprite => {
        // 2.1 宣告目標圖片與樣式位置
        const targetPNG = resolve(`${CONFIG.PATHS.BUILD.TEMP}/${sprite}.png`);
        const targetSCSS = resolve(`${CONFIG.PATHS.BUILD.TEMP}/${sprite}.scss`);

        // 2.2 指定檔名為別名，並設定其路徑
        webpackConfig.resolve.alias[`${sprite}.png`] = targetPNG;
        webpackConfig.resolve.alias[`${sprite}.scss`] = targetSCSS;
        // 2.3 設定 Sprite 產生
        webpackConfig.plugins.push(new SpritesmithPlugin({
            // 圖檔來源與搜索副檔名
            src: {
                cwd: resolve(`${CONFIG.PATHS.SOURCE.ROOT}/${config.sprite[sprite]}`),
                glob: "**/*.png"
            },
            // 輸出檔名與路徑
            target: {
                image: targetPNG,
                css: targetSCSS
            },
            // 設定選項
            apiOptions: {
                generateSpriteName: function (fileName) {
                    var parsed = path.parse(fileName);
                    var dir = parsed.dir.split(path.sep);
                    var moduleName = dir[dir.length - 1];
                    return 'icon-' + moduleName + '-' + parsed.name;
                },
                cssImageRef: `~${sprite}.png`
            },
            spritesmithOptions: {
                padding: 5
            }
        }));
    });
};
