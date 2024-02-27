import React from "react";
import {Button, List, Space, Typography} from "@douyinfe/semi-ui";
import {
    IconInfoCircle,
    IconDislikeThumb,
    IconGift,
    IconGithubLogo,
    IconGitlabLogo,
    IconHelpCircle,
    IconHorn,
    IconApps,
    IconLikeThumb,
    IconMail,
    IconRefresh,
    IconStar
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
                    header={<IconInfoCircle className={"listItemIcon"}/>}
                    main={<Text className="listItemText">{"产品信息"}</Text>}
                    extra={
                        <Space>
                            <Button theme={"borderless"} icon={<IconGithubLogo/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://github.com/xyk953651094/SkyWallpaper-Electron/releases/", "_blank")
                                    }}>
                                {"产品主页"}
                            </Button>
                            <Button theme={"borderless"} icon={<IconGitlabLogo/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://gitlab.com/xyk953651094/SkyWallpaper-Electron/-/releases/", "_blank")
                                    }}>
                                {"产品主页"}
                            </Button>
                        </Space>
                    }
                />
                <List.Item
                    header={<IconRefresh className={"listItemIcon"}/>}
                    main={<Text
                        className="listItemText">{"检查更新（当前版本：V" + require('../../package.json').version + "）"}</Text>}
                    extra={
                        <Space>
                            <Button theme={"borderless"} icon={<IconGithubLogo/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://github.com/xyk953651094/SkyWallpaper-Electron/releases/", "_blank")
                                    }}>
                                {"更新日志"}
                            </Button>
                            <Button theme={"borderless"} icon={<IconGitlabLogo/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://gitlab.com/xyk953651094/SkyWallpaper-Electron/-/releases/", "_blank")
                                    }}>
                                {"更新日志"}
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
                                {"帮助文档"}
                            </Button>
                            <Button theme={"borderless"} icon={<IconGitlabLogo/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://xyk953651094.gitlab.io/SkyDocuments/", "_blank")
                                    }}>
                                {"帮助文档"}
                            </Button>
                        </Space>
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
                                        window.open("mailto:xyk953651094@qq.com?&subject=云开壁纸-功能建议&body=提示：功能建议前请优先查阅帮助文档", "_blank")
                                    }}>
                                {"功能建议"}
                            </Button>
                            <Button theme={"borderless"} icon={<IconDislikeThumb/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("mailto:xyk953651094@qq.com?&subject=云开壁纸-问题反馈&body=提示：问题反馈前请优先查阅帮助文档", "_blank")
                                    }}>
                                {"问题反馈"}
                            </Button>
                        </Space>
                    }
                />
                <List.Item
                    header={<IconApps className={"listItemIcon"}/>}
                    main={<Text className="listItemText">{"其它产品"}</Text>}
                    extra={
                        <Space>
                            <Button theme={"borderless"} icon={<IconGithubLogo/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {window.open("https://github.com/xyk953651094/", "_blank")}}>
                                {"作者主页"}
                            </Button>
                            <Button theme={"borderless"} icon={<IconGitlabLogo/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {window.open("https://gitlab.com/xyk953651094/", "_blank")}}>
                                {"作者主页"}
                            </Button>
                        </Space>
                    }
                />
                <List.Item
                    header={<IconStar className={"listItemIcon"}/>}
                    main={
                        <Text className="listItemText">{"如果喜欢这款软件，请在商店五星好评，或者在 Github、GitLab 添加星标"}</Text>
                    }
                    extra={
                        <Space>
                            <Button theme={"borderless"} icon={<IconHorn/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://xyk953651094.blogspot.com/", "_blank")
                                    }}>
                                {"个人博客"}
                            </Button>
                            <Button theme={"borderless"} icon={<IconGift/>}
                                    style={{color: "var(--semi-color-text-0)"}}
                                    onClick={() => {
                                        window.open("https://afdian.net/a/xyk953651094/", "_blank")
                                    }}>
                                {"捐助作者"}
                            </Button>
                        </Space>
                    }
                />
            </List>
        )
    }
}

export default preferenceInfoComponent;