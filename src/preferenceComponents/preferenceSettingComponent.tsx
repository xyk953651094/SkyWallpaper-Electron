import React from "react";
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Col,
    Input,
    List, Popconfirm,
    Row,
    Select,
    Space,
    Switch, Toast,
    Typography,
} from "@douyinfe/semi-ui";
import {
    IconAlertCircle,
    IconCheckboxTick,
    IconClock,
    IconClose,
    IconContrast, IconDelete,
    IconEdit,
    IconGallery,
    IconQuit
} from "@douyinfe/semi-icons";
import {Preference} from "../typescripts/publicInterface";
import {getPreferenceStorage, isEmpty} from "../typescripts/publicFunctions";
import {defaultPreference} from "../typescripts/publicConstants";

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

interface PreferenceSettingComponent {
    state: stateType,
    props: propType
}

class PreferenceSettingComponent extends React.Component {
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

    customTopicInputOnChange(value: string) {
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

    openAtLoginSwitchOnChange(checked: boolean) {
        this.setState({
            preference: this.setPreference({openAtLogin: checked}),
        }, () => {
            this.props.getPreference(this.state.preference);
            localStorage.setItem("preference", JSON.stringify(this.state.preference));
        });
    }

    colorModeSelectOnChange(value: any) {
        const body = document.body;
        if (value === "lightMode") {
            if (body.hasAttribute('theme-mode')) {
                body.removeAttribute('theme-mode');
            }
        } else if (value === "darkMode") {
            if (!body.hasAttribute('theme-mode')) {
                body.setAttribute('theme-mode', 'dark');
            }
        }

        this.setState({
            preference: this.setPreference({colorMode: value}),
        }, () => {
            this.props.getPreference(this.state.preference);
            localStorage.setItem("preference", JSON.stringify(this.state.preference));
        });
    }

    resetPreferenceBtnOnClick() {
        localStorage.setItem("preferenceData", JSON.stringify(defaultPreference));
        Toast.success("已重置设置，一秒后刷新");
        this.refreshWindow();
    }

    clearStorageBtnOnClick() {
        localStorage.clear();
        Toast.success("已重置软件，一秒后刷新");
        this.refreshWindow();
    }

    refreshWindow() {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
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
            <List header={<Title heading={3}>偏好设置</Title>} size="small" bordered>
                <List.Item
                    header={<IconGallery className={"listItemIcon"}/>}
                    main={<Text className="listItemText">图片主题</Text>}
                    extra={
                        <CheckboxGroup disabled={this.state.disableImageTopic} value={this.state.preference.imageTopics}
                                       onChange={this.checkboxGroupOnChange.bind(this)}>
                            <Row gutter={[0, 8]} style={{width: "400px"}}>
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
                    header={<IconEdit className={"listItemIcon"}/>}
                    main={<Text className="listItemText">自定主题</Text>}
                    extra={
                        <Space>
                            <Input value={this.state.customTopicInputValue}
                                   onChange={this.customTopicInputOnChange.bind(this)} placeholder="请输入自定主题"
                                   showClear></Input>
                            <Button theme={"borderless"} icon={<IconCheckboxTick/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={this.submitCustomTopicBtnOnClick.bind(this)}>
                                {"启用自定"}
                            </Button>
                            <Button theme={"borderless"} icon={<IconClose/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={this.clearCustomTopicBtnOnClick.bind(this)}>
                                {"禁用自定"}
                            </Button>
                        </Space>
                    }
                />
                <List.Item
                    header={<IconClock className={"listItemIcon"}/>}
                    main={<Text className="listItemText">切换间隔</Text>}
                    extra={
                        <Select value={this.state.preference.switchTime}
                                onChange={this.switchTimeSelectOnChange.bind(this)}>
                            <Select.Option value="900000">每 15 分钟</Select.Option>
                            <Select.Option value="3600000">每 60 分钟</Select.Option>
                            <Select.Option value="86400000">每 24 小时</Select.Option>
                        </Select>
                    }
                />
                <List.Item
                    header={<IconQuit className={"listItemIcon"}/>}
                    main={<Text className="listItemText">开机自启（开发中）</Text>}
                    extra={
                        <Space>
                            <Text>{this.state.preference.openAtLogin ? '已开启' : '已关闭'}</Text>
                            <Switch checked={this.state.preference.openAtLogin}
                                    onChange={this.openAtLoginSwitchOnChange.bind(this)}/>
                        </Space>
                    }
                />
                <List.Item
                    header={<IconContrast className={"listItemIcon"}/>}
                    main={<Text className="listItemText">颜色模式</Text>}
                    extra={
                        <Select value={this.state.preference.colorMode}
                                onChange={this.colorModeSelectOnChange.bind(this)}>
                            <Select.Option value="autoSwitch">跟随系统</Select.Option>
                            <Select.Option value="lightMode">浅色模式</Select.Option>
                            <Select.Option value="darkMode">深色模式</Select.Option>
                        </Select>
                    }
                />
                <List.Item
                    header={<IconAlertCircle className={"listItemIcon"}/>}
                    main={<Text className="listItemText">危险设置</Text>}
                    extra={
                        <Space>
                            <Popconfirm
                                title="确定重置设置？"
                                content="所有设置项将被重置为默认值"
                                onConfirm={this.resetPreferenceBtnOnClick.bind(this)}
                            >
                                <Button type="danger" icon={<IconDelete/>}>重置设置</Button>
                            </Popconfirm>
                            <Popconfirm
                                title="确定重置软件？"
                                content="本地存储的所有数据将被清空"
                                onConfirm={this.clearStorageBtnOnClick.bind(this)}
                            >
                                <Button type="danger" icon={<IconDelete/>}>重置软件</Button>
                            </Popconfirm>
                        </Space>
                    }
                />
            </List>
        )
    }
}

export default PreferenceSettingComponent;