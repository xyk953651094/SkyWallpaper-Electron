import React from "react";
import {
    Button,
    Col,
    Radio,
    RadioGroup,
    Row,
    Space,
    Toast,
    Typography
} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import {
    imageDescriptionMaxSize,
    unsplashClientId,
    unsplashTodayRequestUrl
} from "../typescripts/publicConstants";
import {httpRequest, isEmpty} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface"
import {IconRefresh} from "@douyinfe/semi-icons";
import ListComponent from "../publicComponents/listComponent";

const {Title} = Typography;

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

    getImageBtnOnClick() {
        this.getImages();
    }

    // 获取图片
    getImages() {
        let tempThis = this;
        let data = {
            "client_id": unsplashClientId,
            "order_by": this.state.orderBy,
        }
        this.setState({
            loading: true,
        }, () => {
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
                            location: "暂无位置信息",
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
                    }, () => {
                        Toast.error("获取图片失败");
                    });
                })
        });
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
        if (!isEmpty(tempOrderBy)) {
            this.setState({
                orderBy: tempOrderBy,
            })
        }
    }

    render() {
        const listHeader = (
            <Row>
                <Col span={12}>
                    <Title heading={3}>今日推荐</Title>
                </Col>
                <Col span={12} style={{textAlign: "right"}}>
                    <Space>
                        <RadioGroup type="button" defaultValue={this.state.orderBy} value={this.state.orderBy}
                                    onChange={this.orderRadioGroupOnChange.bind(this)}>
                            <Radio value={"popular"}>热门</Radio>
                            <Radio value={"latest"}>最新</Radio>
                        </RadioGroup>
                        <Button theme={"borderless"} icon={<IconRefresh />}
                                style={{color: "var(--semi-color-text-0)"}} onClick={this.getImageBtnOnClick.bind(this)}>
                            {"刷新"}
                        </Button>
                    </Space>
                </Col>
            </Row>
        )

        return (
            <ListComponent listHeader={listHeader}
                           listData={this.state.imageData}
                           listFooter={null}
                           listLoading={this.state.loading}
            />
        )
    }
}

export default TodayImageComponent;