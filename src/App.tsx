import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import WallpaperComponent from "./components/wallpaperComponent";
import SearchComponent from "./components/searchComponent";
import HistoryComponent from "./components/historyComponent";
import PreferenceComponent from "./components/preferenceComponent";
import {Layout, Nav} from "@douyinfe/semi-ui";
import {IconImage, IconSearch, IconHistory, IconSetting, IconHomeStroked} from "@douyinfe/semi-icons";
import {Preference} from "./typescripts/publicInterface";
import {defaultPreference} from "./typescripts/publicConstants";
import {matchMode} from "./typescripts/publicFunctions";

const {Header, Sider, Content} = Layout;

const $ = require("jquery");

type propType = {}

type stateType = {
    preference: Preference,
}

interface App {
    state: stateType,
    props: propType
}

class App extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            preference: defaultPreference,
        }
    }

    getPreference(preference: any) {
        this.setState({
            preference: preference,
        })
    }

    componentDidMount() {
        // 加载偏好设置
        let tempPreference = localStorage.getItem("preference");
        if(tempPreference == null || tempPreference.length === 0) {
            localStorage.setItem("preference", JSON.stringify(defaultPreference));
        }
        else {
            this.setState({
                preference: JSON.parse(tempPreference),
            }, () => {
                // 自动亮暗模式
                switch (this.state.preference.colorMode) {
                    case "autoSwitch": {
                        const mql = window.matchMedia('(prefers-color-scheme: dark)');
                        mql.addListener(matchMode);
                        break;
                    }
                    case "lightMode": {
                        const body = document.body;
                        if (body.hasAttribute('theme-mode')) {
                            body.removeAttribute('theme-mode');
                        }
                        break;
                    }
                    case "darkMode": {
                        const body = document.body;
                        if (!body.hasAttribute('theme-mode')) {
                            body.setAttribute('theme-mode', 'dark');
                        }
                        break;
                    }
                }
            })
        }
    }

    render() {
        return (
            <Layout>
                <Sider>
                    <Nav
                        defaultSelectedKeys={['Wallpaper']}
                        style={{ maxWidth: 220, height: '100%' }}
                        header={{
                            logo: <img src={require("./assets/logo.png")}  alt={"Logo"}/>,
                            text: '云开壁纸',
                        }}
                        renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
                            const routerMap = {
                                Wallpaper: "/wallpaper",
                                Search: "/search",
                                History: "/history",
                                Preference: "/preference"
                            };
                            return (
                                // @ts-ignore
                                <Link style={{ textDecoration: "none" }} to={routerMap[props.itemKey]}>
                                    {itemElement}
                                </Link>
                            );
                        }}
                        items={[
                            { itemKey: 'Wallpaper', text: '推荐壁纸', icon: <IconImage /> },
                            { itemKey: 'Search', text: '搜索壁纸', icon: <IconSearch /> },
                            { itemKey: 'History', text: '历史记录', icon: <IconHistory /> },
                            { itemKey: 'Preference', text: '偏好设置', icon: <IconSetting /> },
                        ]}
                        footer={{
                            collapseButton: true,
                        }}
                    />
                </Sider>
                <Layout>
                    <Content style={{padding: "8px 16px 16px 16px", backgroundColor: "var(--semi-color-bg-0)"}}>
                        <Routes>
                            {/*<Route index element={<Home />} />*/}
                            {/*<Route path="*" element={<NoMatch />} />*/}
                            <Route path="/" element={<WallpaperComponent preference={this.state.preference}/>} />
                            <Route path="/wallpaper" element={<WallpaperComponent preference={this.state.preference}/>} />
                            <Route path="/search" element={<SearchComponent />} />
                            <Route path="/history" element={<HistoryComponent />} />
                            <Route path="/preference" element={<PreferenceComponent getPreference={this.getPreference.bind(this)}/>} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;
