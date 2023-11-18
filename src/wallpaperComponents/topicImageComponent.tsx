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
    unsplashTopicRequestUrl,
    unsplashClientId,
    imageDescriptionMaxSize, defaultImageData,
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
    IconCheckboxTick,
    IconInfoCircle,
    IconUserCircle
} from "@douyinfe/semi-icons";

const {Title} = Typography;
const $ = require("jquery");

type propType = {}

type stateType = {
    imageData: ImageData,
    selectedTopics: number,
    topicRequestData: any,
}

interface TopicImageComponent {
    state: stateType,
    props: propType
}

class TopicImageComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imageData: defaultImageData,
            selectedTopics: 0,
            topicRequestData: {
                "client_id": unsplashClientId,
                "orientation": "landscape",
                "topics": "",
                "content_filter": "high",
            }
        };
    }

    homeButtonClick(imageUrl: string) {
        if ( isEmptyString(imageUrl) ) {
            Toast.error("无跳转链接");
        } else {
            window.open(imageUrl, "_blank");
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
                console.log(resultData.color);
                let tempImageData: ImageData = {
                    displayUrl: resultData.urls.regular,
                    previewUrl: resultData.urls.small,
                    imageUrl: resultData.links.html,
                    userName: resultData.user.name,
                    userUrl: resultData.user.links.html,
                    createTime: resultData.created_at.split("T")[0],
                    description: (resultData.alt_description.length > imageDescriptionMaxSize ? resultData.alt_description.substring(0, imageDescriptionMaxSize) + "..." : resultData.alt_description),
                    color: resultData.color,
                }

                tempThis.setState({
                    imageData: tempImageData,
                });
            })
            .catch(function () {
                tempThis.setState({
                    imageData: {},
                },()=>{
                    Toast.error("获取 Unsplash 图片失败");
                });
            })
    }

    // topicButtonClick(index: number, value: string) {
    //     const unsplashButtonGroup = $(".unsplashButtonGroup").children("button");
    //     unsplashButtonGroup.css({"color": "var(--semi-color-text-0)", "background-color": "var(--semi-color-bg-0)"});
    //     unsplashButtonGroup.eq(index).css({"color": "var(--semi-color-bg-0)", "background-color": "var(--semi-color-text-0)"});
    //
    //     if(value === "popular" || value === "latest") {
    //         let data = Object.assign({}, this.state.todayRequestData, {order_by: value});
    //         this.setState({
    //             selectedTopics: index,
    //             todayRequestData: data,
    //             imageData: [], // 重置图片数据为空
    //         }, () => {
    //             this.getImages(unsplashTodayRequestUrl, this.state.todayRequestData);
    //         })
    //     }
    //     else {
    //         let data = Object.assign({}, this.state.topicRequestData, {topics: value});
    //         this.setState({
    //             selectedTopics: index,
    //             topicRequestData: data,
    //             imageData: [], // 重置图片数据为空
    //         }, () => {
    //             this.getImages(unsplashTopicRequestUrl, this.state.topicRequestData);
    //         })
    //     }
    // }

    componentDidMount() {
        this.getImages(unsplashTopicRequestUrl, this.state.topicRequestData);  // 获取图片
    }

    render() {
        return (
            <List
                size="small"
                bordered
                header={<Title heading={3}>今日壁纸</Title>}
            >
                <List.Item
                    style={{backgroundColor: this.state.imageData.color, padding: "10px 10px 5px 10px"}}
                    header={
                        <ImagePreview disableDownload={true}>
                            <Image width={80} height={80} src={this.state.imageData.displayUrl} preview={true}
                                   placeholder={<Spin />}
                                   className={"wallpaperFadeIn"}
                            />
                        </ImagePreview>
                    }
                    main={
                        <div className={"alignCenter"} style={{height: "80px"}}>
                            <Space vertical align="start">
                                <Button theme={"borderless"} icon={<IconUserCircle />}
                                        style={{color: getFontColor(this.state.imageData.color), cursor: "default"}}
                                        onMouseOver={btnMouseOver.bind(this, this.state.imageData.color)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.imageData.color)}
                                >
                                    {"摄影师：" + this.state.imageData.userName}
                                </Button>
                                <Button theme={"borderless"} icon={<IconInfoCircle />}
                                        style={{color: getFontColor(this.state.imageData.color), cursor: "default"}}
                                        onMouseOver={btnMouseOver.bind(this, this.state.imageData.color)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.imageData.color)}
                                >
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
                            <Button theme={"borderless"} icon={<IconCheckboxTick />} disabled
                                    style={{color: getFontColor(this.state.imageData.color)}}
                                    onMouseOver={btnMouseOver.bind(this, this.state.imageData.color)}
                                    onMouseOut={btnMouseOut.bind(this, this.state.imageData.color)}
                                    onClick={this.setWallpaperButtonClick.bind(this, this.state.imageData)}>
                                已设壁纸
                            </Button>
                        </Space>
                    }
                />
            </List>

            // <List
            //     header={
            //         <div style={{display: "flex"}}>
            //             <div style={{width: "115px"}}>
            //                 <Title heading={3}>Unsplash</Title>
            //             </div>
            //             <div style={{flex: "1", overflow: "scroll", scrollBehavior: "smooth"}}>
            //                 <ButtonGroup theme={"borderless"} className={"listHeaderButtonGroup unsplashButtonGroup"}
            //                              style={{width: "max-content"}}
            //                 >
            //                     {
            //                         new Array(getJsonLength(this.state.imageTopics)).fill(this.state.imageTopics).map((value, index) => (
            //                             <Button key={index} type="tertiary"
            //                                     onClick={this.topicButtonClick.bind(this, index, Object.keys(value)[index])}>
            //                                 {value[Object.keys(value)[index]]}
            //                             </Button>
            //                         ))
            //                     }
            //                 </ButtonGroup>
            //             </div>
            //         </div>
            //     }
            //     size="small"
            //     bordered
            // >
            //     <List.Item
            //         main={
            //             <WallpaperCardComponent imageData={this.state.imageData}></WallpaperCardComponent>
            //         }
            //     />
            // </List>
        )
    }
}

export default TopicImageComponent;