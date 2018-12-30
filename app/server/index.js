import path from "path";
import Lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const db = Lowdb(new FileSync(path.resolve(process.cwd(), "database/db.json")));

module.exports = (app, io) => {
    // declare socket.io input/output
    function onConnection(socket){
        socket.emit("news", { hello: "world" });
        socket.on("frontend call", (data) => {
            console.log(data);
        });
        socket.on("search", (data) => {
            const team = data.team.toString().replace(/,/g, "-");
            // Search Algorithm
            // Make sure report list exist.
            if (db.has("report").value()) {
                // declare variable
                const report = db.get("report");
                // check team report exist, if not, create first report.
                if (report.has(team).value()) {
                    console.log(`> report ${team}`);
                    const result = report.get(team).value();
                    console.log(result);
                    socket.emit("result", { detail: result });
                } else {
                    console.log(`> No ${team} report`);
                }
            }
        });
        socket.on("add", (data) => {
            // Parse data
            console.log(data);
            const teamA = data.teamA.toString().replace(/,/g, "-");
            const teamB = data.teamB.toString().replace(/,/g, "-");
            // Add Algorithm
            // Make sure report list exist.
            if (db.has("report").value()) {
                // declare variable
                const report = db.get("report");
                // check team report exist, if not, create first report.
                if (!report.has(teamB).value()) {
                    console.log(`> New report ${teamB}`);
                    report.set(teamB, []).write();
                }
                // write vs team record in report, only write one time.
                if (!report.get(teamB).value().includes(teamA)) {
                    console.log(`> New record ${teamA} vs ${teamB}`);
                    report.get(teamB)
                          .push(teamA)
                          .write();
                }
            }
        });
    }
    io.on("connection", onConnection);
}
