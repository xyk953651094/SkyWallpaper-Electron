import React from "react";
import {Row, Space, Button} from "@douyinfe/semi-ui";
import {IconSun, IconMoon, IconSearch, IconRefresh, IconGithubLogo, IconGitlabLogo, IconGift} from "@douyinfe/semi-icons";

type propType = {}

type stateType = {}

interface HeaderComponent {
    state: stateType,
    props: propType
}

class HeaderComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    reloadButtonOnClick() {
        window.location.reload();
    }

    githubButtonOnClick() {
        window.open("https://github.com/xyk953651094/SkyWallpaper-Electron/", "_blank");
    }

    gitlabButtonOnClick() {
        window.open("https://gitlab.com/xyk953651094/SkyWallpaper-Electron/", "_blank");
    }

    supportButtonOnClick() {
        window.open("https://afdian.net/a/xyk953651094", "_blank");
    }

    componentDidMount() {
        // 初始化切换按钮的显示状态
        const body = document.body;
        if (body.hasAttribute("theme-mode")) {
            this.setState({
                displaySunButton: "block",
                displayMoonButton: "none"
            })
        }
        else {
            this.setState({
                displaySunButton: "none",
                displayMoonButton: "block"
            })
        }
    }

    render() {
        return (
            <Row style={{textAlign: "right"}}>
                <Space>
                    {/*<Button theme={"borderless"} icon={<IconSearch />}*/}
                    {/*        style={{color: "var(--semi-color-text-0)"}}*/}
                    {/*        onClick={() => navigate("/search")}/>*/}
                    <Button theme={"borderless"} icon={<IconRefresh />}
                            style={{color: "var(--semi-color-text-0)"}}
                            onClick={this.reloadButtonOnClick.bind(this)}>
                        {"刷新界面"}
                    </Button>
                    <Button theme={"borderless"} icon={<IconGithubLogo />}
                            style={{color: "var(--semi-color-text-0)"}}
                            onClick={this.githubButtonOnClick.bind(this)}>
                        {"GitHub 主页"}
                    </Button>
                    <Button theme={"borderless"} icon={<IconGitlabLogo />}
                            style={{color: "var(--semi-color-text-0)"}}
                            onClick={this.gitlabButtonOnClick.bind(this)}>
                        {"GitLab 主页"}
                    </Button>
                    <Button theme={"borderless"} icon={<IconGift />}
                            style={{color: "var(--semi-color-text-0)"}}
                            onClick={this.supportButtonOnClick.bind(this)}>
                        {"支持作者"}
                    </Button>
                </Space>
            </Row>
        )
    }
}

export default HeaderComponent;