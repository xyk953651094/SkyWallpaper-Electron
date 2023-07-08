import React from "react";
import {Row, Space} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import UnsplashComponent from "./unsplashComponent";
import PixabayComponent from "./pixabayComponent";
import PexelsComponent from "./pexelsComponent";
import BingComponent from "./bingComponent";

type propType = {
    display: string,
    themeColor: string,
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
            <Space spacing={"loose"} vertical align={"start"} style={{display: this.props.display}}>
                <BingComponent themeColor={this.props.themeColor}/>
                <UnsplashComponent themeColor={this.props.themeColor}/>
                <PexelsComponent themeColor={this.props.themeColor}/>
                <PixabayComponent themeColor={this.props.themeColor}/>
            </Space>
        )
    }
}

export default WallpaperComponent;