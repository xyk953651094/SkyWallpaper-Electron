import React from "react";
import {List, Toast, Typography} from '@douyinfe/semi-ui';
import "../stylesheets/wallpaperComponent.css"
import WallpaperCardComponent from "./wallpaperCardComponent";
import {bingRequestUrl, wallpaperPageSize, } from "../typescripts/publicConstants";
import {ImageData} from "../typescripts/publicInterface"
import {httpRequest} from "../typescripts/publicFunctions";
const {Title} = Typography;

type propType = {}

type stateType = {
    imageData: ImageData[],
    requestData: any,
}

interface BingComponent {
    state: stateType,
    props: propType
}

class BingComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imageData: [],
            requestData: {
                "format": "js",
                "idx": "0",
                "n": wallpaperPageSize,
                "mkt": "zh-CN"
            },
        };
    }

    // // 获取 Pexels 图片
    getImages( headers: object, url: string, data: object ) {
        let tempThis = this;
        httpRequest(headers, url, data, "GET")
            .then(function(resultData: any){
                let tempImageData = [];
                for (let i in resultData.images) {
                    let tempData: ImageData = {
                        displayUrl: "https://s.cn.bing.net" + resultData.images[i].url,
                        previewUrl: "https://s.cn.bing.net" + resultData.images[i].url,
                        imageUrl: "https://cn.bing.com",
                        userName: resultData.images[i].copyright,
                        userUrl: resultData.images[i].copyrightlink,
                        createTime: "无拍摄时间",
                        description: resultData.images[i].title,
                        color: "rgba(var(--semi-grey-0), 1)",
                    };
                    tempImageData.push(tempData);
                }
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

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.display !== prevProps.display) {
            this.setState({
                display: nextProps.display,
            });
        }
    }

    componentDidMount() {
        this.getImages({}, bingRequestUrl, this.state.requestData);
    }

    render() {
        return (
            <List
                style={{width: "660px"}}
                header={<Title heading={3}>Bing</Title>}
                size="small"
                bordered
            >
                <List.Item
                    main={
                        <WallpaperCardComponent imageData={this.state.imageData}></WallpaperCardComponent>
                    }
                />
            </List>
        )
    }
}

export default BingComponent;