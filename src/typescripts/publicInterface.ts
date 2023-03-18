export interface ImageData {
    displayUrl: string,
    previewUrl: string,
    imageUrl: string,
    userName: string,
    userUrl: string,
    createTime: string,
    description: string,
    color: string,
}

export interface Preference {
    displayMode: "autoMode" | "lightMode" | "darkMode",
    themeColor: string,
}