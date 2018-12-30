// Library
import React from "react";

// Modules
import Team from "pages/modules/team";
import Report from "pages/modules/report";

// utils
import Socket from "utils/socketio";

export default class Content extends React.PureComponent {
    constructor() {
        super();
        //
        this.teamA = null;
        this.teamB = null;
        // Register Event
        window.addEventListener("groupTeam", (evnet) => {
            this.groupTeam(event);
        });
    }
    add() {
        console.log("> Add new report");
        const info = {
            teamA: this.teamA.members(),
            teamB: this.teamB.members()
        };
        Socket.emit("add", info);
    }
    search() {
        console.log("> Search report");
        const info = {team: this.teamB.members()};
        Socket.emit("search", info);
    }
    groupTeam(evnet) {
        const {camp, team} = event.detail;
        if (camp === "A") {
            this.teamA.add(team);
        }
        if (camp === "B") {
            this.teamB.add(team);
        }
    }
    render() {
        return <div>
            <hr />
            <table width="100%">
                <tr>
                    <th width="50%">
                        己方
                    </th>
                    <th width="50%">
                        敵方
                    </th>
                </tr>
                <tr>
                    <th width="50%">
                        <Team ref={(ref) => { this.teamA = ref; }} />
                    </th>
                    <th width="50%">
                        <Team ref={(ref) => { this.teamB = ref; }} />
                    </th>
                </tr>
                <tr>
                    <th width="50%">
                        <button onClick={() => { this.add(); }}>新增</button>
                    </th>
                    <th width="50%">
                        <button onClick={() => { this.search(); }}>搜尋</button>
                    </th>
                </tr>
            </table>
            <hr />
                <Report />
            <hr />
        </div>;
    }
}
