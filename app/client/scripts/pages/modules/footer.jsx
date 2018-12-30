// Library
import React from "react";
// Modules
import Team from "pages/modules/team";
// Utils
import {paddingZero} from "./utils";

export default class Footer extends React.PureComponent {
    constructor() {
        super();
        this.team = null;
        this.iconSize = 56;
    }
    chooseATeam() {
        console.log("> Choose A Team: ", this.team.members());
        const info = {
            camp: "A",
            team: this.team.members()
        };
        const event = new CustomEvent("groupTeam", {detail: info});
        window.dispatchEvent(event);
    }
    chooseBTeam() {
        console.log("> Choose B Team: ", this.team.members());
        const info = {
            camp: "B",
            team: this.team.members()
        };
        const event = new CustomEvent("groupTeam", {detail: info});
        window.dispatchEvent(event);
    }
    chooseTarget(index) {
        console.log("> Choose : ", index);
        this.team.add(paddingZero(index, 3));
    }
    renderIcon() {
        const icons = [];
        for (let count = 1; count <= this.iconSize; count += 1) {
            const iconPath = `./icons/${paddingZero(count, 3)}.png`;
            icons.push(<img src={iconPath} onClick={
              () => { this.chooseTarget(count); }
            }/>);
        }
        return icons;
    }
    render() {
        return <div>
            <div className="footer">
                <Team ref={
                    (ref) => {
                        this.team = ref;
                    }
                }/>
                <table width="100%">
                    <tr>
                        <th width="50%">
                            <button onClick={() => { this.chooseATeam(); }}>己方</button>
                        </th>
                        <th width="50%">
                            <button onClick={() => { this.chooseBTeam(); }}>敵方</button>
                        </th>
                    </tr>
                </table>
                <hr />
                {this.renderIcon()}
            </div>
        </div>;
    }
}
