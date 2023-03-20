import React from "react";
import "./App.css";
import {matchMode} from "./typescripts/publicFunctions"

import WallpaperComponent from "./components/wallpaperComponent";
import SearchComponent from "./components/searchComponent";
import PreferenceComponent from "./components/preferenceComponent";

import {Layout, Nav} from "@douyinfe/semi-ui";
import {IconImage, IconSearch, IconSetting} from "@douyinfe/semi-icons";
import {Preference} from "./typescripts/publicInterface";
import {defaultPreference} from "./typescripts/publicConstants";
const {Sider, Content} = Layout;

type propType = {}

type stateType = {
    navigationItemDisplay: string[],
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
            navigationItemDisplay: ["block", "none", "none"],
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
            }, ()=>{
                // 切换暗色模式
                const body = document.body;
                if (this.state.preference.displayMode === "autoMode") {
                    const mql = window.matchMedia("(prefers-color-scheme: dark)");
                    mql.addListener(matchMode);
                }
                else if (this.state.preference.displayMode === "lightMode" ) {
                    if (body.hasAttribute("theme-mode")) {
                        body.removeAttribute("theme-mode");
                    }
                }
                else {
                    if (!body.hasAttribute("theme-mode")) {
                        body.setAttribute("theme-mode", "dark");
                    }
                }
            })
        }
    }

    render() {
        return (
            <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
                <Sider>
                    <Nav
                        defaultSelectedKeys={['Home']}
                        style={{ maxWidth: 220, height: '100%' }}
                        header={{
                            logo: <img src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />,
                            text: 'Sky 每日壁纸',
                        }}
                        items={[
                            { itemKey: 'Wallpaper', text: '每日壁纸', icon: <IconImage size="large" /> },
                            { itemKey: 'Search', text: '搜索壁纸', icon: <IconSearch size="large" /> },
                            { itemKey: 'Preference', text: '偏好设置', icon: <IconSetting size="large" /> },
                        ]}
                        onClick={data => {
                            switch (data.itemKey) {
                                case "Wallpaper":  {
                                    this.setState({
                                        navigationItemDisplay: ["block", "none", "none", "none"]
                                    });
                                    break;
                                }
                                case "Search": {
                                    this.setState({
                                        navigationItemDisplay: ["none", "block", "none", "none"]
                                    });
                                    break;
                                }
                                case "Preference": {
                                    this.setState({
                                        navigationItemDisplay: ["none", "none", "block", "none"]
                                    });
                                    break;
                                }
                            }
                        }}
                        footer={{
                            collapseButton: true,
                        }}
                    />
                </Sider>
                <Layout>
                    <Content style={{ padding: '24px', backgroundColor: 'var(--semi-color-bg-0)',}}>
                        <WallpaperComponent display={this.state.navigationItemDisplay[0]}/>
                        <SearchComponent display={this.state.navigationItemDisplay[1]}/>
                        <PreferenceComponent display={this.state.navigationItemDisplay[2]} getPreference={this.getPreference.bind(this)}/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;
