import React from "react";
import {
    Col,
    Input,
    Pagination,
    Row,
    Toast,
    Typography
} from "@douyinfe/semi-ui";
import {IconSearch} from "@douyinfe/semi-icons";
import "../stylesheets/searchComponent.css"
import {
    imageDescriptionMaxSize,
    unsplashClientId,
    unsplashSearchRequestUrl,
} from "../typescripts/publicConstants";
import {httpRequest} from "../typescripts/publicFunctions";
import {ImageData, Preference} from "../typescripts/publicInterface"
import ListComponent from "../publicComponents/listComponent";

const {Title} = Typography;

type propType = {
    preference: Preference,
}

type stateType = {
    searchValue: string,
    loading: boolean,
    searchResult: ImageData[],
    paginationDisplay: "flex" | "none",
    currentPage: number,
    pageSize: number,
    totalCounts: number,
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
            pageSize: 10,
        };
    }

    // 搜索图片
    searchImages() {
        let tempThis = this;
        let data = {
            "client_id": this.props.preference.accessKey === "" ? unsplashClientId : this.props.preference.accessKey,
            "query": this.state.searchValue,
            "orientation": "landscape",
            "content_filter": "high",
            "page": this.state.currentPage,
            "per_page": this.state.pageSize
        };
        this.setState({
            loading: true,
        }, () => {
            httpRequest({}, unsplashSearchRequestUrl, data, "GET")
                .then(function (resultData: any) {
                    if (resultData.total === 0) {
                        Toast.info("搜索结果数量为 0");
                        tempThis.setState({
                            loading: false,
                            searchResult: [],
                            paginationDisplay: "none",
                        });
                    } else {
                        let tempImageData = [];
                        for (let i in resultData.results) {
                            let tempData: ImageData = {
                                wallpaperUrl: resultData.results[i].urls.full,
                                displayUrl: resultData.results[i].urls.regular,
                                imageUrl: resultData.results[i].links.html,
                                userName: resultData.results[i].user.name,
                                userUrl: resultData.results[i].user.links.html,
                                createTime: resultData.results[i].created_at.split("T")[0],
                                description: (resultData.results[i].alt_description.length > imageDescriptionMaxSize ? resultData.results[i].alt_description.substring(0, imageDescriptionMaxSize) + "..." : resultData.results[i].alt_description),
                                location: "暂无信息",
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
                .catch(function () {
                    tempThis.setState({
                        loading: false,
                        searchResult: [],
                        paginationDisplay: "none",
                    }, () => {
                        Toast.error("搜索图片失败");
                    });
                })
        })
    }

    inputOnClear() {
        this.setState({
            searchValue: "",
            searchResult: [],
            currentPage: 1,
            totalCounts: 0,
            paginationDisplay: "none",
        })
    }

    inputOnEnterPress(e: any) {
        this.setState({
            searchValue: e.target.value,  // 保存搜索内容，用于搜索和分页请求
            searchResult: [],
            currentPage: 1,
            totalCounts: 0,
            paginationDisplay: "none",
        }, () => {
            this.searchImages();
        })
    }

    onPageChange(currentPage: number) {
        this.setState({
            searchResult: [],
            currentPage: currentPage,   // 设置分页
        }, () => {
            this.searchImages();
        })
    }

    onPageSizeChange(pageSize: number) {
        this.setState({
            pageSize: pageSize,
        }, () => {
            this.searchImages();
        })
    }

    render() {
        const listHeader = (
            <Row>
                <Col span={5} style={{textAlign: "left"}}>
                    <Title heading={3}>搜索壁纸</Title>
                </Col>
                <Col span={14} style={{textAlign: "center"}}>
                    <Input prefix={<IconSearch/>} placeholder="按下回车键搜索 Unsplash"
                           showClear onClear={this.inputOnClear.bind(this)}
                           onEnterPress={this.inputOnEnterPress.bind(this)}></Input>
                </Col>
            </Row>
        )

        const listFooter = (
            <Pagination size="default" className={"searchPagination"}
                        style={{display: this.state.paginationDisplay}}
                        pageSize={this.state.pageSize} total={this.state.totalCounts} showTotal
                        currentPage={this.state.currentPage} showQuickJumper
                        onChange={currentPage => this.onPageChange(currentPage)}
                        showSizeChanger pageSizeOpts={[10, 20, 30]}
                        onPageSizeChange={pageSize => this.onPageSizeChange(pageSize)}
            />
        )

        return (
            <ListComponent listHeader={listHeader}
                           listData={this.state.searchResult}
                           listFooter={listFooter}
                           listLoading={this.state.loading}
            />
        )
    }
}

export default SearchComponent;