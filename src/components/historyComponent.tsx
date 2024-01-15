import React from "react";
import {
    Button,
    Col,
    Popconfirm,
    Row,
    Toast,
    Typography,
} from "@douyinfe/semi-ui";
import {IconDelete} from "@douyinfe/semi-icons";
import "../stylesheets/searchComponent.css"
import {listPageSize} from "../typescripts/publicConstants";
import {ImageData} from "../typescripts/publicInterface";
import "../stylesheets/publicStyles.css"
import ListComponent from "../publicComponents/listComponent";

const {Title} = Typography;

type propType = {}

type stateType = {
    history: ImageData[],
    historyLength: number,
}

interface HistoryComponent {
    state: stateType,
    props: propType
}

class HistoryComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            history: [],
            historyLength: 0,
        };
    }

    getHistory() {
        let tempHistory = localStorage.getItem("history");
        if (tempHistory !== null && tempHistory.length !== 0) {
            this.setState({
                history: JSON.parse(tempHistory),
                historyLength: JSON.parse(tempHistory).length,
            })
        }
    }

    clearHistoryBtnOnClick() {
        localStorage.setItem("history", "[]");
        this.setState({
            history: [],
            historyLength: 0,
        }, () => {
            Toast.success("已清空历史记录");
        })
    }

    componentDidMount() {
        this.getHistory();
    }

    render() {
        const listHeader = (
            <Row>
                <Col span={12} style={{textAlign: "left"}}>
                    <Title heading={3}>{"历史记录（" + this.state.historyLength + " / " + listPageSize + "）"}</Title>
                </Col>
                <Col span={12} style={{textAlign: "right"}}>
                    <Popconfirm
                        title="确定清空历史记录？"
                        content="此操作将不可逆"
                        onConfirm={this.clearHistoryBtnOnClick.bind(this)}
                    >
                        <Button type={"danger"} icon={<IconDelete/>}>
                            {"清空历史记录"}
                        </Button>
                    </Popconfirm>
                </Col>
            </Row>
        )

        return (
            <ListComponent listHeader={listHeader}
                           listData={this.state.history}
                           listFooter={null}
                           listLoading={false}
            />
        )
    }
}

export default HistoryComponent;