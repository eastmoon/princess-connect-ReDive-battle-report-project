// Library
import nodemon from "nodemon";
import chalk from "chalk";
import path from "path";

// default options for config.options
module.exports = (config) => {
    //
    const rootPath = config.ROOT ? config.ROOT : "app";
    const watchType = config.EXT ? config.EXT : "js jsx json";
    const execFile = config.DEVELOP ? config.DEVELOP : "";
    if (execFile === "") {
        return false;
    }
    nodemon({
        restartable: "rs",
        verbose: true,
        exec: `babel-node ${path.resolve(process.cwd(), execFile)}`,
        watch: [rootPath],
        ext: watchType,
        env: {
          "NODE_ENV": "development"
        }
    });
    //
    nodemon.on("start", function () {
        console.log(chalk.black.bgCyan("[NODEMON]") + ` Development model start`);
    });
    nodemon.on("quit", function () {
        console.log(chalk.black.bgRed("[NODEMON]") + " Development has quit.");
        process.exit();
    });
    nodemon.on("restart", function (file) {
        console.log(chalk.black.bgRed("[NODEMON]") + " Modify : ", file);
    });
}
