import React from "react";
import {Button, List, Select, Space, Switch, Toast, Typography} from "@douyinfe/semi-ui";
import {IconAlertCircle, IconContrast, IconDelete, IconQuit} from "@douyinfe/semi-icons";
import {getPreferenceStorage} from "../typescripts/publicFunctions";
import {Preference} from "../typescripts/publicInterface";

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

    clearStorage() {
        localStorage.clear();
        Toast.success("已清空缓存，一秒后刷新");
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
                    extra={<Button type="danger" icon={<IconDelete/>}
                                   onClick={this.clearStorage.bind(this)}>清空缓存</Button>}
                />
            </List>
        )
    }
}

export default preferenceFunctionComponent;