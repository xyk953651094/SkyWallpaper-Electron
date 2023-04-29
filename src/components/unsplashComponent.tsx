import React from "react";
import {Row, Col, List, Toast, Typography, ButtonGroup, Button, Tooltip} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import WallpaperCardComponent from "./wallpaperCardComponent";
import {
    unsplashTodayRequestUrl,
    unsplashTopicRequestUrl,
    unsplashClientId,
    unsplashImageTopics,
    wallpaperPageSize,
} from "../typescripts/publicConstants";
import {getJsonLength, httpRequest} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface"
import {IconLink} from "@douyinfe/semi-icons";

const {Title} = Typography;
const $ = require("jquery");

type propType = {
    themeColor: string,
}

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
                        description: resultData[i].description,
                        color: resultData[i].color,
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

    linkButtonOnClick() {
        window.open("https://unsplash.com/");
    }

    topicButtonClick(index: number, value: string) {
        const unsplashButtonGroup = $(".unsplashButtonGroup").children("button");
        unsplashButtonGroup.css({"background-color": "transparent"});
        unsplashButtonGroup.eq(index).css({"background-color": this.props.themeColor});

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

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            const unsplashButtonGroup = $(".unsplashButtonGroup").children("button");
            unsplashButtonGroup.css({"background-color": "transparent"});
            unsplashButtonGroup.eq(this.state.selectedTopics).css({"background-color": this.props.themeColor});
        }
    }

    componentDidMount() {
        const unsplashButtonGroup = $(".unsplashButtonGroup").children("button");
        unsplashButtonGroup.eq(this.state.selectedTopics).css({"background-color": this.props.themeColor});
        this.getImages(unsplashTodayRequestUrl, this.state.todayRequestData);  // 默认获取"热门"图片
    }

    render() {
        return (
            <List
                emptyContent = "图片加载中，请稍后"
                style={{width: "100%", maxWidth: "fit-content"}}
                header={
                    <Row>
                        <Row>
                            <Col span={12}>
                                <Title heading={3}>Unsplash</Title>
                            </Col>
                            <Col span={12} style={{textAlign: "right"}}>
                                <Tooltip content={"前往 Unsplash"} position={"left"}>
                                    <Button theme={"borderless"} icon={<IconLink />}
                                            style={{color: "rgba(var(--semi-grey-9), 1)"}}
                                            onClick={this.linkButtonOnClick.bind(this)}
                                    >
                                    </Button>
                                </Tooltip>
                            </Col>
                        </Row>
                        <Row style={{overflow: "scroll", marginTop: "5px"}}>
                            <ButtonGroup theme={"borderless"} className={"listHeaderButtonGroup unsplashButtonGroup"}
                                style={{width: "1200px"}}
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
                        </Row>
                    </Row>
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