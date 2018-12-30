// Library
import React from "react";

// Utils
import {paddingZero} from "pages/modules/utils";

export default class Character extends React.PureComponent {
    constructor() {
        super();
        this.temp = 123;
    }
    render() {
        const {cid} = this.props;
        const iconPath = `./icons/${paddingZero(cid, 3)}.png`;
        return <img src={iconPath} />;
    }
}
