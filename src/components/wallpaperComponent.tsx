import React from "react";
import {Row, Space} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import UnsplashComponent from "./unsplashComponent";
import PixabayComponent from "./pixabayComponent";
import PexelsComponent from "./pexelsComponent";
import BingComponent from "./bingComponent";

type propType = {
    display: string,
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

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.display !== prevProps.display) {
            this.setState({
                display: nextProps.display,
            });
        }
    }

    render() {
        return (
            <Row style={{display: this.props.display}}>
                <Space spacing={"loose"} vertical align={"start"}>
                    <BingComponent />
                    <UnsplashComponent />
                    <PexelsComponent />
                    <PixabayComponent />
                </Space>
            </Row>
        )
    }
}

export default WallpaperComponent;