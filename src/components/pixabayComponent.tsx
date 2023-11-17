import React from "react";
import {
    Row,
    Col,
    List,
    Toast,
    Typography,
    Select,
    ButtonGroup,
    Button,
    Space,
    Divider
} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import WallpaperCardComponent from "./wallpaperCardComponent";
import {
    pixabayRequestUrl,
    pixabayKey,
    pixabayImageCategories,
    wallpaperPageSize, imageDescriptionMaxSize,
} from "../typescripts/publicConstants";
import {getJsonLength, httpRequest} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface"
import {IconLink} from "@douyinfe/semi-icons";

const {Title} = Typography;
const $ = require("jquery");

type propType = {}

type stateType = {
    imageData: ImageData[],
    categories: any,
    selectedCategory: number,
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
            imageData: [],
            categories: pixabayImageCategories,
            selectedCategory: 0,
            requestData: {
                "key": pixabayKey,
                "editors_choice": "true",
                "category": "",
                "image_type": "photo",
                "orientation": "horizontal",
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
                        description: (resultData.hits[i].tags.length > imageDescriptionMaxSize ? resultData.hits[i].tags.substring(0, imageDescriptionMaxSize) + "..." : resultData.hits[i].tags),
                        color: "var(--semi-color-bg-0)",
                        source: "Pixabay",
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
                    Toast.error("获取 Pixabay 图片失败");
                });
            })
    }

    categoryButtonClick(index: number, value: string) {
        const pixabayButtonGroup = $(".pixabayButtonGroup").children("button");
        pixabayButtonGroup.css({"color": "var(--semi-color-text-0)", "background-color": "var(--semi-color-bg-0)"});
        pixabayButtonGroup.eq(index).css({"color": "var(--semi-color-bg-0)", "background-color": "var(--semi-color-text-0)"});

        let data = Object.assign({}, this.state.requestData, {category: value});
        this.setState({
            selectedCategory: index,
            requestData: data,
            imageData: [], // 重置图片数据为空
        }, () => {
            this.getImages(pixabayRequestUrl, this.state.requestData);
        })
    }

    orderSelectOnChange(value: any) {
        let data = Object.assign({}, this.state.requestData, {order: value});
        this.setState({
            requestData: data,
            imageData: [], // 重置图片数据为空
        }, ()=>{
            this.getImages(pixabayRequestUrl, this.state.requestData);
        })
    }

    componentDidMount() {
        const pixabayButtonGroup = $(".pixabayButtonGroup").children("button");
        pixabayButtonGroup.eq(this.state.selectedCategory).css({"color": "var(--semi-color-bg-0)", "background-color": "var(--semi-color-text-0)"});

        // 获取每日图片
        this.getImages(pixabayRequestUrl, this.state.requestData);
    }

    render() {
        return (
            <List
                className={"listStyle"}
                header={
                    <div style={{display: "flex"}}>
                        <div style={{width: "180px"}}>
                            <Space>
                                <Title heading={3}>Pixabay</Title>
                                <Select defaultValue="popular" onChange={this.orderSelectOnChange.bind(this)}>
                                    <Select.Option value="popular">热门</Select.Option>
                                    <Select.Option value="latest">最新</Select.Option>
                                </Select>
                            </Space>
                        </div>
                        <div style={{flex: "1", overflow: "scroll", scrollBehavior: "smooth"}}>
                            <ButtonGroup theme={"borderless"} className={"listHeaderButtonGroup pixabayButtonGroup"}
                                         style={{width: "max-content"}}
                            >
                                {
                                    new Array(getJsonLength(this.state.categories)).fill(this.state.categories).map((value, index) => (
                                        <Button key={index} type="tertiary"
                                                onClick={this.categoryButtonClick.bind(this, index, Object.keys(value)[index])}>
                                            {value[Object.keys(value)[index]]}
                                        </Button>
                                    ))
                                }
                            </ButtonGroup>
                        </div>
                    </div>
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