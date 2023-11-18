import React from "react";
import {Col, Row} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import TopicImageComponent from "../wallpaperComponents/topicImageComponent";
import HotImageComponent from "../wallpaperComponents/hotImageComponent";

type propType = {}

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
                    <TopicImageComponent />
                </Col>
                <Col span={24}>
                    <HotImageComponent />
                </Col>
            </Row>
        )
    }
}

export default WallpaperComponent;