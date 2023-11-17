import React from "react";
import {
    Row,
    Empty,
    CardGroup,
    Card,
    ImagePreview,
    Image,
    ButtonGroup,
    Button,
    Toast,
    Spin, Space
} from "@douyinfe/semi-ui";
import {IconHomeStroked, IconImage} from "@douyinfe/semi-icons";
import "../stylesheets/wallpaperComponent.css"
import {getFontColor, getJsonLength, getReverseColor, isEmptyString, setWallpaper} from "../typescripts/publicFunctions"
import {ImageData} from "../typescripts/publicInterface";
import {equal} from "assert";

type propType = {
    imageData: ImageData[],
}

type stateType = {
    imageData: any,
    emptyDisplay: "block" | "none",
    imageSideLength: number,
}

interface WallpaperCardComponent {
    state: stateType,
    props: propType
}

class WallpaperCardComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imageData: {},
            emptyDisplay: "none",
            imageSideLength: 200,
        };
    }

    btnMouseOver(index: number, e: any) {
        if(this.state.imageData[index].color !== "var(--semi-color-bg-0)") {
            e.currentTarget.style.backgroundColor = getReverseColor(this.state.imageData[index].color);
            e.currentTarget.style.color = getFontColor(getReverseColor(this.state.imageData[index].color));
        }
        else {
            e.currentTarget.style.backgroundColor = "var(--semi-color-text-0)";
            e.currentTarget.style.color = "var(--semi-color-bg-0)";
        }
    }

    btnMouseOut(index: number, e: any) {
        if(this.state.imageData[index].color !== "var(--semi-color-bg-0)") {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = getFontColor(this.state.imageData[index].color);
        }
        else {
            e.currentTarget.style.backgroundColor = "var(--semi-color-bg-0)";
            e.currentTarget.style.color = "var(--semi-color-text-0)";
        }
    }

    homeButtonClick(index: number) {
        if ( this.props.imageData[index].userUrl && isEmptyString(this.props.imageData[index].userUrl) ) {
            Toast.error("无跳转链接");
        } else {
            window.open(this.props.imageData[index].imageUrl, "_blank");
        }
    }

    setWallpaperButtonClick(index: number) {
        setWallpaper(this.props.imageData[index]);
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.imageData !== prevProps.imageData) {
            this.setState({
                imageData: nextProps.imageData,
                emptyDisplay: getJsonLength(nextProps.imageData) === 0 ? "block" : "none"
            });
        }
    }

    render() {
        return (
            <Row>
                <Empty style={{display: this.state.emptyDisplay}} description="获取图片中，请稍后"/>
                <CardGroup spacing={10}>
                    {
                        new Array(getJsonLength(this.state.imageData)).fill(this.state.imageData).map((value, index) => (
                            <Card
                                key={index}
                                headerLine={false}
                                style={{
                                    width: this.state.imageSideLength,
                                    backgroundColor: value[index].color,
                                    display: "display: inline-block"
                                }}
                                cover={
                                    <ImagePreview disableDownload={true}>
                                        <Image width={this.state.imageSideLength} height={this.state.imageSideLength}
                                               src={value[index].displayUrl} preview={true}
                                               placeholder={<Spin />}
                                               className={"wallpaperFadeIn"}
                                        />
                                    </ImagePreview>
                                }
                                actions={[
                                    <Space>
                                        <Button theme={"borderless"} icon={<IconHomeStroked/>}
                                                style={{color: value[index].color === "var(--semi-color-bg-0)" ? "var(--semi-color-text-0)" : getFontColor(value[index].color)}}
                                                onMouseOver={this.btnMouseOver.bind(this, index)}
                                                onMouseOut={this.btnMouseOut.bind(this, index)}
                                                onClick={this.homeButtonClick.bind(this, index)}>主页</Button>
                                        <Button theme={"borderless"} icon={<IconImage/>}
                                                style={{color: value[index].color === "var(--semi-color-bg-0)" ? "var(--semi-color-text-0)" : getFontColor(value[index].color)}}
                                                onMouseOver={this.btnMouseOver.bind(this, index)}
                                                onMouseOut={this.btnMouseOut.bind(this, index)}
                                                onClick={this.setWallpaperButtonClick.bind(this, index)}>壁纸</Button>
                                    </Space>
                                ]}
                            >
                            </Card>
                        ))
                    }
                </CardGroup>
            </Row>
        )
    }
}

export default WallpaperCardComponent;