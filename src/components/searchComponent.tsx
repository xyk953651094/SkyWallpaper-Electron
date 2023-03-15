import React from "react";
import {Row, Col, List, Pagination, Input, Typography, Toast, Image, ButtonGroup, Button, Space} from '@douyinfe/semi-ui';
import {IconSearch, IconHomeStroked, IconDownloadStroked} from "@douyinfe/semi-icons";
import "../stylesheets/historyComponent.css"
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import {unsplashClientId, unsplashUrl} from "../typescripts/publicConstants";
import {getFontColor, httpRequest, isEmptyString} from "../typescripts/publicFunctions";

const {Title} = Typography;

type propType = {
    display: string,
}

type stateType = {
    searchValue: string,
    currentPage: number,
    pageSize: number,
    loading: boolean,
    searchResult: any,
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
            pageSize: 5,
            loading: false,
            searchResult: {},
            paginationDisplay: "none",
        };
    }

    // 获取 Unsplash 图片
    onSearch() {
        let tempThis = this;
        let url = "https://api.unsplash.com/search/photos";
        let data = {
            "client_id": unsplashClientId,
            "query": this.state.searchValue,
            "orientation": "landscape",
            "content_filter": "high",
            "page": this.state.currentPage,
            "per_page": this.state.pageSize
        };
        this.setState({
            loading: true,
        },()=>{
            httpRequest(url, data, "GET")
                .then(function(resultData: any){
                    if(resultData.total === 0) {
                        Toast.info("无搜索结果");
                    }
                    else {
                        tempThis.setState({
                            loading: false,
                            searchResult: resultData,
                            paginationDisplay: "flex",
                        });
                    }
                })
                .catch(function(){
                    Toast.error("搜索失败");
                    tempThis.setState({
                        loading: false,
                        searchResult: {},
                        paginationDisplay: "none",
                    });
                })
        })
    }

    inputOnEnterPress(e: any, page: number = 1) {
        this.setState({
            searchValue: e.target.value,  // 保存搜索内容，用于搜索和分页请求
            currentPage: 1,
        }, ()=>{
            this.onSearch();
        })
    }

    homeButtonClick(item: any) {
        if ( item.user.links.html ) {
            window.open(item.user.links.html + unsplashUrl);
        } else {
            Toast.error("无跳转链接");
        }
    }

    downloadButtonClick(item: any) {
        if ( isEmptyString(item.links.download_location) ) {
            Toast.error("无下载链接");
        } else {
            window.open(item.links.html);
            // let url = item.links.download_location;
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

    onPageChange( currentPage: number ) {
        console.log(currentPage);
        this.setState({
            currentPage: currentPage,
        }, ()=>{
            this.onSearch();
        })
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.display !== prevProps.display) {
            this.setState({
                display: nextProps.display,
            });
        }
    }

    render() {
        return (
            <Row style={{display: this.props.display}}>
                <List
                    loading={this.state.loading}
                    size="large"
                    bordered
                    header={
                        <Row>
                            <Col span={3} style={{textAlign: "left"}}>
                                <Title heading={3}>搜索</Title>
                            </Col>
                            <Col span={18} style={{textAlign: "center"}}>
                                <Input prefix={<IconSearch/>} placeholder='按下回车进行搜索' showClear
                                       onEnterPress={this.inputOnEnterPress.bind(this)}></Input>
                            </Col>
                        </Row>
                    }
                    dataSource={this.state.searchResult.results}
                    renderItem={item => (
                        <List.Item
                            style={{backgroundColor: item.color}}
                            header={
                                <Image width={100} height={100} src={item.urls.regular} preview={true}
                                       placeholder={<Image src={item.urls.small} preview={false}/>}
                                       className={"wallpaperFadeIn"}
                                />
                            }
                            main={
                                <Space align='start' vertical>
                                    <Title heading={5} className="collectionTitleP"
                                           style={{color: getFontColor(item.color)}}>
                                        {"摄影师：" + item.user.name}
                                    </Title>
                                    <Text className="collectionDescriptionP" style={{color: getFontColor(item.color)}}>
                                        {"拍摄于：" + item.created_at}
                                    </Text>
                                    <Text className="collectionDescriptionP" style={{color: getFontColor(item.color)}}>
                                        {item.description == null ? "暂无图片描述" : "图片描述：" + item.description}
                                    </Text>
                                </Space>
                            }
                            extra={
                                <ButtonGroup>
                                    <Button theme={'borderless'} icon={<IconHomeStroked/>}
                                            style={{color: getFontColor(item.color)}}
                                            onClick={this.homeButtonClick.bind(this, item)}>主页</Button>
                                    <Button theme={'borderless'} icon={<IconDownloadStroked/>}
                                            style={{color: getFontColor(item.color)}}
                                            onClick={this.downloadButtonClick.bind(this, item)}>下载</Button>
                                </ButtonGroup>
                            }
                        />
                    )}
                />
                <Pagination size='default' style={{display: this.state.paginationDisplay, width: '100%', flexBasis: '100%', justifyContent: 'center'}}
                            pageSize={this.state.pageSize} total={this.state.searchResult.total} currentPage={this.state.currentPage}
                            onChange={currentPage => this.onPageChange(currentPage)}
                />
            </Row>
        )
    }
}

export default SearchComponent;