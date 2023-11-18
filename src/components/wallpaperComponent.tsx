import React from "react";
import {Col, Row} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import RandomImageComponent from "../wallpaperComponents/randomImageComponent";
import TodayImageComponent from "../wallpaperComponents/todayImageComponent";
import {Preference} from "../typescripts/publicInterface";

type propType = {
    preference: Preference,
}

type stateType = {}

interface WallpaperComponent {
    state: stateType,
    props: propType
}

class WallpaperComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Row gutter={[0, 16]}>
                <Col span={24}>
                    <RandomImageComponent preference={this.props.preference}/>
                </Col>
                <Col span={24}>
                    <TodayImageComponent />
                </Col>
            </Row>
        )
    }
}

export default WallpaperComponent;