import React from "react";
import {
    Row,
    Col,
    List,
    Pagination,
    Input,
    Typography,
    Toast,
    ImagePreview,
    Image,
    Button,
    Space,
    Spin
} from "@douyinfe/semi-ui";
import {
    IconSearch,
    IconHomeStroked,
    IconImage,
    IconUserCircle,
    IconInfoCircle
} from "@douyinfe/semi-icons";
import "../stylesheets/searchComponent.css"
import {
    unsplashSearchRequestUrl,
    unsplashClientId,
    listPageSize, imageDescriptionMaxSize,
} from "../typescripts/publicConstants";
import {
    btnMouseOut, btnMouseOver,
    getFontColor,
    httpRequest,
    isEmptyString,
    setWallpaper
} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface"

const {Title} = Typography;

type propType = {}

type stateType = {
    searchValue: string,
    currentPage: number,
    loading: boolean,
    searchResult: ImageData[],
    totalCounts: number,
    paginationDisplay: "flex" | "none",
}

interface SearchComponent {
    state: stateType,
    props: propType
}

class SearchComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            searchValue: "",
            currentPage: 1,
            loading: false,
            searchResult: [],
            totalCounts: 0,
            paginationDisplay: "none",
        };
    }

    // 搜索图片
    searchImages(url: string) {
        let tempThis = this;
        let data = {
            "client_id": unsplashClientId,
                "query": this.state.searchValue,
                "orientation": "landscape",
                "content_filter": "high",
                "page": this.state.currentPage,
                "per_page": listPageSize
        };
        this.setState({
            loading: true,
        },()=>{
            httpRequest({}, url, data, "GET")
                .then(function(resultData: any){
                    if(resultData.total === 0) {
                        Toast.info("搜索结果数量为 0");
                        tempThis.setState({
                            loading: false,
                            searchResult: [],
                            paginationDisplay: "none",
                        });
                    }
                    else {
                        let tempImageData = [];
                        for (let i in resultData.results) {
                            let tempData: ImageData = {
                                displayUrl: resultData.results[i].urls.regular,
                                previewUrl: resultData.results[i].urls.small,
                                imageUrl: resultData.results[i].links.html,
                                userName: resultData.results[i].user.name,
                                userUrl: resultData.results[i].user.links.html,
                                createTime: resultData.results[i].created_at.split("T")[0],
                                description: (resultData.results[i].alt_description.length > imageDescriptionMaxSize ? resultData.results[i].alt_description.substring(0, imageDescriptionMaxSize) + "..." : resultData.results[i].alt_description),
                                color: resultData.results[i].color,
                            };
                            tempImageData.push(tempData);
                        }

                        tempThis.setState({
                            loading: false,
                            totalCounts: resultData.total,
                            searchResult: tempImageData,
                            paginationDisplay: "flex",
                        });
                    }
                })
                .catch(function(){
                    tempThis.setState({
                        loading: false,
                        searchResult: [],
                        paginationDisplay: "none",
                    },()=>{
                        Toast.error("搜索图片失败");
                    });
                })
        })
    }

    inputOnEnterPress(e: any) {
        this.setState({
            searchValue: e.target.value,  // 保存搜索内容，用于搜索和分页请求
            searchResult: [],
            currentPage: 1,
        }, ()=>{
            this.searchImages(unsplashSearchRequestUrl);
        })
    }

    homeButtonClick(item: any) {
        if ( isEmptyString(item.imageUrl) ) {
            Toast.error("无跳转链接");
        } else {
            window.open(item.imageUrl, "_blank");
        }
    }

    setWallpaperButtonClick(item: any) {
        setWallpaper(item);
    }

    onPageChange( currentPage: number ) {
        this.setState({
            searchResult: [],
            currentPage: currentPage,   // 设置分页
        }, ()=>{
            this.searchImages(unsplashSearchRequestUrl);
        })
    }

    render() {
        return (
            <List
                loading={this.state.loading}
                size="small"
                bordered
                header={
                    <Row>
                        <Col span={5} style={{textAlign: "left"}}>
                            <Title heading={3}>搜索</Title>
                        </Col>
                        <Col span={14} style={{textAlign: "center"}}>
                            <Input prefix={<IconSearch/>} placeholder="按下回车键进行搜索" showClear
                                   onEnterPress={this.inputOnEnterPress.bind(this)}></Input>
                        </Col>
                    </Row>
                }
                dataSource={this.state.searchResult}
                renderItem={item => (
                    <List.Item
                        style={{backgroundColor: item.color, padding: "10px 10px 5px 10px"}}
                        header={
                            <ImagePreview disableDownload={true}>
                                <Image width={80} height={80} src={item.displayUrl} preview={true}
                                       placeholder={<Spin />}
                                       className={"wallpaperFadeIn"}
                                />
                            </ImagePreview>
                        }
                        main={
                            <div className={"alignCenter"} style={{height: "80px"}}>
                                <Space vertical align="start">
                                    <Button theme={"borderless"} icon={<IconUserCircle />}
                                            style={{color: getFontColor(item.color), cursor: "default"}}
                                            onMouseOver={btnMouseOver.bind(this, item.color)}
                                            onMouseOut={btnMouseOut.bind(this, item.color)}>
                                        {"摄影师：" + item.userName}
                                    </Button>
                                    <Button theme={"borderless"} icon={<IconInfoCircle />}
                                            style={{color: getFontColor(item.color), cursor: "default"}}
                                            onMouseOver={btnMouseOver.bind(this, item.color)}
                                            onMouseOut={btnMouseOut.bind(this, item.color)}>
                                        {"图片描述：" + (item.description === null ? "暂无图片描述" : item.description)}
                                    </Button>
                                </Space>
                            </div>
                        }
                        extra={
                            <Space vertical align={"start"}>
                                <Button theme={"borderless"} icon={<IconHomeStroked/>}
                                        style={{color: getFontColor(item.color)}}
                                        onMouseOver={btnMouseOver.bind(this, item.color)}
                                        onMouseOut={btnMouseOut.bind(this, item.color)}
                                        onClick={this.homeButtonClick.bind(this, item)}>图片主页</Button>
                                <Button theme={"borderless"} icon={<IconImage/>}
                                        style={{color: getFontColor(item.color)}}
                                        onMouseOver={btnMouseOver.bind(this, item.color)}
                                        onMouseOut={btnMouseOut.bind(this, item.color)}
                                        onClick={this.setWallpaperButtonClick.bind(this, item)}>设为壁纸</Button>
                            </Space>
                        }
                    />
                )}
                footer={
                    <Pagination size="default" className={"searchPagination"} style={{display: this.state.paginationDisplay}}
                                pageSize={listPageSize} total={this.state.totalCounts} currentPage={this.state.currentPage}
                                onChange={currentPage => this.onPageChange(currentPage)}
                    />
                }
            />
        )
    }
}

export default SearchComponent;