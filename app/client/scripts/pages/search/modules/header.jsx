// Library
import React from "react";

export default class Header extends React.PureComponent {
    constructor() {
        super();
        this.content = "公主連結戰報比對系統";
    }
    render() {
        return <div>
            <div className="header">{this.content}</div>
        </div>;
    }
}
