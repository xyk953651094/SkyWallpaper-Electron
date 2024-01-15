import {ImageData, Preference} from "./publicInterface";

export const unsplashTodayRequestUrl: string = "https://api.unsplash.com/photos";
export const unsplashTopicRequestUrl: string = "https://api.unsplash.com/photos/random";
export const unsplashSearchRequestUrl: string = "https://api.unsplash.com/search/photos";
export const unsplashClientId: string = "ntHZZmwZUkhiLBMvwqqzmOG29nyXSCXlX7x_i-qhVHM";

export const listPageSize: number = 10;

export const imageDescriptionMaxSize: number = 50;

export const defaultPreference: Preference = {
    openAtLogin: false,
    colorMode: "autoSwitch",
    imageTopics: ["bo8jQKTaE0Y"],
    customTopic: "",
    switchTime: "86400000"
}

export const defaultImageData: ImageData = {
    wallpaperUrl: "",
    displayUrl: "",
    imageUrl: "",
    userName: "暂无摄影师信息",
    userUrl: "",
    createTime: "暂无拍摄时间",
    description: "暂无图片描述",
    location: "暂无位置信息",
    color: "",
}
