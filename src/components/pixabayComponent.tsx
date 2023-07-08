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
    Tooltip,
    Space,
    Divider
} from "@douyinfe/semi-ui";
import "../stylesheets/wallpaperComponent.css"
import WallpaperCardComponent from "./wallpaperCardComponent";
import {
    pixabayRequestUrl,
    pixabayKey,
    pixabayImageCategories,
    wallpaperPageSize,
} from "../typescripts/publicConstants";
import {getJsonLength, httpRequest} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface"
import {IconLink} from "@douyinfe/semi-icons";

const {Title} = Typography;
const $ = require("jquery");

type propType = {
    themeColor: string
}

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
                        // color: tempThis.props.themeColor
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
        pixabayButtonGroup.css({"background-color": "transparent"});
        pixabayButtonGroup.eq(index).css({"background-color": this.props.themeColor});

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

    linkButtonOnClick() {
        window.open("https://pixabay.com/zh/");
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            const pixabayButtonGroup = $(".pixabayButtonGroup").children("button");
            pixabayButtonGroup.css({"background-color": "transparent"});
            pixabayButtonGroup.eq(this.state.selectedCategory).css({"background-color": this.props.themeColor});
        }
    }

    componentDidMount() {
        const pixabayButtonGroup = $(".pixabayButtonGroup").children("button");
        pixabayButtonGroup.eq(this.state.selectedCategory).css({"background-color": this.props.themeColor});

        // 获取每日图片
        this.getImages(pixabayRequestUrl, this.state.requestData);
    }

    render() {
        return (
            <List
                className={"listStyle"}
                header={
                <Row>
                    <Row>
                        <Col span={12}>
                            <Space>
                                <Title heading={3}>Pixabay</Title>
                                <Select defaultValue="popular" onChange={this.orderSelectOnChange.bind(this)}>
                                    <Select.Option value="popular">热门</Select.Option>
                                    <Select.Option value="latest">最新</Select.Option>
                                </Select>
                            </Space>
                        </Col>
                        <Col  span={12} style={{textAlign: "right"}}>
                            <Tooltip content={"前往 Pixabay"} position={"top"}>
                                <Button theme={"borderless"} icon={<IconLink />}
                                        style={{color: "rgba(var(--semi-grey-9), 1)", backgroundColor: this.props.themeColor}}
                                        onClick={this.linkButtonOnClick.bind(this)}
                                >
                                </Button>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Divider margin={"5px"}/>
                    <Row style={{overflow: "scroll", marginTop: "5px"}}>
                        <ButtonGroup theme={"borderless"} className={"listHeaderButtonGroup overflowScroll pixabayButtonGroup"}
                                     style={{width: "1055px"}}
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
                    </Row>
                </Row>
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