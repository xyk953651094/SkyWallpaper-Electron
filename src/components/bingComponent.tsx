import React from "react";
import {Row, Col, List, Space, Image, Toast, Typography, Button, ImagePreview} from "@douyinfe/semi-ui";
import {IconLink, IconInfoCircle, IconMapPin} from "@douyinfe/semi-icons";
import "../stylesheets/wallpaperComponent.css"
import {bingRequestUrl, defaultImageData} from "../typescripts/publicConstants";
import {ImageData} from "../typescripts/publicInterface"
import {httpRequest} from "../typescripts/publicFunctions";

const {Title, Text} = Typography;

type propType = {}

type stateType = {
    imageData: ImageData,
}

interface BingComponent {
    state: stateType,
    props: propType
}

class BingComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imageData: defaultImageData,
        };
    }

    // 获取 Bing 图片
    getImages( headers: object, url: string, data: object ) {
        let tempThis = this;
        httpRequest(headers, url, data, "GET")
            .then(function(resultData: any){
                let tempImageData: ImageData = {
                    displayUrl: "https://cn.bing.com" + resultData.images[0].url,
                    previewUrl: "https://cn.bing.com" + resultData.images[0].url,
                    imageUrl: "https://cn.bing.com",
                    userName: resultData.images[0].copyright,
                    userUrl: resultData.images[0].copyrightlink,
                    createTime: "无拍摄时间",
                    description: resultData.images[0].title,
                    color: "rgba(var(--semi-grey-0), 1)",
                    source: "Bing"
                };
                tempThis.setState({
                    imageData: tempImageData
                });
            })
            .catch(function(){
                tempThis.setState({
                    imageData: []
                },()=>{
                    Toast.error("获取 Bing 图片失败");
                });
            })
    }

    linkButtonOnClick() {
        window.open("https://cn.bing.com/", "_blank");
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.display !== prevProps.display) {
            this.setState({
                display: nextProps.display,
            });
        }
    }

    componentDidMount() {
        this.getImages({}, bingRequestUrl, {});
    }

    render() {
        return (
            <List
                className={"listStyle"}
                header={
                    <Row>
                        <Col span={12}>
                            <Title heading={3}>Microsoft Bing</Title>
                        </Col>
                        <Col span={12} style={{textAlign: "right"}}>
                            <Button theme={"borderless"} icon={<IconLink />}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={this.linkButtonOnClick.bind(this)}
                            >
                                {"前往 Bing"}
                            </Button>
                        </Col>
                    </Row>
                }
                size="small"
                bordered
            >
                <List.Item
                    main={
                        <Space vertical align={"start"}>
                            <Image width={"100%"} src={this.state.imageData.displayUrl} preview={false}></Image>
                            <Space align={"start"}>
                                <IconInfoCircle />
                                <Text>{this.state.imageData.description}</Text>
                            </Space>
                            <Space align={"start"}>
                                <IconMapPin />
                                <Text>{this.state.imageData.userName}</Text>
                            </Space>
                        </Space>
                    }
                />
            </List>
        )
    }
}

export default BingComponent;