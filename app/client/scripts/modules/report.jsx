// Library
import React from "react";

// Modules
import Team from "./team";

// Utils
import Socket from "utils/socketio";

export default class Report extends React.PureComponent {
    constructor() {
        super();
        this.state = {reports: []};
    }
    componentDidMount() {
        // Register socket
        Socket.on("result", (data) => {
            console.log(data);
            this.setState({reports: data.detail});
        });
    }
    renderTeam() {
        const list = [];
        const {reports} = this.state;
        if (reports.length > 0) {
            list.push(<h2>共有{reports.length}筆戰報</h2>);
            reports.forEach((report, index) => {
                console.log(`> report : ${report.split("-")}`);
                list.push(<Team key={report} members={report.split("-")} />);
            });
        } else {
            list.push(<h2>此對戰對象尚可對應隊伍</h2>);
        }
        return list;
    }
    render() {
        return <div>
            {this.renderTeam()}
        </div>;
    }
}
