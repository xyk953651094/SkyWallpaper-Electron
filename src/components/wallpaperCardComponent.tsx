import React from "react";
import {Row, Space, CardGroup, Card, Image, ButtonGroup, Button, Toast} from "@douyinfe/semi-ui";
import {IconHomeStroked, IconDownloadStroked, IconHeartStroked, IconLikeHeart} from "@douyinfe/semi-icons";
import "../stylesheets/wallpaperComponent.css"
import {getFontColor, getJsonLength, httpRequest, isEmptyString} from "../typescripts/publicFunctions"
import {unsplashClientId, unsplashUrl} from "../typescripts/publicConstants";

const { Meta } = Card;

type propType = {
    imageData: any,
}

type stateType = {
    imageData: any,
    blurHash: string[],
    imageSideLength: number,
    collectButtonDisplay: string[],
    unCollectButtonDisplay: string[],
}

interface WallpaperCardComponent {
    state: stateType,
    props: propType
}

class WallpaperCardComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imageData: {},
            blurHash: [],
            imageSideLength: 245,
            collectButtonDisplay: new Array(0).fill("block"),
            unCollectButtonDisplay: new Array(0).fill("none"),
        };
    }

    homeButtonClick(index: number) {
        console.log(this.props.imageData[index].user.links.html)
        if ( isEmptyString(this.props.imageData[index].user.links.html) ) {
            Toast.error("无跳转链接");
        } else {
            window.open(this.props.imageData[index].user.links.html + unsplashUrl);
        }
    }

    downloadButtonClick(index: number) {
        if ( isEmptyString(this.props.imageData[index].links.download_location) ) {
            Toast.error("无下载链接");
        } else {
            window.open(this.props.imageData[index].links.html);
            // let url = this.props.imageData[index].links.download_location;
            // let data = {
            //     "client_id": unsplashClientId,
            // }
            // httpRequest(url, data, "GET")
            //     .then(function(resultData: any){
            //         // window.open(resultData.url + unsplashUrl);
            //         let a = document.createElement("a");
            //         a.href = resultData.url + unsplashUrl;
            //         a.download = "unsplashWallpaper.jpg";
            //         document.body.appendChild(a);
            //         a.click();
            //         document.body.removeChild(a);
            //     })
            //     .catch(function(){
            //         Toast.error("下载 Unsplash 图片失败");
            //     })
            //     .finally(function(){});
        }
    }

    collectButtonClick(index: number) {
        let tempData: JSON[] = [];
        let collectionData = localStorage.getItem("collectionData");

        if(collectionData !== null && collectionData.length !== 0) {  // 收藏列表不为空
            tempData = JSON.parse(collectionData);

            let hasSameItem = false;
            for(let i in tempData) {
                // @ts-ignore
                if(this.props.imageData[index].id === tempData[i].id) {
                    hasSameItem = true;
                }
            }
            if (hasSameItem) {
                Toast.error("收藏列表存在相同图片");
            }
            else if(tempData.length >= 100) {
                Toast.error("收藏列表已满！");
            }
            else {  // 收藏列表为空
                tempData.push(this.props.imageData[index]);
                localStorage.setItem("collectionData", JSON.stringify(tempData));
                Toast.success("收藏成功");
            }
        }
        else {
            tempData.push(this.props.imageData[index]);
            localStorage.setItem("collectionData", JSON.stringify(tempData));
            Toast.success("收藏成功");
        }

        let tempCollectButtonDisplay = this.state.collectButtonDisplay;
        let tempUnCollectButtonDisplay = this.state.unCollectButtonDisplay;
        tempCollectButtonDisplay[index] = "none";
        tempUnCollectButtonDisplay[index] = "block";
        this.setState({
            collectButtonDisplay: tempCollectButtonDisplay,
            unCollectButtonDisplay: tempUnCollectButtonDisplay,
        })
    }

    unCollectButtonClick(index: number) {
        let tempData: JSON[] = [];
        let collectionData = localStorage.getItem("collectionData");
        if(collectionData !== null && collectionData.length !== 0) {
            tempData = JSON.parse(collectionData);
            for(let i in tempData) {
                // @ts-ignore
                if(tempData[i].id === this.props.imageData[index].id) {
                    tempData.splice(Number(i), 1);
                }
            }

            localStorage.setItem("collectionData", JSON.stringify(tempData));
            Toast.success("已取消收藏");
        }

        let tempCollectButtonDisplay = this.state.collectButtonDisplay;
        let tempUnCollectButtonDisplay = this.state.unCollectButtonDisplay;
        tempCollectButtonDisplay[index] = "block";
        tempUnCollectButtonDisplay[index] = "none";

        this.setState({
            collectButtonDisplay: tempCollectButtonDisplay,
            unCollectButtonDisplay: tempUnCollectButtonDisplay,
        })
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (getJsonLength(nextProps.imageData) !== 0 && nextProps.imageData !== prevProps.imageData) {
            this.setState({
                imageData: nextProps.imageData,
                collectButtonDisplay: new Array(getJsonLength(nextProps.imageData)).fill("block"),
                unCollectButtonDisplay: new Array(getJsonLength(nextProps.imageData)).fill("none"),
            });
        }
    }

    render() {
        return (
            <Row>
                <Space vertical spacing="tight" align="start">
                    <CardGroup>
                        {
                            new Array(getJsonLength(this.state.imageData)).fill(this.state.imageData).map((value, index) => (
                                <Card
                                    key={index}
                                    headerLine={false}
                                    style={{
                                        width: this.state.imageSideLength,
                                        backgroundColor: value[index].color,
                                    }}
                                    cover={
                                        <Image width={this.state.imageSideLength} height={this.state.imageSideLength}
                                               src={value[index].urls.regular} preview={true}
                                               placeholder={<Image src={value[index].urls.small} preview={false}/>}
                                               className={"wallpaperFadeIn"}
                                        />
                                    }
                                    actions={[
                                        <ButtonGroup size="small" theme={"borderless"}>
                                            <Button icon={<IconHomeStroked/>}
                                                    style={{color: getFontColor(value[index].color)}}
                                                    onClick={this.homeButtonClick.bind(this, index)}>主页</Button>
                                            <Button icon={<IconDownloadStroked/>}
                                                    style={{color: getFontColor(value[index].color)}}
                                                    onClick={this.downloadButtonClick.bind(this, index)}>下载</Button>
                                            <Button icon={<IconHeartStroked/>}
                                                    style={{
                                                        color: getFontColor(value[index].color),
                                                        display: this.state.collectButtonDisplay[index]
                                                    }}
                                                    onClick={this.collectButtonClick.bind(this, index)}>收藏</Button>
                                            <Button icon={<IconLikeHeart style={{color: "red"}}/>}
                                                    style={{
                                                        color: getFontColor(value[index].color),
                                                        display: this.state.unCollectButtonDisplay[index]
                                                    }}
                                                    onClick={this.unCollectButtonClick.bind(this, index)}>取消</Button>
                                        </ButtonGroup>
                                    ]}
                                >
                                    <Meta
                                        title={
                                            <span className="cardAuthorSpan" style={{color: getFontColor(value[index].color)}}>
                                                {"摄影师：" + value[index].user.name}
                                            </span>
                                        }
                                        description={
                                            <span style={{color: getFontColor(value[index].color)}}>
                                                {"拍摄日期：" + value[index].created_at.split("T")[0]}
                                            </span>
                                        }
                                    />
                                </Card>
                            ))
                        }
                    </CardGroup>
                </Space>
            </Row>
        )
    }
}

export default WallpaperCardComponent;