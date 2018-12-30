// Library :
import Webpack from "webpack";
import chalk from "chalk";
//
import WebpackConfig from "../../webpack/webpack.config.babel";

// 編譯模組輸出
export function startupWebpack(config, callback) {
    console.log(chalk.black.bgGreen(">") + " Webpack compilation start.");
    // 1. Execute webpack configuration builder
    const webpackconfig = WebpackConfig();
    // 2. Execute webpack compilation.
    Webpack(webpackconfig, (err, stats) => {
        // The err object will only contain webpack-related issues, such as misconfiguration, etc.
        if (err) {
            console.log(chalk.black.bgRed("[WEBPACK]") + " webpack-related error issue.");
            console.error(err.stack || err);
            if (err.details) {
              console.error(err.details);
            }
            return;
        }
        // compilation errors and warnings handler
        const info = stats.toJson("minimal");
        if (stats.hasErrors()) {
            console.log(chalk.black.bgRed("[WEBPACK]") + " compile errors.");
            info.errors.forEach((log) => {
                console.error(log);
            });
        }
        if (stats.hasWarnings()) {
            console.log(chalk.black.bgYellow("[WEBPACK]") + " compile warnings.");
            info.warnings.forEach((log) => {
                console.error(log);
            });
        }
        // Done processing, and running callback function, if have one.
        console.log(chalk.black.bgGreen(">") + " Webpack compilation done.");
        if (callback && typeof callback === "function") {
            callback();
        }
    });
}
