// Library
import React from "react";

// Modules
import Report from "modules/report";

// utils
import Socket from "utils/socketio";

export default class Content extends React.PureComponent {
    constructor() {
        super();
        //
        this.teamA = null;
        this.teamB = null;
        // Register Event
        window.addEventListener("search", (evnet) => {
            const info = {team: event.detail};
            Socket.emit("search", info);
        });
    }
    render() {
        return <div>
            <hr />
            <div className="center">
                <h3> ≡≡≡≡≡ 搜尋結果 ≡≡≡≡≡ </h3>
                <Report />
                <h3> ≡≡≡≡≡ 搜尋結果 ≡≡≡≡≡ </h3>
            </div>
            <hr />
        </div>;
    }
}
