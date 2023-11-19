export interface ImageData {
    wallpaperUrl: string, // 设置壁纸时使用最高分辨率
    displayUrl: string,   // 列表展示时使用标准分辨率
    imageUrl: string,     // 图片主页
    userName: string,     // 摄影师昵称
    userUrl: string,      // 摄影师主页
    createTime: string,
    description: string,
    location: string,
    color: string,
}

export interface Preference {
    openAtLogin: boolean,
    colorMode: "autoSwitch" | "lightMode" | "darkMode",
    imageTopics: string[],
    customTopic: string,
    switchTime: string
}