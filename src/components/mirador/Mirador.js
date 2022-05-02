import React, { Component } from "react";
import mirador from "mirador";

export default class Mirador extends Component {
    componentDidMount() {
        const config = {
            id: "DialogMirador",
            windows: [{
                manifestId: this.props.manifestUri,
                view: 'gallery',
            }],
            window: {
                allowClose: false, // Prevent the user from closing this window
            }
        }
        mirador.viewer(config, {});
    }

    render() {
        const { config } = this.props;
        return <div id={"DialogMirador"} />;
    }
}

