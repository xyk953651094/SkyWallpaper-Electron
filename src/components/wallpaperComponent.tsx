import React from "react";
import {Row, Col, List, Toast, Typography, Space, ButtonGroup, Button, Select} from '@douyinfe/semi-ui';
import "../stylesheets/wallpaperComponent.css"
import WallpaperCardComponent from "./wallpaperCardComponent";
import {getJsonLength, httpRequest} from "../typescripts/publicFunctions";
import {unsplashClientId, imageTopics} from "../typescripts/publicConstants";

const {Title, Text} = Typography;
const todayRequestUrl:string = "https://api.unsplash.com/photos";
const topicRequestUrl:string = "https://api.unsplash.com/photos/random";
const imageCount: number = 6;

type propType = {
    display: string,
}

type stateType = {
    todayImages: any,
    topicImages: any,
    imageTopics: any,
    todayRequestData: any,
    topicRequestData: any,
}

interface WallpaperComponent {
    state: stateType,
    props: propType
}

class WallpaperComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            todayImages: {},
            topicImages: {},
            imageTopics: imageTopics,
            todayRequestData: {
                "client_id": unsplashClientId,
                "per_page":  imageCount,
                "order_by": "latest",
            },
            topicRequestData: {
                "client_id": unsplashClientId,
                "orientation": "landscape",
                "topics": "",
                "content_filter": "high",
                "count": imageCount
            }
        };
    }

    // 获取 Unsplash 图片
    getImages( type: "today" | "topic", url: string, data: object ) {
        let tempThis = this;
        httpRequest(url, data, "GET")
            .then(function(resultData: any){
                switch (type) {
                    case "today": {
                        tempThis.setState({
                            todayImages: resultData
                        });
                        break;
                    }
                    case "topic": {
                        tempThis.setState({
                            topicImages: resultData
                        });
                        break;
                    }
                }
            })
            .catch(function(){
                Toast.error("获取 Unsplash 图片失败");
            })
    }

    todaySelectOnChange(value: any) {
        let data = Object.assign({}, this.state.todayRequestData, {order_by: value});
        this.setState({
            todayRequestData: data,
        }, ()=>{
            this.getImages("today", todayRequestUrl, this.state.todayRequestData);
        })
    }

    topicButtonClick(value: string) {
        let data = Object.assign({}, this.state.topicRequestData, {topics: value});
        this.setState({
            topicRequestData: data,
        }, ()=>{
            this.getImages("topic", topicRequestUrl, this.state.topicRequestData);
        })
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.display !== prevProps.display) {
            this.setState({
                display: nextProps.display,
            });
        }
    }

    componentDidMount() {
        // 获取每日图片
        this.getImages("today", todayRequestUrl, this.state.todayRequestData);

        // 获取主题图片
        this.getImages("topic", topicRequestUrl, this.state.topicRequestData);
    }

    render() {
        return (
            <Row style={{display: this.props.display}}>
                <Space spacing={"loose"} vertical align={"start"}>
                    <List
                        header={
                            <Row>
                                <Col span={12} style={{textAlign: "left"}}>
                                    <Title heading={3}>今日</Title>
                                </Col>
                                <Col span={12} style={{textAlign: "right"}}>
                                    <Select className="todaySelect" defaultValue="popular" onChange={this.todaySelectOnChange.bind(this)}>
                                        <Select.Option value="popular">热门图片</Select.Option>
                                        <Select.Option value="latest">最新图片</Select.Option>
                                        <Select.Option value="oldest">老旧图片</Select.Option>
                                    </Select>
                                </Col>
                            </Row>
                        }
                        size="small"
                        bordered
                        style={{ display: this.props.display }}
                    >
                        <List.Item
                            main={
                                <WallpaperCardComponent imageData={this.state.todayImages}></WallpaperCardComponent>
                            }
                        />
                    </List>
                    <List
                        header={
                            <Row>
                                <Col span={2} style={{textAlign: "left"}}>
                                    <Title heading={3}>主题</Title>
                                </Col>
                                <Col span={22} style={{textAlign: "right"}}>
                                    <ButtonGroup theme={"borderless"} className={"topicButtonGroup"}>
                                        {
                                            new Array(getJsonLength(this.state.imageTopics)).fill(this.state.imageTopics).map((value, index) => (
                                                <Button key={index} className={"topicButton"} onClick={this.topicButtonClick.bind(this, Object.keys(value)[index])}>
                                                    { value[Object.keys(value)[index]] }
                                                </Button>
                                            ))
                                        }
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        }
                        size="small"
                        bordered
                        style={{ display: this.props.display }}
                    >
                        <List.Item
                            main={
                                <WallpaperCardComponent imageData={this.state.topicImages}></WallpaperCardComponent>
                            }
                        />
                    </List>
                </Space>
            </Row>
        )
    }
}

export default WallpaperComponent;