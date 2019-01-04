import path from "path";
import db from "./database";

function parseTeamInfo(team) {
    const info = {
        member: "",
        star: ""
    };

    team.split(",").forEach((item, index) => {
        const result = item.split("@");
        if (index === 0) {
            info.member = result[0];
            info.star = typeof result[1] === "undefined" ? "0" : result[1];
        } else {
            info.member = `${info.member}-${result[0]}`;
            info.star = typeof result[1] === "undefined" ? `${info.star}-0` : `${info.star}-${result[1]}`;
        }
    });

    return info;
}
module.exports = (app, io) => {
    // declare socket.io input/output
    function onConnection(socket){
        socket.emit("initial connection", { version: db.get("version").value() });
        socket.on("initial connection", (data) => {
            console.log(data);
        });
        socket.on("search", (data) => {
            const team = parseTeamInfo(data.team.toString());
            // Search Algorithm
            // Make sure report list exist.
            if (db.has("report").value()) {
                // declare variable
                const report = db.get("report");
                // check team report exist, if not, create first report.
                if (report.has(team.member).value()) {
                    let result = [];
                    if (report.get(team.member).has(team.star).value()) {
                        console.log(`> report ${team.member} with ${team.star}`);
                        result = report.get(team.member).get(team.star).value();
                    }
                    console.log(result);
                    socket.emit("result", { detail: result });
                } else {
                    console.log(`> No ${team.member} report`);
                }
            }
        });
        socket.on("add", (data) => {
            // Parse data
            console.log(data);
            const teamA = data.teamA.toString().replace(/,/g, "-");
            const teamB = parseTeamInfo(data.teamB.toString());
            // Add Algorithm
            // Make sure report list exist.
            if (db.has("report").value()) {
                // declare variable
                const report = db.get("report");
                // check team report exist, if not, create first report.
                if (!report.has(teamB.member).value()) {
                    console.log(`> New report ${teamB}`);
                    report.set(teamB.member, {}).write();
                } else {
                    // Retrieve team report
                    let teamReport = report.get(teamB.member).value();
                    // Fix old version report
                    if (teamReport instanceof Array) {
                        console.log(`> Fix report ${teamB.member} to 1-1-1-1-1 star`);
                        report.set(teamB.member, {"1-1-1-1-1": teamReport}).write();
                    }
                    // Check and Retrieve report by star
                    if (!report.get(teamB.member).has(teamB.star).value()) {
                        console.log(`> New star ${teamB.star} in report ${teamB.member}`);
                        report.get(teamB.member).set(teamB.star, []).write();
                    }
                    teamReport = report.get(teamB.member).get(teamB.star);
                    // write vs team record in report, only write one time.
                    if (!teamReport.value().includes(teamA)) {
                        console.log(`> New record ${teamB.member} vs ${teamA}`);
                        teamReport.push(teamA).write();
                    }
                }
            }
        });
    }
    io.on("connection", onConnection);
}
