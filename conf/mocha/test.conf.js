// Library
// ref : https://mochajs.org/
// ref : https://www.npmjs.com/package/mocha-multi
import glob from "glob";
import Moment from "moment";
import Mocha from "mocha";
import MochaConf from "./mocha.conf";
// Mocha-multi options
const reporterOptions = {
    Progress: {
        stdout: "/tmp/mocha-multi.Progress.out",
        options: {
            verbose: true
        }
    },
    dot: "-"
};
// 編譯模組輸出
module.exports = (config, pattern) => {
    //
    const rootPath = config.ROOT ? config.ROOT : "test";
    const reportPath = config.REPORT ? config.REPORT : "report";
    // Setting report outputDir
    reporterOptions.json = `${reportPath}/mocha.json.reporter.${Moment.now()}.json`;
    // Instantiate a Mocha instance.
    MochaConf.reporter = "mocha-multi";
    MochaConf.reporterOptions = reporterOptions;
    var mocha = new Mocha(MochaConf);
    // Add test file
    // pattern setting, if pattern use at floder, but can't find any file, then change pattern to find file.
    let reg = `${rootPath}/**/*.js`;
    if (pattern !== "") {
        reg = `${rootPath}/**/*${pattern}*/**/*.js`;
        if (!glob.sync(reg).length) {
            reg = `${rootPath}/**/*${pattern}*.js`;
        }
    }
    glob(reg, {}, (err, matches) => {
        if (!err) {
            matches.forEach((path) => {
                mocha.addFile(path);
            });
        }
        // Run the tests.
        mocha.run((failures) => {
            process.on('exit', function () {
                process.exit(failures);  // exit with non-zero status if there were failures
            });
        });
    });
}
