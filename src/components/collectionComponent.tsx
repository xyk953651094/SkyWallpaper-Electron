import React from "react";
import {Row, Space, List, Image, ButtonGroup, Button, Typography, Col, Toast} from '@douyinfe/semi-ui';
import {IconRefresh} from "@douyinfe/semi-icons";
import "../stylesheets/collectionComponent.css"
import {getFontColor, httpRequest, isEmptyString} from "../typescripts/publicFunctions";
import {unsplashClientId, unsplashVisitUrl} from "../typescripts/publicConstants";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";

const {Title} = Typography;

type propType = {
    display: string,
}

type stateType = {
    collectionData: any[],
}

interface collectionComponent {
    state: stateType,
    props: propType
}

class collectionComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            collectionData: []
        };
    }

    refreshButtonClick() {
        let collectionData = localStorage.getItem("collectionData");
        if(collectionData !== null && collectionData.length !== 0) {
            this.setState({
                collectionData: JSON.parse(collectionData),
            })
        }
    }

    homeButtonClick(item: any) {
        if ( item.user.links.html ) {
            window.open(item.user.links.html + unsplashVisitUrl);
        } else {
            Toast.error("无跳转链接");
        }
    }

    downloadButtonClick(item: any) {
        if ( isEmptyString(item.links.download_location) ) {
            Toast.error("无下载链接");
        } else {
            let url = item.links.download_location;
            let data = {
                "client_id": unsplashClientId,
            }
            httpRequest({}, url, data, "GET")
                .then(function(resultData: any){
                    window.open(resultData.url + unsplashVisitUrl);
                })
                .catch(function(){
                    Toast.error("下载 Unsplash 图片失败");
                })
                .finally(function(){});
        }
    }

    unCollectButtonClick(item: any) {
        let tempData: JSON[] = [];
        let collectionData = localStorage.getItem("collectionData");
        if(collectionData !== null && collectionData.length !== 0) {
            tempData = JSON.parse(collectionData);
            for(let i in tempData) {
                // @ts-ignore
                if(tempData[i].id === item.id) {
                    tempData.splice(Number(i), 1);
                }
            }

            // 刷新列表
            this.setState({
                collectionData: tempData,
            },()=>{
                localStorage.setItem("collectionData", JSON.stringify(tempData));
                Toast.success("已取消收藏");
            })
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.display !== prevProps.display) {
            this.setState({
                display: nextProps.display,
            },()=>{
                // 刷新列表
                let collectionData = localStorage.getItem("collectionData");
                if(collectionData !== null && collectionData.length !== 0) {
                    this.setState({
                        collectionData: JSON.parse(collectionData),
                    })
                }
            });
        }
    }

    componentDidMount() {
        let collectionData = localStorage.getItem("collectionData");
        if(collectionData !== null && collectionData.length !== 0) {
            this.setState({
                collectionData: JSON.parse(collectionData),
            })
        }
    }

    render() {
        return (
            <List
                header={
                    <Row>
                        <Col span={12} style={{textAlign: "left"}}>
                            <Title heading={3}>我的收藏</Title>
                        </Col>
                        <Col span={12} style={{textAlign: "right"}}>
                            <Space spacing="medium">
                                <Text>{this.state.collectionData.length + " / 100"}</Text>
                                <Button theme={'borderless'} icon={<IconRefresh />} style={{color: "rgba(var(--semi-grey-9), 1)"}}
                                        onClick={this.refreshButtonClick.bind(this)}></Button>
                            </Space>
                           </Col>
                    </Row>
                }
                size="small"
                bordered
                style={{ display: this.props.display }}
                dataSource={this.state.collectionData}
                renderItem={item => (
                    <List.Item
                        style={{backgroundColor: item.color}}
                        header={
                            <Image width={50} height={50} src={item.urls.regular} preview={true}
                                   placeholder={<Image src={item.urls.thumb} width={50} height={50} preview={false}/>}
                            />
                        }
                        main={
                            <div>
                                <p className="collectionTitleP" style={{color: getFontColor(item.color)}}>
                                    {"摄影师：" + item.user.name + "｜拍摄于：" + item.created_at.split("T")[0]}
                                </p>
                                <p className="collectionDescriptionP" style={{color: getFontColor(item.color)}}>
                                    {item.description == null ? "暂无图片描述" : "图片描述：" + item.description}
                                </p>
                            </div>
                        }
                        extra={
                            <ButtonGroup>
                                <Button theme={'borderless'} style={{color: getFontColor(item.color)}}
                                        onClick={this.homeButtonClick.bind(this, item)}>主页</Button>
                                <Button theme={'borderless'} style={{color: getFontColor(item.color)}}
                                        onClick={this.downloadButtonClick.bind(this, item)}>下载</Button>
                                <Button theme={'borderless'} style={{color: getFontColor(item.color)}}
                                        onClick={this.unCollectButtonClick.bind(this, item)}>取消收藏</Button>
                            </ButtonGroup>
                        }
                    />
                )}
            />
        )
    }
}

export default collectionComponent;