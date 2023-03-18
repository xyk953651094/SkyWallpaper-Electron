import React from "react";
import {Row, Col, List, Toast, Typography, Select, Image, ButtonGroup, Button, Space} from '@douyinfe/semi-ui';
import "../stylesheets/wallpaperComponent.css"
import WallpaperCardComponent from "./wallpaperCardComponent";
import {
    pixabayRequestUrl,
    pixabayKey,
    pixabayImageCategories,
    wallpaperPageSize,
    defaultImageData
} from "../typescripts/publicConstants";
import {getJsonLength, httpRequest} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface"

const {Title} = Typography;

type propType = {}

type stateType = {
    imageData: ImageData[],
    categories: any,
    requestData: any,
}

interface PixabayComponent {
    state: stateType,
    props: propType
}

class PixabayComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imageData: new Array(wallpaperPageSize).fill(defaultImageData),
            categories: pixabayImageCategories,
            requestData: {
                "key": pixabayKey,
                "editors_choice": "true",
                "category": "",
                "image_type": "photo",
                "orientation": "vertical",
                "per_page":  wallpaperPageSize,
                "order": "latest",
                "safesearch": "true",
            },
        };
    }

    // 获取 Pixabay 图片
    getImages( url: string, data: object ) {
        let tempThis = this;
        httpRequest({}, url, data, "GET")
            .then(function(resultData: any){
                let tempImageData = [];
                for (let i in resultData.hits) {
                    let tempData: ImageData = {
                        displayUrl: resultData.hits[i].largeImageURL,
                        previewUrl: resultData.hits[i].previewURL,
                        imageUrl: resultData.hits[i].pageURL,
                        userName: resultData.hits[i].user,
                        userUrl: resultData.hits[i].pageURL,
                        createTime: "无拍摄时间",
                        description: resultData.hits[i].tags,
                        color: "rgba(var(--semi-grey-0), 1)",
                    };
                    tempImageData.push(tempData);
                }
                tempThis.setState({
                    imageData: tempImageData
                });
            })
            .catch(function(){
                Toast.error("获取 Pixabay 图片失败");
            })
    }

    categoryButtonClick(value: string) {
        let data = Object.assign({}, this.state.requestData, {category: value});
        this.setState({
            requestData: data,
        }, () => {
            this.getImages(pixabayRequestUrl, this.state.requestData);
        })
    }

    orderSelectOnChange(value: any) {
        let data = Object.assign({}, this.state.requestData, {order: value});
        this.setState({
            requestData: data,
        }, ()=>{
            this.getImages(pixabayRequestUrl, this.state.requestData);
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
        // 获取每日图片
        this.getImages(pixabayRequestUrl, this.state.requestData);
    }

    render() {
        return (
            <List
                style={{width: "790px"}}
                header={
                    <Space>
                        <div className={"listHeaderTitle"}>
                            <Title heading={3}>Pixabay</Title>
                        </div>
                        <ButtonGroup theme={"borderless"} className={"listHeaderButtonGroup overflowScroll"} style={{width: "565px"}}>
                            {
                                new Array(getJsonLength(this.state.categories)).fill(this.state.categories).map((value, index) => (
                                    <Button key={index}
                                            onClick={this.categoryButtonClick.bind(this, Object.keys(value)[index])}>
                                        {value[Object.keys(value)[index]]}
                                    </Button>
                                ))
                            }
                        </ButtonGroup>
                        <div className={"listHeaderTitle"}>
                            <Select className="todaySelect" defaultValue="popular" onChange={this.orderSelectOnChange.bind(this)}>
                                <Select.Option value="popular">热门</Select.Option>
                                <Select.Option value="latest">最新</Select.Option>
                            </Select>
                        </div>
                    </Space>
                }
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

export default PixabayComponent;