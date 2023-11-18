import {ImageData, Preference} from "./publicInterface";

export const unsplashTodayRequestUrl: string = "https://api.unsplash.com/photos";
export const unsplashTopicRequestUrl: string = "https://api.unsplash.com/photos/random";
export const unsplashSearchRequestUrl: string = "https://api.unsplash.com/search/photos";
export const unsplashClientId: string = "ntHZZmwZUkhiLBMvwqqzmOG29nyXSCXlX7x_i-qhVHM";

export const listPageSize: number = 10;

export const imageDescriptionMaxSize: number = 40;

export const defaultPreference: Preference = {
    openAtLogin: false,
    colorMode: "autoSwitch",
}

export const defaultImageData: ImageData = {
    displayUrl: "",
    previewUrl: "",
    imageUrl: "",
    userName: "暂无信息",
    userUrl: "",
    createTime: "暂无信息",
    description: "暂无信息",
    color: "",
}

export const unsplashImageTopics = {
    "popular": "热门",
    "latest": "最新",
    "": "随机",
    "Fzo3zuOHN6w": "旅游",
    "bo8jQKTaE0Y": "壁纸",
    "CDwuwXJAbEw": "三维",
    "iUIsnVtjB0Y": "纹理",
    "qPYsDzvJOYc": "实验",
    "rnSKDHwwYUk": "建筑",
    "6sMVjTLSkeQ": "自然",
    "aeu6rL-j6ew": "商务",
    "S4MKLAsBB74": "时尚",
    "hmenvQhUmxM": "电影",
    "xjPR4hlkBGA": "饮食",
    "_hb-dl4Q-4U": "健康",
    "towJZFskpGg": "人物",
    "R_Fyn-Gwtlw": "精神",
    "xHxYTMHLgOc": "街头",
    "Jpg6Kidl-Hk": "动物",
    "_8zFHuhRhyo": "灵魂",
    "bDo48cUhwnY": "文化",
    "dijpbw99kQQ": "历史",
    "Bn-DjrcBrwo": "体育",
}