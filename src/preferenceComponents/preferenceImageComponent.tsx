import React from "react";
import {
    Space,
    List,
    Typography,
    CheckboxGroup,
    Row,
    Col,
    Checkbox,
    Select,
    Button,
    Input,
} from "@douyinfe/semi-ui";
import {IconClock, IconGallery, IconCheckboxTick, IconClose, IconEdit} from "@douyinfe/semi-icons";
import {Preference} from "../typescripts/publicInterface";
import {getPreferenceStorage, isEmpty} from "../typescripts/publicFunctions";

const {Title, Text} = Typography;
const $ = require("jquery");

type propType = {
    getPreference: any
}

type stateType = {
    preference: Preference,
    disableImageTopic: boolean,
    customTopicInputValue: string
}

interface preferenceInfoComponent {
    state: stateType,
    props: propType
}

class preferenceInfoComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            preference: getPreferenceStorage(),
            disableImageTopic: false,
            customTopicInputValue: ""
        };
    }

    checkboxGroupOnChange(checkedValue: any) {
        this.setState({
            preference: this.setPreference({imageTopics: checkedValue}),
        }, () => {
            this.props.getPreference(this.state.preference);
            localStorage.setItem("preference", JSON.stringify(this.state.preference));
        });
    }

    customTopicInputOnChange(value:string) {
        this.setState({
            customTopicInputValue: value
        });
    }

    submitCustomTopicBtnOnClick() {
        this.setState({
            preference: this.setPreference({customTopic: this.state.customTopicInputValue}),
            disableImageTopic: !isEmpty(this.state.customTopicInputValue)
        }, () => {
            this.props.getPreference(this.state.preference);
            localStorage.setItem("preference", JSON.stringify(this.state.preference));
            console.log(this.state.preference.customTopic);
        })
    }

    clearCustomTopicBtnOnClick() {
        this.setState({
            preference: this.setPreference({customTopic: ""}),
            disableImageTopic: false,
            customTopicInputValue: ""
        }, () => {
            this.props.getPreference(this.state.preference);
            localStorage.setItem("preference", JSON.stringify(this.state.preference));
            console.log(this.state.preference.customTopic);
        })
    }

    switchTimeSelectOnChange(value: any) {
        this.setState({
            preference: this.setPreference({switchTime: value}),
        }, () => {
            this.props.getPreference(this.state.preference);
            localStorage.setItem("preference", JSON.stringify(this.state.preference));
        });
    }

    setPreference(data: Object) {
        return Object.assign({}, this.state.preference, data);
    }

    componentDidMount() {
        this.setState({
            disableImageTopic: !isEmpty(this.state.preference.customTopic),
            customTopicInputValue: this.state.preference.customTopic
        })
    }

    render() {
        return (
            <List header={<Title heading={3}>图片设置</Title>} size="small" bordered>
                <List.Item
                    header={ <IconGallery className={"listItemIcon"}/> }
                    main={<Text className="listItemText">图片主题</Text>}
                    extra={
                        <CheckboxGroup disabled={this.state.disableImageTopic} value={this.state.preference.imageTopics} onChange={this.checkboxGroupOnChange.bind(this)}>
                            <Row gutter={[0,8]} style={{width: "400px"}}>
                                <Col span={6}><Checkbox value="Fzo3zuOHN6w">旅游</Checkbox></Col>
                                <Col span={6}><Checkbox value="bo8jQKTaE0Y">壁纸</Checkbox></Col>
                                <Col span={6}><Checkbox value="CDwuwXJAbEw">三维</Checkbox></Col>
                                <Col span={6}><Checkbox value="iUIsnVtjB0Y">纹理</Checkbox></Col>
                                <Col span={6}><Checkbox value="qPYsDzvJOYc">实验</Checkbox></Col>
                                <Col span={6}><Checkbox value="rnSKDHwwYUk">建筑</Checkbox></Col>
                                <Col span={6}><Checkbox value="6sMVjTLSkeQ">自然</Checkbox></Col>
                                <Col span={6}><Checkbox value="aeu6rL-j6ew">商务</Checkbox></Col>
                                <Col span={6}><Checkbox value="S4MKLAsBB74">时尚</Checkbox></Col>
                                <Col span={6}><Checkbox value="hmenvQhUmxM">电影</Checkbox></Col>
                                <Col span={6}><Checkbox value="xjPR4hlkBGA">饮食</Checkbox></Col>
                                <Col span={6}><Checkbox value="_hb-dl4Q-4U">健康</Checkbox></Col>
                                <Col span={6}><Checkbox value="towJZFskpGg">人物</Checkbox></Col>
                                <Col span={6}><Checkbox value="R_Fyn-Gwtlw">精神</Checkbox></Col>
                                <Col span={6}><Checkbox value="xHxYTMHLgOc">街头</Checkbox></Col>
                                <Col span={6}><Checkbox value="Jpg6Kidl-Hk">动物</Checkbox></Col>
                                <Col span={6}><Checkbox value="_8zFHuhRhyo">灵魂</Checkbox></Col>
                                <Col span={6}><Checkbox value="bDo48cUhwnY">文化</Checkbox></Col>
                                <Col span={6}><Checkbox value="dijpbw99kQQ">历史</Checkbox></Col>
                                <Col span={6}><Checkbox value="Bn-DjrcBrwo">体育</Checkbox></Col>
                            </Row>
                        </CheckboxGroup>
                    }
                />
                <List.Item
                    header={ <IconEdit className={"listItemIcon"}/> }
                    main={<Text className="listItemText">自定主题</Text>}
                    extra={
                        <Space>
                            <Input value={this.state.customTopicInputValue} onChange={this.customTopicInputOnChange.bind(this)} placeholder="请输入自定主题" showClear></Input>
                            <Button theme={"borderless"} icon={<IconCheckboxTick />}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={this.submitCustomTopicBtnOnClick.bind(this)}>
                                {"启用自定"}
                            </Button>
                            <Button theme={"borderless"} icon={<IconClose />}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={this.clearCustomTopicBtnOnClick.bind(this)}>
                                {"禁用自定"}
                            </Button>
                        </Space>
                    }
                />
                <List.Item
                    header={ <IconClock className={"listItemIcon"}/> }
                    main={ <Text className="listItemText">切换间隔</Text> }
                    extra={
                        <Select value={this.state.preference.switchTime} onChange={this.switchTimeSelectOnChange.bind(this)}>
                            <Select.Option value="900000">每刻钟</Select.Option>
                            <Select.Option value="3600000">每小时</Select.Option>
                            <Select.Option value="86400000">每天</Select.Option>
                        </Select>
                    }
                />
            </List>
        )
    }
}

export default preferenceInfoComponent;