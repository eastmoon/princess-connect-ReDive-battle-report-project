// Library
import React from "react";

// Utils
import {paddingZero} from "utils/format";

export default class Character extends React.PureComponent {
    renderStar() {
        const list = [];
        const {star} = this.props;
        for (let count = 1; count <= star; count += 1) {
            const classname = `star${count}`;
            list.push(<span key={count} className={classname} />);
        }
        return list;
    }
    render() {
        const {cid} = this.props;
        const iconPath = `./icons/${paddingZero(cid, 3)}.png`;
        return <span className="character">
            <img src={iconPath} />
            {this.renderStar()}
        </span>;
    }
}
