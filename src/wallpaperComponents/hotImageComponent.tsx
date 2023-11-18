import React from "react";
import {
    List,
    Toast,
    Typography,
    Button,
    Space,
    ImagePreview,
    Image, Spin
} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import {
    unsplashTodayRequestUrl,
    unsplashClientId,
    imageDescriptionMaxSize, listPageSize,
} from "../typescripts/publicConstants";
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    httpRequest,
    isEmptyString,
    setWallpaper
} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface"
import {
    IconHomeStroked,
    IconImage,
    IconInfoCircle,
    IconUserCircle
} from "@douyinfe/semi-icons";

const {Title} = Typography;
const $ = require("jquery");

type propType = {}

type stateType = {
    loading: boolean,
    imageData: ImageData[],
    todayRequestData: any,
}

interface HotImageComponent {
    state: stateType,
    props: propType
}

class HotImageComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            imageData: [],
            todayRequestData: {
                "client_id": unsplashClientId,
                "per_page": listPageSize,
                "order_by": "latest",
            },
        };
    }

    homeButtonClick(item: any) {
        if ( isEmptyString(item.imageUrl) ) {
            Toast.error("无跳转链接");
        } else {
            window.open(item.imageUrl, "_blank");
        }
    }

    setWallpaperButtonClick(item: any) {
        setWallpaper(item);
    }

    // 获取图片
    getImages(url: string, data: object) {
        let tempThis = this;
        httpRequest({}, url, data, "GET")
            .then(function (resultData: any) {
                let tempImageData = [];
                for (let i in resultData) {
                    let tempData: ImageData = {
                        displayUrl: resultData[i].urls.regular,
                        previewUrl: resultData[i].urls.small,
                        imageUrl: resultData[i].links.html,
                        userName: resultData[i].user.name,
                        userUrl: resultData[i].user.links.html,
                        createTime: resultData[i].created_at.split("T")[0],
                        description: (resultData[i].alt_description.length > imageDescriptionMaxSize ? resultData[i].alt_description.substring(0, imageDescriptionMaxSize) + "..." : resultData[i].alt_description),
                        color: resultData[i].color,
                    };
                    tempImageData.push(tempData);
                }

                tempThis.setState({
                    loading: false,
                    imageData: tempImageData,
                });
            })
            .catch(function () {
                tempThis.setState({
                    loading: false,
                    imageData: [],
                },()=>{
                    Toast.error("获取图片失败");
                });
            })
    }

    componentDidMount() {
        this.getImages(unsplashTodayRequestUrl, this.state.todayRequestData);  // 获取图片
    }

    render() {
        return (
            <List
                loading={this.state.loading}
                size="small"
                bordered
                header={<Title heading={3}>热门图片</Title>}
                dataSource={this.state.imageData}
                renderItem={item => (
                    <List.Item
                        style={{backgroundColor: item.color, padding: "10px 10px 5px 10px"}}
                        header={
                            <ImagePreview disableDownload={true}>
                                <Image width={80} height={80} src={item.displayUrl} preview={true}
                                       placeholder={<Spin />}
                                       className={"wallpaperFadeIn"}
                                />
                            </ImagePreview>
                        }
                        main={
                            <div className={"alignCenter"} style={{height: "80px"}}>
                                <Space vertical align="start">
                                    <Button theme={"borderless"} icon={<IconUserCircle />}
                                            style={{color: getFontColor(item.color), cursor: "default"}}
                                            onMouseOver={btnMouseOver.bind(this, item.color)}
                                            onMouseOut={btnMouseOut.bind(this, item.color)}>
                                        {"摄影师：" + item.userName}
                                    </Button>
                                    <Button theme={"borderless"} icon={<IconInfoCircle />}
                                            style={{color: getFontColor(item.color), cursor: "default"}}
                                            onMouseOver={btnMouseOver.bind(this, item.color)}
                                            onMouseOut={btnMouseOut.bind(this, item.color)}>
                                        {"图片描述：" + (item.description === null ? "暂无图片描述" : item.description)}
                                    </Button>
                                </Space>
                            </div>
                        }
                        extra={
                            <Space vertical align={"start"}>
                                <Button theme={"borderless"} icon={<IconHomeStroked/>}
                                        style={{color: getFontColor(item.color)}}
                                        onMouseOver={btnMouseOver.bind(this, item.color)}
                                        onMouseOut={btnMouseOut.bind(this, item.color)}
                                        onClick={this.homeButtonClick.bind(this, item)}>图片主页</Button>
                                <Button theme={"borderless"} icon={<IconImage/>}
                                        style={{color: getFontColor(item.color)}}
                                        onMouseOver={btnMouseOver.bind(this, item.color)}
                                        onMouseOut={btnMouseOut.bind(this, item.color)}
                                        onClick={this.setWallpaperButtonClick.bind(this, item)}>设为壁纸</Button>
                            </Space>
                        }
                    />
                )}
            />
        )
    }
}

export default HotImageComponent;