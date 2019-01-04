// Library
import React from "react";

// Utils
import Selector from "components/selector";

export default class Team extends React.PureComponent {
    constructor(props) {
        super(props);
        // console.log(props.members ? props.members : ["000", "000", "000", "000", "000"]);
        this.state = {
            members: props.members ? props.members : ["000", "000", "000", "000", "000"],
            stars: []
        };
        this.selectorList = {};
    }
    add(id) {
        // Insert
        let temp = this.state.members;
        if (typeof id === "string") {
            temp = temp.concat(id);
        } else if (id instanceof Array) {
            temp = id;
        }
        if (temp.length > 5) {
            temp = temp.slice(1);
        }
        //
        this.setState({members: temp});
    }
    members() {
        const result = [];
        Object.keys(this.selectorList).forEach((key) => {
            result.push(this.selectorList[key].member());
        });
        return result;
    }
    renderCharacter() {
        const list = [];
        const {members} = this.state;
        members.forEach((characterID, index) => {
            const info = characterID.split("@");
            const id = info[0];
            const star = info[1];
            console.log(id, star);
            list.push(<Selector key={index} cid={id} star={star} ref={(ref) => {
                this.selectorList[index] = ref;
            }} />);
        });
        return list;
    }
    render() {
        return <div>
            {this.renderCharacter()}
        </div>;
    }
}
