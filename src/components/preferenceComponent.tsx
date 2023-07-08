import React from "react";
import {Button, List, Select, Switch, Typography} from "@douyinfe/semi-ui";
import {
    IconAlertCircle,
    IconMoon,
    IconColorPalette,
    IconQuit,
    IconRefresh,
    IconInfoCircle,
    IconLink,
    IconRadio,
    IconDelete
} from "@douyinfe/semi-icons";
import "../stylesheets/preferenceComponent.css"
import {matchMode} from "../typescripts/publicFunctions"
import {Preference} from "../typescripts/publicInterface";
import {defaultPreference} from "../typescripts/publicConstants";

const {Title, Text} = Typography;
const $ = require("jquery");

type propType = {
    display: string,
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

    darkModeOnChange(value: any) {
        const body = document.body;
        if (value === "autoMode") {
            const mql = window.matchMedia("(prefers-color-scheme: dark)");
            mql.addListener(matchMode);
        }
        else if (value === "lightMode" ) {
            if (body.hasAttribute("theme-mode")) {
                body.removeAttribute("theme-mode");
            }
        }
        else {
            if (!body.hasAttribute("theme-mode")) {
                body.setAttribute("theme-mode", "dark");
            }
        }

        // 更新设置
        let data = Object.assign({}, this.state.preference, {displayMode: value});
        this.setState({
            preference: data,
        }, ()=>{
            this.props.getPreference(this.state.preference);
            localStorage.setItem("preference", JSON.stringify(this.state.preference));
        })
    }

    themeColorOnChange(value: any) {
        let data = Object.assign({}, this.state.preference, {themeColor: value});
        this.setState({
            preference: data,
        }, ()=>{
            this.props.getPreference(this.state.preference);
            localStorage.setItem("preference", JSON.stringify(this.state.preference));

            const navigationItems = $(".semi-navigation-list").children("li");
            navigationItems.eq(3).css({"background-color": this.state.preference.themeColor});
        })
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.display !== prevProps.display) {
            this.setState({
                display: nextProps.display,
            });
        }
    }

    componentDidMount() {
        let tempPreference = localStorage.getItem('preference');
        if (tempPreference !== null && tempPreference.length !== 0) {
            this.setState({
                preference: JSON.parse(tempPreference),
            })
        }
    }

    render() {
        return (
            <List
                header={<Title heading={3}>偏好设置</Title>}
                size="small"
                bordered
                style={{ display: this.props.display}}
            >
                <List.Item
                    header={ <IconMoon className={"listItemIcon"}/> }
                    main={ <Text className="listItemText">夜间模式</Text> }
                    extra={
                        <Select className="preferenceSelect" defaultValue={"autoMode"} value={this.state.preference.displayMode} onChange={this.darkModeOnChange.bind(this)}>
                            <Select.Option value="autoMode" disabled>跟随系统</Select.Option>
                            <Select.Option value="lightMode">浅色模式</Select.Option>
                            <Select.Option value="darkMode">深色模式</Select.Option>
                        </Select>
                    }
                />
                <List.Item
                    header={ <IconColorPalette className={"listItemIcon"} /> }
                    main={ <Text className="listItemText">主题颜色</Text> }
                    extra={
                        <Select className="preferenceSelect" insetLabel={<IconRadio size={"extra-large"} style={{color: this.state.preference.themeColor}}/>}
                                defaultValue={"rgba(var(--semi-red-3), 1)"} value={this.state.preference.themeColor}
                                onChange={this.themeColorOnChange.bind(this)}
                        >
                            <Select.Option value="rgba(var(--semi-red-3), 1)"    style={{color: "rgba(var(--semi-red-3), 1)"}}>红色</Select.Option>
                            <Select.Option value="rgba(var(--semi-pink-3), 1)"   style={{color: "rgba(var(--semi-pink-3), 1)"}}>粉色</Select.Option>
                            <Select.Option value="rgba(var(--semi-purple-3), 1)" style={{color: "rgba(var(--semi-purple-3), 1)"}}>紫色</Select.Option>
                            <Select.Option value="rgba(var(--semi-blue-3), 1)"   style={{color: "rgba(var(--semi-blue-3), 1)"}}>蓝色</Select.Option>
                            <Select.Option value="rgba(var(--semi-cyan-3), 1)"   style={{color: "rgba(var(--semi-cyan-3), 1)"}}>青色</Select.Option>
                            <Select.Option value="rgba(var(--semi-teal-3), 1)"   style={{color: "rgba(var(--semi-teal-3), 1)"}}>茶色</Select.Option>
                            <Select.Option value="rgba(var(--semi-green-3), 1)"  style={{color: "rgba(var(--semi-green-3), 1)"}}>绿色</Select.Option>
                            <Select.Option value="rgba(var(--semi-lime-3), 1)"   style={{color: "rgba(var(--semi-lime-3), 1)"}}>石灰</Select.Option>
                            <Select.Option value="rgba(var(--semi-yellow-3), 1)" style={{color: "rgba(var(--semi-yellow-3), 1)"}}>黄色</Select.Option>
                            <Select.Option value="rgba(var(--semi-amber-3), 1)"  style={{color: "rgba(var(--semi-amber-3), 1)"}}>琥珀</Select.Option>
                            <Select.Option value="rgba(var(--semi-orange-3), 1)" style={{color: "rgba(var(--semi-orange-3), 1)"}}>橘黄</Select.Option>
                        </Select>
                    }
                />
                <List.Item
                    header={ <IconQuit className={"listItemIcon"}/> }
                    main={ <Text className="listItemText">自动启动</Text> }
                    extra={
                        <Switch></Switch>
                    }
                />
                {/*<List.Item*/}
                {/*    header={ <IconRefresh className={"listItemIcon"}/> }*/}
                {/*    main={ <Text className="listItemText">自动切换</Text> }*/}
                {/*    extra={*/}
                {/*    <Space>*/}
                {/*        <Select defaultValue="close" insetLabel={"间隔"}>*/}
                {/*            <Select.Option value="close">不切换</Select.Option>*/}
                {/*            <Select.Option value="perHour">每小时</Select.Option>*/}
                {/*            <Select.Option value="perDay">每天</Select.Option>*/}
                {/*        </Select>*/}
                {/*        <Select defaultValue="Unspalsh" insetLabel={"来源"}>*/}
                {/*            <Select.Option value="Unspalsh">Unspalsh</Select.Option>*/}
                {/*            <Select.Option value="Pexels">Pexels</Select.Option>*/}
                {/*            <Select.Option value="Pixabay">Pixabay</Select.Option>*/}
                {/*        </Select>*/}
                {/*    </Space>*/}
                {/*    }*/}
                {/*/>*/}
                <List.Item
                    header={ <IconDelete className={"listItemIcon"}/> }
                    main={ <Text className="listItemText">存储空间</Text> }
                    extra={ <Button type="danger">清空缓存</Button> }
                />
                <List.Item
                    header={ <IconLink className={"listItemIcon"}/> }
                    main={ <Text className="listItemText">产品主页</Text> }
                    extra={ <Text link={{ href: "https://github.com/xyk953651094/SkyWallpaper-React-Electron" }}>Github.com</Text> }
                />
                <List.Item
                    header={ <IconInfoCircle className={"listItemIcon"}/> }
                    main={ <Text className="listItemText">版本号</Text> }
                    extra={ <Text link={{ href: "https://github.com/xyk953651094/SkyWallpaper-React-Electron/releases"}}>V1.0.0</Text> }
                />
                <List.Item
                    header={ <IconAlertCircle className={"listItemIcon"}/> }
                    main={ <Text className="listItemText">使用声明</Text> }
                    extra={ <Text style={{color: "rgba(var(--semi-red-6), 1)"}}>图片来源于第三方网站，内容不代表开发者任何观点</Text> }
                />
            </List>
        );
    }
}
export default PreferenceComponent;
