import React from "react";
import {
    Button,
    Image,
    ImagePreview,
    List,
    Space,
    Spin,
    Toast,
} from "@douyinfe/semi-ui";
import {IconDownload, IconImage, IconInfoCircle, IconUserCircle} from "@douyinfe/semi-icons";
import "../stylesheets/searchComponent.css"
import {btnMouseOut, btnMouseOver, getFontColor, isEmpty, setWallpaper} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface";
import "../stylesheets/publicStyles.css";

type propType = {
    listHeader: any,
    listData: ImageData[],
    listFooter: any,
    listLoading: boolean
}

type stateType = {}

interface ListComponent {
    state: stateType,
    props: propType
}

class ListComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    downloadBtnOnClick(item: any) {
        if (isEmpty(item.imageUrl)) {
            Toast.error("无跳转链接");
        } else {
            window.open(item.imageUrl, "_blank");
        }
    }

    setWallpaperBtnOnClick(item: any) {
        setWallpaper(item);
    }

    render() {
        return (
            <List
                loading={this.props.listLoading}
                size="small"
                bordered
                header={this.props.listHeader}
                dataSource={this.props.listData}
                renderItem={item => (
                    <List.Item
                        style={{backgroundColor: item.color, padding: "10px 10px 5px 10px"}}
                        header={
                            <ImagePreview disableDownload={true}>
                                <Image width={160} height={100} src={item.displayUrl}
                                       preview={{src: item.wallpaperUrl}}
                                       placeholder={<Spin/>}
                                       className={"wallpaperFadeIn"}
                                />
                            </ImagePreview>
                        }
                        main={
                            <div className={"alignCenter"} style={{height: "100px"}}>
                                <Space vertical align="start">
                                    <Button theme={"borderless"} icon={<IconInfoCircle/>}
                                            style={{color: getFontColor(item.color), cursor: "default"}}
                                            onMouseOver={btnMouseOver.bind(this, item.color)}
                                            onMouseOut={btnMouseOut.bind(this, item.color)}>
                                        {/*{"abcdeabcdeabcdeabcdeabcdeabcdeabcde"}*/}
                                        {item.description === null ? "暂无图片描述" : item.description}
                                    </Button>
                                    <Button theme={"borderless"} icon={<IconUserCircle/>}
                                            style={{color: getFontColor(item.color), cursor: "default"}}
                                            onMouseOver={btnMouseOver.bind(this, item.color)}
                                            onMouseOut={btnMouseOut.bind(this, item.color)}>
                                        {"由 Unsplash 的 " + item.userName + " 拍摄"}
                                    </Button>
                                </Space>
                            </div>
                        }
                        extra={
                            <Space vertical align={"start"}>
                                <Button theme={"borderless"} icon={<IconDownload />}
                                        style={{color: getFontColor(item.color)}}
                                        onMouseOver={btnMouseOver.bind(this, item.color)}
                                        onMouseOut={btnMouseOut.bind(this, item.color)}
                                        onClick={this.downloadBtnOnClick.bind(this, item)}>下载图片</Button>
                                <Button theme={"borderless"} icon={<IconImage/>}
                                        style={{color: getFontColor(item.color)}}
                                        onMouseOver={btnMouseOver.bind(this, item.color)}
                                        onMouseOut={btnMouseOut.bind(this, item.color)}
                                        onClick={this.setWallpaperBtnOnClick.bind(this, item)}>设为壁纸</Button>
                            </Space>
                        }
                    />
                )}
                footer={this.props.listFooter}
            />
        )
    }
}

export default ListComponent;