// Library
import React from "react";

// Utils
import {paddingZero} from "utils/format";

export default class Character extends React.PureComponent {
    constructor(props) {
        super(props);
        const defaultStar = typeof props.star === "undefined" || props.star === 0 ? 1 : props.star;
        this.state = {star: defaultStar};
    }
    member() {
        const {cid} = this.props;
        const {star} = this.state;
        return `${paddingZero(cid, 3)}@${star}`;
    }
    upgrade() {
        const newStar = this.state.star + 1 > 5 ? 1 : this.state.star + 1;
        this.setState({star: newStar});
    }
    componentDidUpdate() {
        const {cid} = this.props;
        if (cid === "000") {
            this.setState({star: 1});
        }
    }
    renderStar() {
        const list = [];
        for (let count = 1; count <= this.state.star; count += 1) {
            const classname = `star${count}`;
            list.push(<span key={count} className={classname} />);
        }
        return list;
    }
    render() {
        const {cid} = this.props;
        const iconPath = `./icons/${paddingZero(cid, 3)}.png`;
        return <span className="character" onClick={() => {
            console.log("> click selector");
            this.upgrade();
        }}>
            <img src={iconPath} />
            {this.renderStar()}
        </span>;
    }
}
