import React from "react";
import {Col, Row} from "@douyinfe/semi-ui";
import "../stylesheets/preferenceComponent.css"
import PreferenceInfoComponent from "../preferenceComponents/preferenceInfoComponent";
import PreferenceProductComponent from "../preferenceComponents/preferenceProductComponent";
import PreferenceFunctionComponent from "../preferenceComponents/preferenceFunctionComponent";
import PreferenceImageComponent from "../preferenceComponents/preferenceImageComponent";

const $ = require("jquery");

type propType = {
    getPreference: any,  // 设置数据
}

type stateType = {}

interface PreferenceComponent {
    state: stateType,
    props: propType
}

class PreferenceComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <Row align={"middle"} justify={"center"} gutter={[0, 16]}>
                <Col span={24}>
                    <PreferenceImageComponent getPreference={this.props.getPreference}/>
                </Col>
                <Col span={24}>
                    <PreferenceFunctionComponent getPreference={this.props.getPreference}/>
                </Col>
                <Col span={24}>
                    <PreferenceInfoComponent/>
                </Col>
                <Col span={24}>
                    <PreferenceProductComponent/>
                </Col>
            </Row>
        );
    }
}

export default PreferenceComponent;
