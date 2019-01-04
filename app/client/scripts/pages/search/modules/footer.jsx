// Library
import React from "react";
// Modules
import Team from "modules/team";
// Utils
import {paddingZero} from "utils/format";
// Environemt enum
import {character} from "conf/position.json";

export default class Footer extends React.PureComponent {
    constructor() {
        super();
        this.team = null;
        this.characterPositionList = character;
        this.targetGroup = [];
    }
    search() {
        // Send group information to B team.
        console.log("> Search: ", this.team.members());
        const event = new CustomEvent("search", {detail: this.team.members()});
        window.dispatchEvent(event);
    }
    chooseTarget(cid) {
        console.log("> Choose : ", cid, this.characterPositionList.indexOf(cid), this.targetGroup.indexOf(cid));
        if (this.targetGroup.length < 5 || (this.targetGroup.length === 5 && this.targetGroup.indexOf(cid) >= 0)) {
            // character-id exist in group, remove this id, not exist push in.
            this.removeExistTarget(cid);
            //
            this.sortTargetGroup();
            //
            const characterStr = this.generateTeamList();
            this.team.add(characterStr);
        }
    }
    removeExistTarget(cid) {
        if (this.targetGroup.indexOf(cid) < 0) {
            this.targetGroup.push(cid);
        } else {
            this.targetGroup.splice(this.targetGroup.indexOf(cid), 1);
        }
    }
    sortTargetGroup() {
        this.targetGroup.sort((cid1, cid2) => {
            console.log(this.characterPositionList.indexOf(cid1), this.characterPositionList.indexOf(cid2));
            return this.characterPositionList.indexOf(cid1) - this.characterPositionList.indexOf(cid2);
        });
    }
    generateTeamList() {
        const list = [];
        for (let count = 0; count < 5; count += 1) {
            if (count < this.targetGroup.length) {
                list.push(paddingZero(this.targetGroup[count], 3));
            } else {
                list.push(paddingZero(0, 3));
            }
        }
        console.log(list);
        return list.reverse();
    }
    renderIcon() {
        const icons = [];
        this.characterPositionList.forEach((cid, index) => {
            const iconPath = `./icons/${paddingZero(cid, 3)}.png`;
            icons.push(<img key={`character-${index}`} src={iconPath} onClick={
              () => { this.chooseTarget(cid); }
            }/>);
        });
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
                <button className="customButton" onClick={() => { this.search(); }}>搜尋</button>
                <hr />
                {this.renderIcon()}
            </div>
        </div>;
    }
}
