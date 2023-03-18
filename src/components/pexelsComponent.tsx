import React from "react";
import {List, Toast, Typography} from '@douyinfe/semi-ui';
import "../stylesheets/wallpaperComponent.css"
import WallpaperCardComponent from "./wallpaperCardComponent";
import {pexelsCurateRequestUrl, pexelsAuth, wallpaperPageSize} from "../typescripts/publicConstants";
import {ImageData} from "../typescripts/publicInterface"
import {httpRequest} from "../typescripts/publicFunctions";
const {Title} = Typography;

type propType = {}

type stateType = {
    imageData: ImageData[],
    requestData: any,
}

interface PexelsComponent {
    state: stateType,
    props: propType
}

class PexelsComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imageData: [],
            requestData: {
                "per_page":  wallpaperPageSize,
            },
        };
    }

    // // 获取 Pexels 图片
    getImages( headers: object, url: string, data: object ) {
        let tempThis = this;
        httpRequest(headers, url, data, "GET")
            .then(function(resultData: any){
                let tempImageData = [];
                for (let i in resultData.photos) {
                    let tempData: ImageData = {
                        displayUrl: resultData.photos[i].src.landscape,
                        previewUrl: resultData.photos[i].src.tiny,
                        imageUrl: resultData.photos[i].url,
                        userName: resultData.photos[i].photographer,
                        userUrl: resultData.photos[i].photographer_url,
                        createTime: "无拍摄时间",
                        description: resultData.photos[i].alt,
                        color: resultData.photos[i].avg_color,
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
                    Toast.error("获取 Pexels 图片失败");
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
        let headers = {
            "authorization": pexelsAuth,
        }
        this.getImages(headers, pexelsCurateRequestUrl, this.state.requestData);
    }

    render() {
        return (
            <List
                style={{width: "660px"}}
                header={<Title heading={3}>Pexels</Title>}
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

export default PexelsComponent;