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
    Select, Spin
} from "@douyinfe/semi-ui";
import {
    IconSearch,
    IconHomeStroked,
    IconImage,
    IconUserCircle,
    IconGlobeStroke,
    IconInfoCircle
} from "@douyinfe/semi-icons";
import "../stylesheets/searchComponent.css"
import {
    unsplashSearchRequestUrl,
    unsplashClientId,
    pexelsSearchRequestUrl,
    pexelsAuth,
    pixabayRequestUrl,
    pixabayKey,
    listPageSize, imageDescriptionMaxSize,
} from "../typescripts/publicConstants";
import {getFontColor, getReverseColor, httpRequest, isEmptyString, setWallpaper} from "../typescripts/publicFunctions";
import {ImageData} from "../typescripts/publicInterface"

const {Title, Text} = Typography;

type propType = {}

type stateType = {
    searchValue: string,
    searchSource: "Unspalsh" | "Pexels" | "Pixabay",
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
            searchSource: "Unspalsh",
            currentPage: 1,
            loading: false,
            searchResult: [],
            totalCounts: 0,
            paginationDisplay: "none",
        };
    }

    btnMouseOver(color: string, e: any) {
        if(color !== "var(--semi-color-bg-0)") {
            e.currentTarget.style.backgroundColor = getReverseColor(color);
            e.currentTarget.style.color = getFontColor(getReverseColor(color));
        }
        else {
            e.currentTarget.style.backgroundColor = "var(--semi-color-text-0)";
            e.currentTarget.style.color = "var(--semi-color-bg-0)";
        }
    }

    btnMouseOut(color: string, e: any) {
        if(color !== "var(--semi-color-bg-0)") {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = getFontColor(color);
        }
        else {
            e.currentTarget.style.backgroundColor = "var(--semi-color-bg-0)";
            e.currentTarget.style.color = "var(--semi-color-text-0)";
        }
    }

    // 获取 Unsplash 图片
    getUnsplashImages() {
        let tempThis = this;
        let data = {
            "client_id": unsplashClientId,
            "query": this.state.searchValue,
            "orientation": "landscape",
            "content_filter": "high",
            "page": this.state.currentPage,
            "per_page": listPageSize
        }
        this.setState({
            loading: true,
        },()=>{
            httpRequest({}, unsplashSearchRequestUrl, data, "GET")
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
                                description: (resultData.results[i].description.length > imageDescriptionMaxSize ? resultData.results[i].description.substring(0, imageDescriptionMaxSize) + "..." : resultData.results[i].description),
                                color: resultData.results[i].color,
                                source: "Unsplash"
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
                    Toast.error("搜索失败");
                    tempThis.setState({
                        loading: false,
                        searchResult: [],
                        paginationDisplay: "none",
                    });
                })
        })
    }

    // 获取 Pexels 图片
    getPexelsImages() {
        let tempThis = this;
        let headers = { "authorization": pexelsAuth}
        let data = {
            "query": this.state.searchValue,
            "orientation": "landscape",
            "page": this.state.currentPage,
            "per_page":  listPageSize,
        }
        this.setState({
            loading: true,
        },()=>{
            httpRequest(headers, pexelsSearchRequestUrl, data, "GET")
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
                        for (let i in resultData.photos) {
                            let tempData: ImageData = {
                                displayUrl: resultData.photos[i].src.landscape,
                                previewUrl: resultData.photos[i].src.tiny,
                                imageUrl: resultData.photos[i].url,
                                userName: resultData.photos[i].photographer,
                                userUrl: resultData.photos[i].photographer_url,
                                createTime: "无拍摄时间",
                                description: (resultData.photos[i].alt.length > imageDescriptionMaxSize ? resultData.photos[i].alt.substring(0, imageDescriptionMaxSize) + "..." : resultData.photos[i].alt),
                                color: resultData.photos[i].avg_color,
                                source: "Pexels"
                            };
                            tempImageData.push(tempData);
                        }

                        tempThis.setState({
                            loading: false,
                            totalCounts: resultData.total_results,
                            searchResult: tempImageData,
                            paginationDisplay: "flex",
                        });
                    }
                })
                .catch(function(){
                    Toast.error("搜索失败");
                    tempThis.setState({
                        loading: false,
                        searchResult: [],
                        paginationDisplay: "none",
                    });
                })
        })
    }

    // 获取 Pixabay 图片
    getPixabayImages() {
        let tempThis = this;
        let data = {
            "key": pixabayKey,
            "q": this.state.searchValue,
            "editors_choice": "true",
            "image_type": "photo",
            "orientation": "vertical",
            "page": this.state.currentPage,
            "per_page":  listPageSize,
            "order": "latest",
            "safesearch": "true",
        }
        this.setState({
            loading: true,
        },()=>{
            httpRequest({}, pixabayRequestUrl, data, "GET")
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
                        for (let i in resultData.hits) {
                            let tempData: ImageData = {
                                displayUrl: resultData.hits[i].largeImageURL,
                                previewUrl: resultData.hits[i].previewURL,
                                imageUrl: resultData.hits[i].pageURL,
                                userName: resultData.hits[i].user,
                                userUrl: resultData.hits[i].pageURL,
                                createTime: "无拍摄时间",
                                description: (resultData.hits[i].tags.length > imageDescriptionMaxSize ? resultData.hits[i].tags.substring(0, imageDescriptionMaxSize) + "..." : resultData.hits[i].tags),
                                color: "rgba(var(--semi-grey-0), 1)",
                                source: "Pixabay"
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
                    Toast.error("搜索失败");
                    tempThis.setState({
                        loading: false,
                        searchResult: [],
                        paginationDisplay: "none",
                    });
                })
        })
    }

    inputOnEnterPress(e: any) {
        this.setState({
            searchValue: e.target.value,        // 保存搜索内容，用于搜索和分页请求
            searchResult: [],
            currentPage: 1,
        }, ()=>{
            // this.getUnsplashImages();
            switch (this.state.searchSource) {
                case "Unspalsh": {
                    this.getUnsplashImages();
                    break;
                }
                case "Pexels": {
                    this.getPexelsImages();
                    break;}
                case "Pixabay": {
                    this.getPixabayImages();
                    break;
                }
            }
        })
    }

    selectOnChange(value: any) {
        this.setState({
            searchSource: value,
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
            // this.getUnsplashImages();
            switch (this.state.searchSource) {
                case "Unspalsh": {
                    this.getUnsplashImages();
                    break;
                }
                case "Pexels": {
                    this.getPexelsImages();
                    break;}
                case "Pixabay": {
                    this.getPixabayImages();
                    break;
                }
            }
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
                        <Col span={5} style={{textAlign: "right"}}>
                            <Select defaultValue="Unspalsh" value={this.state.searchSource} onChange={this.selectOnChange.bind(this)}>
                                <Select.Option value="Unspalsh">Unspalsh</Select.Option>
                                <Select.Option value="Pexels">Pexels</Select.Option>
                                <Select.Option value="Pixabay">Pixabay</Select.Option>
                            </Select>
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
                                    <Space>
                                        <Button theme={"borderless"} icon={<IconUserCircle />}
                                                style={{color: item.color === "var(--semi-color-bg-0)" ? "var(--semi-color-text-0)" : getFontColor(item.color), cursor: "default"}}
                                                onMouseOver={this.btnMouseOver.bind(this, item.color)}
                                                onMouseOut={this.btnMouseOut.bind(this, item.color)}>
                                            {"摄影师：" + item.userName}
                                        </Button>
                                        <Button theme={"borderless"} icon={<IconGlobeStroke />}
                                                style={{color: item.color === "var(--semi-color-bg-0)" ? "var(--semi-color-text-0)" : getFontColor(item.color), cursor: "default"}}
                                                onMouseOver={this.btnMouseOver.bind(this, item.color)}
                                                onMouseOut={this.btnMouseOut.bind(this, item.color)}>
                                            {"来源：" + item.source}
                                        </Button>
                                    </Space>
                                    <Button theme={"borderless"} icon={<IconInfoCircle />}
                                            style={{color: item.color === "var(--semi-color-bg-0)" ? "var(--semi-color-text-0)" : getFontColor(item.color), cursor: "default"}}
                                            onMouseOver={this.btnMouseOver.bind(this, item.color)}
                                            onMouseOut={this.btnMouseOut.bind(this, item.color)}>
                                        {"图片描述：" + (item.description === null ? "暂无图片描述" : item.description)}
                                    </Button>
                                </Space>
                            </div>
                        }
                        extra={
                            <Space vertical align={"start"}>
                                <Button theme={"borderless"} icon={<IconHomeStroked/>}
                                        style={{color: item.color === "var(--semi-color-bg-0)" ? "var(--semi-color-text-0)" : getFontColor(item.color)}}
                                        onMouseOver={this.btnMouseOver.bind(this, item.color)}
                                        onMouseOut={this.btnMouseOut.bind(this, item.color)}
                                        onClick={this.homeButtonClick.bind(this, item)}>图片主页</Button>
                                <Button theme={"borderless"} icon={<IconImage/>}
                                        style={{color: item.color === "var(--semi-color-bg-0)" ? "var(--semi-color-text-0)" : getFontColor(item.color)}}
                                        onMouseOver={this.btnMouseOver.bind(this, item.color)}
                                        onMouseOut={this.btnMouseOut.bind(this, item.color)}
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