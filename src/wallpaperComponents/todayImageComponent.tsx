import React from "react";
import {
    List,
    Toast,
    Typography,
    Button,
    Space,
    ImagePreview,
    Image, Spin, Row, Col, RadioGroup, Radio
} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import {
    unsplashTodayRequestUrl,
    unsplashClientId,
    imageDescriptionMaxSize, listPageSize
} from "../typescripts/publicConstants";
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    httpRequest,
    isEmpty,
    setWallpaper
} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface"
import {
    IconHomeStroked,
    IconImage,
    IconInfoCircle, IconMapPin,
    IconUserCircle
} from "@douyinfe/semi-icons";

const {Title} = Typography;
const $ = require("jquery");

type propType = {}

type stateType = {
    loading: boolean,
    imageData: ImageData[],
    orderBy: "popular" | "latest",
}

interface TodayImageComponent {
    state: stateType,
    props: propType
}

class TodayImageComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            imageData: [],
            orderBy: "popular",
        };
    }

    orderRadioGroupOnChange(e: any) {
        this.setState({
            imageData: [],
            orderBy: e.target.value,
        }, () => {
            this.getImages();
            localStorage.setItem("orderBy", e.target.value);
        })
    }

    homeButtonClick(item: any) {
        if ( isEmpty(item.imageUrl) ) {
            Toast.error("无跳转链接");
        } else {
            window.open(item.imageUrl, "_blank");
        }
    }

    setWallpaperButtonClick(item: any) {
        setWallpaper(item);
    }

    // 获取图片
    getImages() {
        let tempThis = this;
        let data = {
            "client_id": unsplashClientId,
            "per_page": listPageSize,
            "order_by": this.state.orderBy,
        }

        httpRequest({}, unsplashTodayRequestUrl, data, "GET")
            .then(function (resultData: any) {
                let tempImageData = [];
                for (let i in resultData) {
                    let tempData: ImageData = {
                        wallpaperUrl: resultData[i].urls.full,
                        displayUrl: resultData[i].urls.regular,
                        imageUrl: resultData[i].links.html,
                        userName: resultData[i].user.name,
                        userUrl: resultData[i].user.links.html,
                        createTime: resultData[i].created_at.split("T")[0],
                        description: (resultData[i].alt_description.length > imageDescriptionMaxSize ? resultData[i].alt_description.substring(0, imageDescriptionMaxSize) + "..." : resultData[i].alt_description),
                        location: "暂无信息",
                        color: resultData[i].color,
                    };
                    tempImageData.push(tempData);
                }

                tempThis.setState({
                    loading: false,
                    imageData: tempImageData,
                }, () => {
                    // 保存请求时间，防抖节流
                    localStorage.setItem("lastTodayImagesRequestTime", String(new Date().getTime()));
                    localStorage.setItem("lastTodayImages", JSON.stringify(tempThis.state.imageData));
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
        // 防抖节流
        let lastRequestTime: any = localStorage.getItem("lastTodayImagesRequestTime");
        let nowTimeStamp = new Date().getTime();
        if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            this.getImages();
        } else if (nowTimeStamp - parseInt(lastRequestTime) > 60 * 60 * 1000) {  // 必须多于切换间隔才能进行新的请求
            this.getImages();
        } else {  // 切换间隔内使用上一次请求结果
            let lastImage: any = localStorage.getItem("lastTodayImages");
            if (lastImage) {
                this.setState({
                    imageData: JSON.parse(lastImage),
                });
            }
        }

        // 初始化单选框
        let tempOrderBy = localStorage.getItem("orderBy");
        if(!isEmpty(tempOrderBy)) {
            this.setState({
                orderBy: tempOrderBy,
            })
        }
    }

    render() {
        return (
            <List
                loading={this.state.loading}
                size="small"
                bordered
                header={
                <Row>
                    <Col span={12}>
                        <Title heading={3}>推荐壁纸</Title>
                    </Col>
                    <Col span={12} style={{textAlign: "right"}}>
                        <RadioGroup type="button" defaultValue={this.state.orderBy} value={this.state.orderBy} onChange={this.orderRadioGroupOnChange.bind(this)}>
                            <Radio value={"popular"}>热门</Radio>
                            <Radio value={"latest"}>最新</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                }
                dataSource={this.state.imageData}
                renderItem={item => (
                    <List.Item
                        style={{backgroundColor: item.color, padding: "10px 10px 5px 10px"}}
                        header={
                            <ImagePreview disableDownload={true}>
                                <Image width={100} height={100} src={item.displayUrl}
                                       preview={{src: item.wallpaperUrl}}
                                       placeholder={<Spin />}
                                       className={"wallpaperFadeIn"}
                                />
                            </ImagePreview>
                        }
                        main={
                            <div className={"alignCenter"} style={{height: "100px"}}>
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

export default TodayImageComponent;