import React from "react";
import {Row, Col, Divider, List, Toast, Typography, ButtonGroup, Button} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import WallpaperCardComponent from "./wallpaperCardComponent";
import {
    unsplashTodayRequestUrl,
    unsplashTopicRequestUrl,
    unsplashClientId,
    unsplashImageTopics,
    wallpaperPageSize, imageDescriptionMaxSize,
} from "../typescripts/publicConstants";
import {getJsonLength, httpRequest} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface"

const {Title} = Typography;
const $ = require("jquery");

type propType = {}

type stateType = {
    imageData: ImageData[],
    imageTopics: any,
    selectedTopics: number,
    todayRequestData: any,
    topicRequestData: any,
}

interface UnsplashComponent {
    state: stateType,
    props: propType
}

class UnsplashComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imageData: [],
            imageTopics: unsplashImageTopics,
            selectedTopics: 0,
            todayRequestData: {
                "client_id": unsplashClientId,
                "per_page": wallpaperPageSize,
                "order_by": "popular",
            },
            topicRequestData: {
                "client_id": unsplashClientId,
                "orientation": "landscape",
                "topics": "",
                "content_filter": "high",
                "count": wallpaperPageSize
            }
        };
    }

    // 获取 Unsplash 图片
    getImages(url: string, data: object) {
        let tempThis = this;
        httpRequest({}, url, data, "GET")
            .then(function (resultData: any) {
                let tempImageData: ImageData[] = [];
                for (let i in resultData) {
                    let tempData: ImageData = {
                        displayUrl: resultData[i].urls.regular,
                        previewUrl: resultData[i].urls.small,
                        imageUrl: resultData[i].links.html,
                        userName: resultData[i].user.name,
                        userUrl: resultData[i].user.links.html,
                        createTime: resultData[i].created_at.split("T")[0],
                        description: (resultData[i].description.length > imageDescriptionMaxSize ? resultData[i].description.substring(0, imageDescriptionMaxSize) + "..." : resultData[i].description),
                        color: resultData[i].color,
                        source: "Unsplash",
                    };
                    tempImageData.push(tempData);
                }

                tempThis.setState({
                    imageData: tempImageData,
                });
            })
            .catch(function () {
                tempThis.setState({
                    imageData: [],
                },()=>{
                    Toast.error("获取 Unsplash 图片失败");
                });
            })
    }

    topicButtonClick(index: number, value: string) {
        const unsplashButtonGroup = $(".unsplashButtonGroup").children("button");
        unsplashButtonGroup.css({"color": "var(--semi-color-text-0)", "background-color": "var(--semi-color-bg-0)"});
        unsplashButtonGroup.eq(index).css({"color": "var(--semi-color-bg-0)", "background-color": "var(--semi-color-text-0)"});

        if(value === "popular" || value === "latest") {
            let data = Object.assign({}, this.state.todayRequestData, {order_by: value});
            this.setState({
                selectedTopics: index,
                todayRequestData: data,
                imageData: [], // 重置图片数据为空
            }, () => {
                this.getImages(unsplashTodayRequestUrl, this.state.todayRequestData);
            })
        }
        else {
            let data = Object.assign({}, this.state.topicRequestData, {topics: value});
            this.setState({
                selectedTopics: index,
                topicRequestData: data,
                imageData: [], // 重置图片数据为空
            }, () => {
                this.getImages(unsplashTopicRequestUrl, this.state.topicRequestData);
            })
        }


    }

    componentDidMount() {
        const unsplashButtonGroup = $(".unsplashButtonGroup").children("button");
        unsplashButtonGroup.eq(this.state.selectedTopics).css({"color": "var(--semi-color-bg-0)", "background-color": "var(--semi-color-text-0)"});
        this.getImages(unsplashTodayRequestUrl, this.state.todayRequestData);  // 默认获取"热门"图片
    }

    render() {
        return (
            <List
                className={"listStyle"}
                header={
                    <div style={{display: "flex"}}>
                        <div style={{width: "115px"}}>
                            <Title heading={3}>Unsplash</Title>
                        </div>
                        <div style={{flex: "1", overflow: "scroll", scrollBehavior: "smooth"}}>
                            <ButtonGroup theme={"borderless"} className={"listHeaderButtonGroup unsplashButtonGroup"}
                                         style={{width: "max-content"}}
                            >
                                {
                                    new Array(getJsonLength(this.state.imageTopics)).fill(this.state.imageTopics).map((value, index) => (
                                        <Button key={index} type="tertiary"
                                                onClick={this.topicButtonClick.bind(this, index, Object.keys(value)[index])}>
                                            {value[Object.keys(value)[index]]}
                                        </Button>
                                    ))
                                }
                            </ButtonGroup>
                        </div>
                    </div>
                }
                size="small"
                bordered
            >
                <List.Item
                    main={
                        <WallpaperCardComponent imageData={this.state.imageData}></WallpaperCardComponent>
                    }
                />
            </List>
        )
    }
}

export default UnsplashComponent;