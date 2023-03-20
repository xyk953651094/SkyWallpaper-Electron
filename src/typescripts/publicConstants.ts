import {ImageData, Preference} from "./publicInterface";

export const unsplashTodayRequestUrl: string = "https://api.unsplash.com/photos";
export const unsplashTopicRequestUrl: string = "https://api.unsplash.com/photos/random";
export const unsplashSearchRequestUrl: string = "https://api.unsplash.com/search/photos";
export const unsplashClientId: string = "ntHZZmwZUkhiLBMvwqqzmOG29nyXSCXlX7x_i-qhVHM";
export const unsplashVisitUrl: string = "?utm_source=SkyNewTab&utm_medium=referral";  // Unsplash API规范
export const pexelsCurateRequestUrl:string = "https://api.pexels.com/v1/curated";
export const pexelsSearchRequestUrl: string = "https://api.pexels.com/v1/search"
export const pexelsAuth: string = "sbJpn7uRC2FAknG1nefeRAYquBuMxyP68BaJ2joKCr6MtxAjqwBvth6h";
export const pixabayRequestUrl:string = "https://pixabay.com/api/";
export const pixabayKey: string = "34466426-b21174c2eaa64ee76ce599e3b";

// export const bingRequestUrl:string = "https://cn.bing.com/HPImageArchive.aspx";
export const bingRequestUrl:string = "http://bing.ioliu.cn/v1"; // https://github.com/xCss/bing

export const wallpaperPageSize: number = 6;
export const searchPageSize: number = 10;

export const defaultPreference: Preference = {
    displayMode: "lightMode",
    themeColor: "amber",
}

export const defaultImageData: ImageData = {
    displayUrl: "",
    previewUrl: "",
    imageUrl: "",
    userName: "暂无摄影师信息",
    userUrl: "",
    createTime: "暂无拍摄时间",
    description: "暂无描述",
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

export const pixabayImageCategories= {
    "": "随机",
    "backgrounds": "背景",
    "fashion": "时尚",
    "nature": "自然",
    "science": "科技",
    "education": "教育",
    "feelings": "感受",
    "health": "健康",
    "religion": "宗教",
    "places": "地点",
    "animals": "动物",
    "industry": "工业",
    "computer": "计算机",
    "food": "食物",
    "sports": "运动",
    "transportation": "交通",
    "travel": "旅行",
    "buildings": "建筑",
    "business": "商业",
    "music": "音乐",
}