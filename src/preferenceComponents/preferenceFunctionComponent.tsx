import React from "react";
import {Button, List, Popconfirm, Select, Space, Switch, Toast, Typography} from "@douyinfe/semi-ui";
import {IconAlertCircle, IconContrast, IconDelete, IconQuit} from "@douyinfe/semi-icons";
import {getPreferenceStorage} from "../typescripts/publicFunctions";
import {Preference} from "../typescripts/publicInterface";
import {defaultPreference} from "../typescripts/publicConstants";

const {Title, Text} = Typography;

type propType = {
    getPreference: any
}

type stateType = {
    preference: Preference
}

interface preferenceFunctionComponent {
    state: stateType,
    props: propType
}

class preferenceFunctionComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            preference: getPreferenceStorage()
        };
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
    }

    render() {
        return (
            <List
                header={<Title heading={3}>功能设置</Title>}
                size="small"
                bordered
            >
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

export default preferenceFunctionComponent;