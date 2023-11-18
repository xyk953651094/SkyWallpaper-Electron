import React from "react";
import {Space, Button, List, Typography} from "@douyinfe/semi-ui";
import {
    IconGithubLogo,
    IconGitlabLogo,
    IconPuzzle
} from "@douyinfe/semi-icons";

const {Title, Text} = Typography;

type propType = {}

type stateType = {}

interface preferenceProductComponent {
    state: stateType,
    props: propType
}

class preferenceProductComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
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
        )
    }
}

export default preferenceProductComponent;