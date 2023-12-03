import React from "react";
import {Button, Image, ImagePreview, List, Space, Spin, Toast, Typography} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import {
    defaultImageData,
    imageDescriptionMaxSize,
    unsplashClientId,
    unsplashTopicRequestUrl,
} from "../typescripts/publicConstants";
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    httpRequest,
    isEmpty,
    setWallpaper
} from "../typescripts/publicFunctions";
import {ImageData, Preference} from "../typescripts/publicInterface"
import {IconHomeStroked, IconImage, IconInfoCircle, IconMapPin, IconUserCircle} from "@douyinfe/semi-icons";

const {Title} = Typography;
const $ = require("jquery");

type propType = {
    preference: Preference,
}

type stateType = {
    imageData: ImageData,
}

interface RandomImageComponent {
    state: stateType,
    props: propType
}

class RandomImageComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imageData: defaultImageData,
        };
    }

    homeButtonClick(imageUrl: string) {
        if (isEmpty(imageUrl)) {
            Toast.error("无跳转链接");
        } else {
            window.open(imageUrl, "_blank");
        }
    }

    setWallpaperButtonClick(item: any) {
        setWallpaper(item);
    }

    // 获取图片
    getImage() {
        // 将数组处理成字符串
        let tempImageTopics = "";
        for (let i = 0; i < this.props.preference.imageTopics.length; i++) {
            tempImageTopics += this.props.preference.imageTopics[i];
            if (i !== this.props.preference.imageTopics.length - 1) {
                tempImageTopics += ",";
            }
        }
        let imageQuery = this.props.preference.customTopic;

        let tempThis = this;
        let data = {
            "client_id": unsplashClientId,
            "orientation": "landscape",
            "topics": isEmpty(imageQuery) ? tempImageTopics : "",
            "query": imageQuery,
            "content_filter": "high",
        }
        httpRequest({}, unsplashTopicRequestUrl, data, "GET")
            .then(function (resultData: any) {
                let tempImageData: ImageData = {
                    wallpaperUrl: resultData.urls.full,
                    displayUrl: resultData.urls.regular,
                    imageUrl: resultData.links.html,
                    userName: resultData.user.name,
                    userUrl: resultData.user.links.html,
                    createTime: resultData.created_at.split("T")[0],
                    description: (resultData.alt_description.length > imageDescriptionMaxSize ? resultData.alt_description.substring(0, imageDescriptionMaxSize) + "..." : resultData.alt_description),
                    location: resultData.location.name,
                    color: resultData.color,
                }

                tempThis.setState({
                    imageData: tempImageData,
                }, () => {
                    // 保存请求时间，防抖节流
                    localStorage.setItem("lastRandomImageRequestTime", String(new Date().getTime()));
                    localStorage.setItem("lastRandomImage", JSON.stringify(tempThis.state.imageData));

                    // 自动设为壁纸
                    setWallpaper(tempThis.state.imageData);
                });
            })
            .catch(function () {
                tempThis.setState({
                    imageData: {},
                }, () => {
                    Toast.error("获取图片失败");
                });
            })
    }

    componentDidMount() {
        // 防抖节流
        let lastRequestTime: any = localStorage.getItem("lastRandomImageRequestTime");
        let nowTimeStamp = new Date().getTime();
        if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            this.getImage();
        } else if (nowTimeStamp - parseInt(lastRequestTime) > parseInt(this.props.preference.switchTime)) {  // 必须多于切换间隔才能进行新的请求
            this.getImage();
        } else {  // 切换间隔内使用上一次请求结果
            let lastImage: any = localStorage.getItem("lastRandomImage");
            if (lastImage) {
                this.setState({
                    imageData: JSON.parse(lastImage),
                });
            }
        }
    }

    render() {
        return (
            <List
                size="small"
                bordered
                header={<Title heading={3}>精选壁纸</Title>}
            >
                <List.Item
                    style={{backgroundColor: this.state.imageData.color, padding: "10px 10px 5px 10px"}}
                    header={
                        <ImagePreview disableDownload={true}>
                            <Image width={150} height={150} src={this.state.imageData.displayUrl}
                                   preview={{src: this.state.imageData.wallpaperUrl}}
                                   placeholder={<Spin/>}
                                   className={"wallpaperFadeIn"}
                            />
                        </ImagePreview>
                    }
                    main={
                        <div className={"alignCenter"} style={{height: "150px"}}>
                            <Space vertical align="start">
                                <Button theme={"borderless"} icon={<IconUserCircle/>}
                                        style={{color: getFontColor(this.state.imageData.color), cursor: "default"}}
                                        onMouseOver={btnMouseOver.bind(this, this.state.imageData.color)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.imageData.color)}>
                                    {"摄影师：" + this.state.imageData.userName}
                                </Button>
                                <Button theme={"borderless"} icon={<IconMapPin/>}
                                        style={{color: getFontColor(this.state.imageData.color), cursor: "default"}}
                                        onMouseOver={btnMouseOver.bind(this, this.state.imageData.color)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.imageData.color)}>
                                    {"拍摄地点：" + this.state.imageData.location}
                                </Button>
                                <Button theme={"borderless"} icon={<IconInfoCircle/>}
                                        style={{color: getFontColor(this.state.imageData.color), cursor: "default"}}
                                        onMouseOver={btnMouseOver.bind(this, this.state.imageData.color)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.imageData.color)}>
                                    {"图片描述：" + this.state.imageData.description}
                                </Button>
                            </Space>
                        </div>
                    }
                    extra={
                        <Space vertical align={"start"}>
                            <Button theme={"borderless"} icon={<IconHomeStroked/>}
                                    style={{color: getFontColor(this.state.imageData.color)}}
                                    onMouseOver={btnMouseOver.bind(this, this.state.imageData.color)}
                                    onMouseOut={btnMouseOut.bind(this, this.state.imageData.color)}
                                    onClick={this.homeButtonClick.bind(this, this.state.imageData.imageUrl)}>
                                图片主页
                            </Button>
                            <Button theme={"borderless"} icon={<IconImage/>}
                                    style={{color: getFontColor(this.state.imageData.color)}}
                                    onMouseOver={btnMouseOver.bind(this, this.state.imageData.color)}
                                    onMouseOut={btnMouseOut.bind(this, this.state.imageData.color)}
                                    onClick={this.setWallpaperButtonClick.bind(this, this.state.imageData)}>
                                设为壁纸
                            </Button>
                        </Space>
                    }
                />
            </List>
        )
    }
}

export default RandomImageComponent;