import React from "react";
import {
    Button,
    Col,
    Row,
    Toast,
    Typography
} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import {
    defaultImageData,
    imageDescriptionMaxSize,
    unsplashClientId,
    unsplashTopicRequestUrl,
} from "../typescripts/publicConstants";
import {
    httpRequest,
    isEmpty,
    setWallpaper
} from "../typescripts/publicFunctions";
import {ImageData, Preference} from "../typescripts/publicInterface"
import {IconRefresh} from "@douyinfe/semi-icons";
import ListComponent from "../publicComponents/listComponent";

const {Title} = Typography;

type propType = {
    preference: Preference,
}

type stateType = {
    loading: boolean,
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
            loading: false,
            imageData: defaultImageData,
        };
    }

    getImageBtnOnClick() {
        this.getImage();
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
            "client_id": this.props.preference.accessKey === "" ? unsplashClientId : this.props.preference.accessKey,
            "orientation": "landscape",
            "topics": isEmpty(imageQuery) ? tempImageTopics : "",
            "query": imageQuery,
            "content_filter": "high",
        }
        this.setState({
            loading: true,
        }, () => {
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
                        location: resultData.location.name ? resultData.location.name : "暂无位置信息",
                        color: resultData.color,
                    }

                    tempThis.setState({
                        loading: false,
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
                    // 请求失败时使用上一次请求结果
                    let lastRandomImage: any = localStorage.getItem("lastRandomImage");
                    if (lastRandomImage) {
                        lastRandomImage = JSON.parse(lastRandomImage);
                        setWallpaper(lastRandomImage);
                    } else {
                        tempThis.setState({
                            loading: false,
                            imageData: {},
                        }, () => {
                            Toast.error("获取图片失败，请检查网络连接");
                        });
                    }
                })
        });
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
            } else {

            }
        }
    }

    render() {
        const listHeader = (
            <Row>
                <Col span={12} style={{textAlign: "left"}}>
                    <Title heading={3}>轮换壁纸</Title>
                </Col>
                <Col span={12} style={{textAlign: "right"}}>
                    <Button theme={"borderless"} icon={<IconRefresh />}
                            style={{color: "var(--semi-color-text-0)"}} onClick={this.getImageBtnOnClick.bind(this)}>
                        {"刷新"}
                    </Button>
                </Col>
            </Row>
        )

        return (
            <ListComponent listHeader={listHeader}
                           listData={ new Array(this.state.imageData) }
                           listFooter={null}
                           listLoading={this.state.loading}
            />
        )
    }
}

export default RandomImageComponent;