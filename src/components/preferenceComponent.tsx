import React from "react";
import {Button, Col, Divider, List, Row, Select, Space, Switch, Toast, Typography} from "@douyinfe/semi-ui";
import {
    IconAlertCircle,
    IconQuit,
    IconContrast,
    IconInfoCircle,
    IconImage,
    IconDelete,
    IconLikeThumb, IconGithubLogo, IconGitlabLogo, IconPuzzle, IconRefresh
} from "@douyinfe/semi-icons";
import "../stylesheets/preferenceComponent.css"
import {Preference} from "../typescripts/publicInterface";
import {defaultPreference} from "../typescripts/publicConstants";
import {getPreferenceStorage} from "../typescripts/publicFunctions";

const {Title, Text} = Typography;
const $ = require("jquery");

type propType = {
    getPreference: any,  // 设置数据
}

type stateType = {
    preference: Preference
}

interface PreferenceComponent {
    state: stateType,
    props: propType
}

class PreferenceComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            preference: defaultPreference
        };
    }

    openAtLoginSwitchOnChange(checked:boolean) {
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
        }
        else if (value === "darkMode") {
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
        this.setState({
            preference: getPreferenceStorage(),
        });
    }

    render() {
        return (
            <Row align={"middle"} justify={"center"} gutter={[0, 16]}>
                <Col span={24}>
                    <List
                        header={<Title heading={3}>偏好设置</Title>}
                        size="small"
                        bordered
                    >
                        <List.Item
                            header={ <IconQuit className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">自动启动</Text> }
                            extra={
                                <Space>
                                    <Text>{this.state.preference.openAtLogin ? '已开启' : '已关闭'}</Text>
                                    <Switch checked={this.state.preference.openAtLogin}
                                            onChange={this.openAtLoginSwitchOnChange.bind(this)} />
                                </Space>
                            }
                        />
                        <List.Item
                            header={ <IconContrast className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">颜色模式</Text> }
                            extra={
                                <Select defaultValue="autoSwitch" onChange={this.colorModeSelectOnChange.bind(this)}>
                                    <Select.Option value="autoSwitch">跟随系统</Select.Option>
                                    <Select.Option value="lightMode">浅色模式</Select.Option>
                                    <Select.Option value="darkMode">深色模式</Select.Option>
                                </Select>
                            }
                        />
                        <List.Item
                            header={ <IconRefresh className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">自动切换（待开发）</Text> }
                            extra={
                                <Select defaultValue="close">
                                    <Select.Option value="close">不自动切换</Select.Option>
                                    <Select.Option value="perHour">每 15 分钟</Select.Option>
                                    <Select.Option value="perHour">每 30 分钟</Select.Option>
                                    <Select.Option value="perDay">每 60 分钟</Select.Option>
                                </Select>
                            }
                        />
                        <List.Item
                            header={ <IconAlertCircle className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">危险设置</Text> }
                            extra={ <Button type="danger" icon={<IconDelete />} onClick={this.clearStorage.bind(this)}>清空缓存</Button> }
                        />
                    </List>
                </Col>
                <Col span={24}>
                    <List header={<Title heading={3}>产品信息</Title>} size="small" bordered>
                        <List.Item
                            header={ <IconInfoCircle className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">当前版本</Text> }
                            extra={ <Text>{"V" + require('../../package.json').version}</Text>}
                        />
                        <List.Item
                            header={ <IconRefresh className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">检查更新</Text> }
                            extra={
                                <Space>
                                    <Button theme={"borderless"} icon={<IconGithubLogo />}
                                            style={{color: "var(--semi-color-text-0)"}}
                                            onClick={()=> {window.open("https://github.com/xyk953651094/SkyWallpaper-Electron/releases","_blank")}}/>
                                    <Button theme={"borderless"} icon={<IconGitlabLogo />}
                                            style={{color: "var(--semi-color-text-0)"}}
                                            onClick={()=> {window.open("https://gitlab.com/xyk953651094/SkyWallpaper-Electron/-/releases/","_blank")}}/>
                                </Space>
                            }
                        />
                        <List.Item
                            header={ <IconImage className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">图片来源</Text> }
                            extra={
                                <Space>
                                    <Text link={{ href: "https://unsplash.com/"}}>{"Unsplash"}</Text>
                                    <Divider layout="vertical"/>
                                    <Text link={{ href: "https://pexels.com/zh-cn/"}}>{"Pexels"}</Text>
                                    <Divider layout="vertical"/>
                                    <Text link={{ href: "https://pixabay.com/"}}>{"Pixabay"}</Text>
                                </Space>
                            }
                        />
                        <List.Item
                            header={ <IconLikeThumb className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">开发支持</Text> }
                            extra={ <Text link={{ href: "https://www.jetbrains.com.cn/community/opensource/#support/"}}>{"JetBrains 免费许可证计划"}</Text> }
                        />
                        <List.Item
                            header={ <IconAlertCircle className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">使用声明</Text> }
                            extra={ <Text style={{color: "var(--semi-color-warning)"}}>图片来源于第三方网站，内容不代表开发者任何观点</Text> }
                        />
                    </List>
                </Col>
                <Col span={24}>
                    <List header={<Title heading={3}>其它作品</Title>} size="small" bordered>
                        <List.Item
                            header={ <IconPuzzle className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">云开新标签页（基于 React）</Text> }
                            extra={
                                <Space>
                                    <Button theme={"borderless"} icon={<IconGithubLogo />}
                                            style={{color: "var(--semi-color-text-0)"}}
                                            onClick={()=> {window.open("https://github.com/xyk953651094/SkyNewTab-React/","_blank")}}/>
                                    <Button theme={"borderless"} icon={<IconGitlabLogo />}
                                            style={{color: "var(--semi-color-text-0)"}}
                                            onClick={()=> {window.open("https://gitlab.com/xyk953651094/SkyNewTab-React/","_blank")}}/>
                                </Space>
                            }
                        />
                        <List.Item
                            header={ <IconPuzzle className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">云开新标签页（基于 Vue）</Text> }
                            extra={
                                <Space>
                                    <Button theme={"borderless"} icon={<IconGithubLogo />}
                                            style={{color: "var(--semi-color-text-0)"}}
                                            onClick={()=> {window.open("https://github.com/xyk953651094/SkyNewTab-Vue/","_blank")}}/>
                                    <Button theme={"borderless"} icon={<IconGitlabLogo />}
                                            style={{color: "var(--semi-color-text-0)"}}
                                            onClick={()=> {window.open("https://gitlab.com/xyk953651094/SkyNewTab-Vue/","_blank")}}/>
                                </Space>
                            }
                        />
                        <List.Item
                            header={ <IconPuzzle className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">云开诗词新标签页（基于 React）</Text> }
                            extra={
                                <Space>
                                    <Button theme={"borderless"} icon={<IconGithubLogo />}
                                            style={{color: "var(--semi-color-text-0)"}}
                                            onClick={()=> {window.open("https://github.com/xyk953651094/SkyNewTab-Poem-React/","_blank")}}/>
                                    <Button theme={"borderless"} icon={<IconGitlabLogo />}
                                            style={{color: "var(--semi-color-text-0)"}}
                                            onClick={()=> {window.open("https://gitlab.com/xyk953651094/SkyNewTab-Poem-React/","_blank")}}/>
                                </Space>
                            }
                        />
                        <List.Item
                            header={ <IconPuzzle className={"listItemIcon"}/> }
                            main={ <Text className="listItemText">云开诗词新标签页（基于 Angular）</Text> }
                            extra={
                                <Space>
                                    <Button theme={"borderless"} icon={<IconGithubLogo />}
                                            style={{color: "var(--semi-color-text-0)"}}
                                            onClick={()=> {window.open("https://github.com/xyk953651094/SkyNewTab-Poem-Angular/","_blank")}}/>
                                    <Button theme={"borderless"} icon={<IconGitlabLogo />}
                                            style={{color: "var(--semi-color-text-0)"}}
                                            onClick={()=> {window.open("https://gitlab.com/xyk953651094/SkyNewTab-Poem-Angular/","_blank")}}/>
                                </Space>
                            }
                        />
                    </List>
                </Col>
            </Row>
        );
    }
}
export default PreferenceComponent;
