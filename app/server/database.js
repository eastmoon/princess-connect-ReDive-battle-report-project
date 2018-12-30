// Library
import fs from "fs";
import path from "path";
import Lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

let databasePath = "";
databasePath = path.resolve(process.cwd(), "build");
if (!fs.existsSync(databasePath)) {
    console.log("> No build directory, create it.");
    fs.mkdirSync(databasePath);
}

databasePath = path.resolve(process.cwd(), "build/database");
if (!fs.existsSync(databasePath)) {
    console.log("> No database directory, create it.");
    fs.mkdirSync(databasePath);
}

databasePath = path.resolve(process.cwd(), "build/database/db.json");
if (!fs.existsSync(databasePath)) {
    console.log("> No database json, use default database from env/local/db.json.");
    const srcPath = path.resolve(process.cwd(), "conf/env/local/db.json");
    fs.copyFileSync(srcPath, databasePath);
}

module.exports = Lowdb(new FileSync(databasePath));
