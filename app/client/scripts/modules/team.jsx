// Library
import React from "react";

// Utils
import Character from "components/character";

export default class Team extends React.PureComponent {
    constructor(props) {
        super(props);
        // console.log(props.members ? props.members : ["000", "000", "000", "000", "000"]);
        this.state = {
            members: props.members ? props.members : ["000", "000", "000", "000", "000"],
            stars: []
        };
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
        return this.state.members;
    }
    renderCharacter() {
        const list = [];
        const {members} = this.state;
        members.forEach((characterID, index) => {
            list.push(<Character key={index} cid={characterID} />);
        });
        return list;
    }
    render() {
        return <div>
            {this.renderCharacter()}
        </div>;
    }
}
