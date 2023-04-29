import React from "react";
import {Row, Empty, CardGroup, Card, ImagePreview, Image, ButtonGroup, Button, Toast} from "@douyinfe/semi-ui";
import {IconHomeStroked, IconDownloadStroked, IconLoading} from "@douyinfe/semi-icons";
import "../stylesheets/wallpaperComponent.css"
import {getFontColor, getJsonLength, isEmptyString, setWallpaper} from "../typescripts/publicFunctions"
import {ImageData} from "../typescripts/publicInterface";

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

    homeButtonClick(index: number) {
        if ( this.props.imageData[index].userUrl && isEmptyString(this.props.imageData[index].userUrl) ) {
            Toast.error("无跳转链接");
        } else {
            window.open(this.props.imageData[index].imageUrl);
            // window.open(this.props.imageData[index].userUrl);
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
                                    <ImagePreview>
                                        <Image width={this.state.imageSideLength} height={this.state.imageSideLength}
                                               src={value[index].displayUrl} preview={true}
                                               // placeholder={<Image width={this.state.imageSideLength} height={this.state.imageSideLength}
                                               //                     src={value[index].previewUrl} preview={false}/>}
                                               placeholder={<IconLoading />}
                                               className={"wallpaperFadeIn"}
                                        />
                                    </ImagePreview>
                                }
                                actions={[
                                    <ButtonGroup size="small" theme={"borderless"}>
                                        <Button icon={<IconHomeStroked/>}
                                                style={{color: getFontColor(value[index].color)}}
                                                onClick={this.homeButtonClick.bind(this, index)}>主页</Button>
                                        <Button icon={<IconDownloadStroked/>}
                                                style={{color: getFontColor(value[index].color)}}
                                                onClick={this.setWallpaperButtonClick.bind(this, index)}>设置壁纸</Button>
                                    </ButtonGroup>
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