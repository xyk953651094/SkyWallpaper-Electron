import React from "react";
import {Button, Image, ImagePreview, List, Space, Spin, Toast, Typography,} from "@douyinfe/semi-ui";
import {IconHomeStroked, IconImage, IconInfoCircle, IconUserCircle} from "@douyinfe/semi-icons";
import "../stylesheets/searchComponent.css"
import {listPageSize} from "../typescripts/publicConstants";
import {btnMouseOut, btnMouseOver, getFontColor, isEmpty, setWallpaper} from "../typescripts/publicFunctions";
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
        if (isEmpty(item.imageUrl)) {
            Toast.error("无跳转链接");
        } else {
            window.open(item.imageUrl, "_blank");
        }
    }

    setWallpaperButtonClick(item: any) {
        setWallpaper(item);
    }

    componentDidMount() {
        this.getHistory();
    }

    render() {
        return (
            <List
                size="small"
                bordered
                header={
                    <Title heading={3}>{"历史记录（" + this.state.historyLength + " / " + listPageSize + "）"}</Title>
                }
                dataSource={this.state.history}
                renderItem={item => (
                    <List.Item
                        style={{backgroundColor: item.color, padding: "10px 10px 5px 10px"}}
                        header={
                            <ImagePreview disableDownload={true}>
                                <Image width={100} height={100} src={item.displayUrl}
                                       preview={{src: item.wallpaperUrl}}
                                       placeholder={<Spin/>}
                                       className={"wallpaperFadeIn"}
                                />
                            </ImagePreview>
                        }
                        main={
                            <div className={"alignCenter"} style={{height: "100px"}}>
                                <Space vertical align="start">
                                    <Button theme={"borderless"} icon={<IconUserCircle/>}
                                            style={{color: getFontColor(item.color), cursor: "default"}}
                                            onMouseOver={btnMouseOver.bind(this, item.color)}
                                            onMouseOut={btnMouseOut.bind(this, item.color)}>
                                        {"摄影师：" + item.userName}
                                    </Button>
                                    <Button theme={"borderless"} icon={<IconInfoCircle/>}
                                            style={{color: getFontColor(item.color), cursor: "default"}}
                                            onMouseOver={btnMouseOver.bind(this, item.color)}
                                            onMouseOut={btnMouseOut.bind(this, item.color)}>
                                        {"图片描述：" + item.description === null ? "暂无图片描述" : item.description}
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

export default HistoryComponent;