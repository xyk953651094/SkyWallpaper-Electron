import React from "react";
import {List, Toast, Typography, ButtonGroup, Button, Space} from '@douyinfe/semi-ui';
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

const {Title} = Typography;

type propType = {}

type stateType = {
    imageData: ImageData[],
    imageTopics: any,
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

    topicButtonClick(index: number, value: string) {
        if(value === "popular" || value === "latest") {
            let data = Object.assign({}, this.state.todayRequestData, {order_by: value});
            this.setState({
                todayRequestData: data,
                imageData: [], // 重置图片数据为空
            }, () => {
                this.getImages(unsplashTodayRequestUrl, this.state.todayRequestData);
            })
        }
        else {
            let data = Object.assign({}, this.state.topicRequestData, {topics: value});
            this.setState({
                topicRequestData: data,
                imageData: [], // 重置图片数据为空
            }, () => {
                this.getImages(unsplashTopicRequestUrl, this.state.topicRequestData);
            })
        }


    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.display !== prevProps.display) {
            this.setState({
                display: nextProps.display,
            });
        }
    }

    componentDidMount() {
        this.getImages(unsplashTodayRequestUrl, this.state.todayRequestData);  // 默认获取"热门"图片
    }

    render() {
        return (
            <List
                emptyContent = "图片加载中，请稍后"
                style={{width: "660px"}}
                header={
                    <Space>
                        <div className={"listHeaderTitle"}>
                            <Title heading={3}>Unsplash</Title>
                        </div>
                        <ButtonGroup theme={"borderless"} className={"listHeaderButtonGroup overflowScroll"} style={{width: "530px"}}>
                            {
                                new Array(getJsonLength(this.state.imageTopics)).fill(this.state.imageTopics).map((value, index) => (
                                    <Button key={index}
                                            onClick={this.topicButtonClick.bind(this, index, Object.keys(value)[index])}>
                                        {value[Object.keys(value)[index]]}
                                    </Button>
                                ))
                            }
                        </ButtonGroup>
                    </Space>
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