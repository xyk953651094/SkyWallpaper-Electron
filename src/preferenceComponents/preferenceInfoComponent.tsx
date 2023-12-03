import React from "react";
import {Button, List, Space, Typography} from "@douyinfe/semi-ui";
import {
    IconDislikeThumb,
    IconGift,
    IconGithubLogo,
    IconGitlabLogo,
    IconHelpCircle,
    IconHorn,
    IconImage,
    IconLikeHeart,
    IconLikeThumb,
    IconLink,
    IconMail,
    IconRefresh
} from "@douyinfe/semi-icons";

const {Title, Text} = Typography;

type propType = {}

type stateType = {}

interface preferenceInfoComponent {
    state: stateType,
    props: propType
}

class preferenceInfoComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <List header={<Title heading={3}>产品信息</Title>} size="small" bordered>
                <List.Item
                    header={<IconRefresh className={"listItemIcon"}/>}
                    main={<Text
                        className="listItemText">{"检查更新（当前版本：V" + require('../../package.json').version + "）"}</Text>}
                    extra={
                        <Space>
                            <Button theme={"borderless"} icon={<IconGithubLogo/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://github.com/xyk953651094/SkyWallpaper-Electron/releases", "_blank")
                                    }}/>
                            <Button theme={"borderless"} icon={<IconGitlabLogo/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://gitlab.com/xyk953651094/SkyWallpaper-Electron/-/releases/", "_blank")
                                    }}/>
                        </Space>
                    }
                />
                <List.Item
                    header={<IconImage className={"listItemIcon"}/>}
                    main={<Text className="listItemText">图片来源</Text>}
                    extra={
                        <Button theme={"borderless"} icon={<IconLink/>}
                                style={{color: "var(--semi-color-text-0)"}}
                                onClick={() => {
                                    window.open("https://unsplash.com/", "_blank")
                                }}>
                            {"Unsplash.com"}
                        </Button>
                    }
                />
                <List.Item
                    header={<IconLikeHeart className={"listItemIcon"}/>}
                    main={<Text className="listItemText">开发支持</Text>}
                    extra={
                        <Button theme={"borderless"} icon={<IconLink/>}
                                style={{color: "var(--semi-color-text-0)"}}
                                onClick={() => {
                                    window.open("https://www.jetbrains.com.cn/community/opensource/#support/", "_blank")
                                }}>
                            {"JetBrains 免费许可证计划"}
                        </Button>
                    }
                />
                <List.Item
                    header={<IconMail className={"listItemIcon"}/>}
                    main={<Text className="listItemText">联系作者</Text>}
                    extra={
                        <Space>
                            <Button theme={"borderless"} icon={<IconLikeThumb/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("mailto:xyk953651094@qq.com?&subject=云开壁纸-功能建议", "_blank")
                                    }}>
                                {"功能建议"}
                            </Button>
                            <Button theme={"borderless"} icon={<IconDislikeThumb/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("mailto:xyk953651094@qq.com?&subject=云开壁纸-问题反馈", "_blank")
                                    }}>
                                {"问题反馈"}
                            </Button>
                        </Space>
                    }
                />
                <List.Item
                    header={<IconLink className={"listItemIcon"}/>}
                    main={<Text className="listItemText">其它链接</Text>}
                    extra={
                        <Space>
                            <Button theme={"borderless"} icon={<IconHorn/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://xyk953651094.blogspot.com/", "_blank")
                                    }}>
                                {"Blogger"}
                            </Button>
                            <Button theme={"borderless"} icon={<IconGift/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://afdian.net/a/xyk953651094/", "_blank")
                                    }}>
                                {"支持作者"}
                            </Button>
                        </Space>
                    }
                />
                <List.Item
                    header={<IconHelpCircle className={"listItemIcon"}/>}
                    main={<Text className="listItemText">帮助文档</Text>}
                    extra={
                        <Space>
                            <Button theme={"borderless"} icon={<IconGithubLogo/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://xyk953651094.github.io/SkyDocuments/", "_blank")
                                    }}>
                                {"GitHub Pages"}
                            </Button>
                            <Button theme={"borderless"} icon={<IconGitlabLogo/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://xyk953651094.gitlab.io/SkyDocuments/", "_blank")
                                    }}>
                                {"GitLab Pages"}
                            </Button>
                        </Space>
                    }
                />
            </List>
        )
    }
}

export default preferenceInfoComponent;