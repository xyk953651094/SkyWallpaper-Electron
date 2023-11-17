import React from "react";
import {
    Row, Col,
    List,
    Typography,
    Toast,
    ImagePreview,
    Image,
    Button,
    Space, Spin,
} from "@douyinfe/semi-ui";
import {IconUserCircle, IconGlobeStroke, IconInfoCircle, IconDelete, IconHomeStroked, IconImage} from "@douyinfe/semi-icons";
import "../stylesheets/searchComponent.css"
import {historyMaxSize} from "../typescripts/publicConstants";
import {getFontColor, getReverseColor, isEmptyString, setWallpaper} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface";
import "../stylesheets/publicStyles.css"

const {Title, Text} = Typography;

type propType = {}

type stateType = {
    history: ImageData[],
    historyLength: number,
}

interface HistoryComponent {
    state: stateType,
    props: propType
}

class HistoryComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            history: [],
            historyLength: 0,
        };
    }

    btnMouseOver(color: string, e: any) {
        if(color !== "var(--semi-color-bg-0)") {
            e.currentTarget.style.backgroundColor = getReverseColor(color);
            e.currentTarget.style.color = getFontColor(getReverseColor(color));
        }
        else {
            e.currentTarget.style.backgroundColor = "var(--semi-color-text-0)";
            e.currentTarget.style.color = "var(--semi-color-bg-0)";
        }
    }

    btnMouseOut(color: string, e: any) {
        if(color !== "var(--semi-color-bg-0)") {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = getFontColor(color);
        }
        else {
            e.currentTarget.style.backgroundColor = "var(--semi-color-bg-0)";
            e.currentTarget.style.color = "var(--semi-color-text-0)";
        }
    }

    cleanHistoryButtonOnClick() {
        localStorage.setItem("history", "[]");
        this.setState({
            history: [],
            historyLength: 0,
        })
    }

    getHistory() {
        let tempHistory = localStorage.getItem("history");
        if (tempHistory !== null && tempHistory.length !== 0) {
            this.setState({
                history: JSON.parse(tempHistory),
                historyLength: JSON.parse(tempHistory).length,
            })
        }
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

    onPageChange( currentPage: number ) {}

    componentDidMount() {
        this.getHistory();
    }

    render() {
        return (
            <List
                size="small"
                bordered
                header={
                    <Row>
                        <Col span={12}>
                            <Title heading={3}>历史记录</Title>
                        </Col>
                        <Col span={12} style={{textAlign: "right"}}>
                            <Space spacing={"loose"}>
                                <Text>{this.state.historyLength + " / " + historyMaxSize}</Text>
                                <Button icon={<IconDelete />} type='danger'
                                        onClick={this.cleanHistoryButtonOnClick.bind(this)}
                                >
                                    清空记录
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                }
                dataSource={this.state.history}
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
                                    <Space>
                                        <Button theme={"borderless"} icon={<IconUserCircle />}
                                                style={{color: item.color === "var(--semi-color-bg-0)" ? "var(--semi-color-text-0)" : getFontColor(item.color), cursor: "default"}}
                                                onMouseOver={this.btnMouseOver.bind(this, item.color)}
                                                onMouseOut={this.btnMouseOut.bind(this, item.color)}>
                                            {"摄影师：" + item.userName}
                                        </Button>
                                        <Button theme={"borderless"} icon={<IconGlobeStroke />}
                                                style={{color: item.color === "var(--semi-color-bg-0)" ? "var(--semi-color-text-0)" : getFontColor(item.color), cursor: "default"}}
                                                onMouseOver={this.btnMouseOver.bind(this, item.color)}
                                                onMouseOut={this.btnMouseOut.bind(this, item.color)}>
                                            {"来源：" + item.source}
                                        </Button>
                                    </Space>
                                    <Button theme={"borderless"} icon={<IconInfoCircle />}
                                            style={{color: item.color === "var(--semi-color-bg-0)" ? "var(--semi-color-text-0)" : getFontColor(item.color), cursor: "default"}}
                                            onMouseOver={this.btnMouseOver.bind(this, item.color)}
                                            onMouseOut={this.btnMouseOut.bind(this, item.color)}>
                                        {"图片描述：" + (item.description === null ? "暂无图片描述" : item.description)}
                                    </Button>
                                </Space>
                            </div>
                        }
                        extra={
                            <Space vertical align={"start"}>
                                <Button theme={"borderless"} icon={<IconHomeStroked/>}
                                        style={{color: item.color === "var(--semi-color-bg-0)" ? "var(--semi-color-text-0)" : getFontColor(item.color)}}
                                        onMouseOver={this.btnMouseOver.bind(this, item.color)}
                                        onMouseOut={this.btnMouseOut.bind(this, item.color)}
                                        onClick={this.homeButtonClick.bind(this, item)}>图片主页</Button>
                                <Button theme={"borderless"} icon={<IconImage/>}
                                        style={{color: item.color === "var(--semi-color-bg-0)" ? "var(--semi-color-text-0)" : getFontColor(item.color)}}
                                        onMouseOver={this.btnMouseOver.bind(this, item.color)}
                                        onMouseOut={this.btnMouseOut.bind(this, item.color)}
                                        onClick={this.setWallpaperButtonClick.bind(this, item)}>设为壁纸</Button>
                            </Space>
                        }
                    />
                )}
            />
        )
    }
}

export default HistoryComponent;