import React from "react";
import {
    Row, Col,
    List,
    Typography,
    Toast,
    ImagePreview,
    Image,
    ButtonGroup,
    Button,
    Space,
} from "@douyinfe/semi-ui";
import {IconDelete, IconHomeStroked, IconDownloadStroked} from "@douyinfe/semi-icons";
import "../stylesheets/searchComponent.css"
import {historyMaxSize} from "../typescripts/publicConstants";
import {getFontColor, isEmptyString, setWallpaper} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface";

const {Title, Text} = Typography;

type propType = {
    display: string,
}

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

    cleanHistoryButtonOnClick() {
        localStorage.setItem("history", "[]");
        this.setState({
            history: [],
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
            window.open(item.imageUrl);
        }
    }

    setWallpaperButtonClick(item: any) {
        setWallpaper(item);
    }

    onPageChange( currentPage: number ) {}

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.display !== prevProps.display) {
            this.setState({
                display: nextProps.display,
            });

            // 每次进入时刷新列表
            this.getHistory();
        }
    }

    componentDidMount() {
        this.getHistory();
    }

    render() {
        return (
            <List
                style={{display: this.props.display}}
                size="small"
                bordered
                header={
                    <Row>
                        <Col span={12}>
                            <Title heading={3}>历史记录</Title>
                        </Col>
                        <Col span={12} style={{textAlign: "right"}}>
                            <Space spacing={"loose"}>
                                <Button theme={"borderless"} icon={<IconDelete />}
                                        style={{color: "rgba(var(--semi-grey-9), 1)"}}
                                        onClick={this.cleanHistoryButtonOnClick.bind(this)}
                                >
                                    清空历史记录
                                </Button>
                                <Text>{this.state.historyLength + " / " + historyMaxSize}</Text>
                            </Space>
                        </Col>
                    </Row>
                }
                dataSource={this.state.history}
                renderItem={item => (
                    <List.Item
                        style={{backgroundColor: item.color, padding: "10px 10px 5px 10px"}}
                        header={
                            <ImagePreview>
                                <Image width={80} height={80} src={item.displayUrl} preview={true}
                                       placeholder={<Image src={item.previewUrl} preview={false}/>}
                                       className={"wallpaperFadeIn"}
                                />
                            </ImagePreview>
                        }
                        main={
                            <Space align="start" vertical>
                                <Title heading={5} className="searchTitleP"
                                       style={{color: getFontColor(item.color)}}>
                                    {"摄影师：" + item.userName}
                                </Title>
                                <Text className="searchDescriptionP" style={{color: getFontColor(item.color)}}>
                                    {item.description == null ? "暂无图片描述" : "图片描述：" + item.description}
                                </Text>
                            </Space>
                        }
                        extra={
                            <ButtonGroup>
                                <Button theme={"borderless"} icon={<IconHomeStroked/>}
                                        style={{color: getFontColor(item.color)}}
                                        onClick={this.homeButtonClick.bind(this, item)}>图片主页</Button>
                                <Button theme={"borderless"} icon={<IconDownloadStroked/>}
                                        style={{color: getFontColor(item.color)}}
                                        onClick={this.setWallpaperButtonClick.bind(this, item)}>设为桌面壁纸</Button>
                            </ButtonGroup>
                        }
                    />
                )}
            />
        )
    }
}

export default HistoryComponent;