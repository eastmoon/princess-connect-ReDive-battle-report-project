// Library :
import express from "express";
import http from "http";
import socket from "socket.io";
import chalk from "chalk";

// 工具
import {production} from "../utils/exporess.util";

export function startupServer(config, callback) {
    console.log(chalk.black.bgGreen(">") + " Expree server start.");
    // declare web server & socket
    const app = express();
    const server = http.Server(app);
    const io = socket(server);
    const port = config.port;

    // defined website folder
    app.use(express.static(process.cwd() + `/${config.public}`));

    const functional = require(process.cwd() + `/${config.server}`);
    functional(app, io);

    // Start server
    server.listen(port, () => {
        console.log(chalk.black.bgGreen(">") + ` Expree server on port : ${port}`);
    });
}
