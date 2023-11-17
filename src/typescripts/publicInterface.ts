export interface ImageData {
    displayUrl: string,
    previewUrl: string,
    imageUrl: string,
    userName: string,
    userUrl: string,
    createTime: string,
    description: string,
    color: string,
    source: string
}

export interface Preference {
    openAtLogin: boolean,
    colorMode: "autoSwitch" | "lightMode" | "darkMode"
    changeImageTime: string,
}