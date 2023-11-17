import React from "react";
import {Col, Row, Space} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import UnsplashComponent from "./unsplashComponent";
import PixabayComponent from "./pixabayComponent";
import PexelsComponent from "./pexelsComponent";
import BingComponent from "./bingComponent";

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
            <Row gutter={[0, 8]}>
                {/*<Col span={24}>*/}
                {/*    <BingComponent />*/}
                {/*</Col>*/}
                <Col span={24}>
                    <UnsplashComponent />
                </Col>
                <Col span={24}>
                    <PexelsComponent />
                </Col>
                <Col span={24}>
                    <PixabayComponent />
                </Col>
            </Row>
        )
    }
}

export default WallpaperComponent;