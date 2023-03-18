import React from "react";
import {Row, Space, CardGroup, Card, Image, ButtonGroup, Button, Toast} from "@douyinfe/semi-ui";
import {IconHomeStroked, IconDownloadStroked} from "@douyinfe/semi-icons";
import "../stylesheets/wallpaperComponent.css"
import {getFontColor, getJsonLength, isEmptyString} from "../typescripts/publicFunctions"
import {ImageData} from "../typescripts/publicInterface";

const { Meta } = Card;

type propType = {
    imageData: ImageData[],
}

type stateType = {
    imageData: any,
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
            imageSideLength: 245,
        };
    }

    homeButtonClick(index: number) {
        if ( this.props.imageData[index].userUrl && isEmptyString(this.props.imageData[index].userUrl) ) {
            Toast.error("无跳转链接");
        } else {
            window.open(this.props.imageData[index].userUrl);
        }
    }

    downloadButtonClick(index: number) {
        if ( isEmptyString(this.props.imageData[index].imageUrl) ) {
            Toast.error("无下载链接");
        } else {
            window.open(this.props.imageData[index].imageUrl);
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (getJsonLength(nextProps.imageData) !== 0 && nextProps.imageData !== prevProps.imageData) {
            this.setState({
                imageData: nextProps.imageData,
            });
        }
    }

    render() {
        return (
            <Row className={"overflowHidden"}>
            <CardGroup spacing={10} className={"overflowScroll"}>
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
                                <Image width={this.state.imageSideLength} height={this.state.imageSideLength}
                                       src={value[index].displayUrl} preview={true}
                                       placeholder={<Image src={value[index].previewUrl} preview={false}/>}
                                       className={"wallpaperFadeIn"}
                                />
                            }
                            actions={[
                                <ButtonGroup size="small" theme={"borderless"}>
                                    <Button icon={<IconHomeStroked/>}
                                            style={{color: getFontColor(value[index].color)}}
                                            onClick={this.homeButtonClick.bind(this, index)}>摄影师主页</Button>
                                    <Button icon={<IconDownloadStroked/>}
                                            style={{color: getFontColor(value[index].color)}}
                                            onClick={this.downloadButtonClick.bind(this, index)}>下载图片</Button>
                                </ButtonGroup>
                            ]}
                        >
                            <Meta
                                title={
                                    <span className="cardAuthorSpan" style={{color: getFontColor(value[index].color)}}>
                                        {"摄影师：" + value[index].userName}
                                    </span>
                                }
                                description={
                                    <span style={{color: getFontColor(value[index].color)}}>
                                        {"拍摄日期：" + value[index].createTime}
                                    </span>
                                }
                            />
                        </Card>
                    ))
                }
            </CardGroup>
            </Row>
        )
    }
}

export default WallpaperCardComponent;