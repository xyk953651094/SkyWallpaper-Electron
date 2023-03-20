import React from "react";
import {List, Select, Typography} from "@douyinfe/semi-ui";
import {IconMoon, IconColorPalette, IconLanguage, IconInfoCircle, IconLink} from "@douyinfe/semi-icons";
import "../stylesheets/preferenceComponent.css"
import {matchMode} from "../typescripts/publicFunctions"
import {Preference} from "../typescripts/publicInterface";
import {defaultPreference} from "../typescripts/publicConstants";

const {Title, Text} = Typography;

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
                    main={ <Text className="listItemText">暗黑模式</Text> }
                    extra={
                        <Select className="preferenceSelect" defaultValue={"autoMode"} value={this.state.preference.displayMode} onChange={this.darkModeOnChange.bind(this)}>
                            <Select.Option value="autoMode" disabled>跟随系统</Select.Option>
                            <Select.Option value="lightMode">浅色模式</Select.Option>
                            <Select.Option value="darkMode">深色模式</Select.Option>
                        </Select>
                    }
                />
                <List.Item
                    header={ <IconColorPalette className={"listItemIcon"}/> }
                    main={ <Text className="listItemText">主题颜色</Text> }
                    extra={
                        <Select className="preferenceSelect" defaultValue={"amber"} value={this.state.preference.themeColor} onChange={this.themeColorOnChange.bind(this)}>
                            <Select.Option value="amber">amber</Select.Option>
                            <Select.Option value="blue">blue</Select.Option>
                            <Select.Option value="cyan">cyan</Select.Option>
                        </Select>
                    }
                />
                <List.Item
                    header={ <IconLanguage className={"listItemIcon"}/> }
                    main={ <Text className="listItemText">切换语言</Text> }
                    extra={
                        <Select className="preferenceSelect" defaultValue="Chinese" onChange={this.darkModeOnChange.bind(this)}>
                            <Select.Option value="Chinese">简体中文</Select.Option>
                            <Select.Option value="English">English</Select.Option>
                        </Select>
                    }
                />
                <List.Item
                    header={ <IconLink className={"listItemIcon"}/> }
                    main={ <Text className="listItemText">产品主页</Text> }
                    extra={ <Text link={{ href: "https://github.com/xyk953651094" }}>Github.com</Text> }
                />
                <List.Item
                    header={ <IconInfoCircle className={"listItemIcon"}/> }
                    main={ <Text className="listItemText">使用声明</Text> }
                    extra={ <Text style={{color: "rgba(var(--semi-red-6), 1)"}}>图片来源于第三方网站，内容不代表开发者任何观点</Text> }
                />
            </List>
        );
    }
}
export default PreferenceComponent;
