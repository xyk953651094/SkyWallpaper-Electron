import {ImageData, Preference} from "./publicInterface";
import {Toast} from "@douyinfe/semi-ui";
import {defaultPreference, listPageSize} from "./publicConstants";

const $ = require("jquery");

// 网络请求
export function httpRequest(headers: object, url: string, data: object, method: "GET" | "POST") {
    return new Promise(function (resolve, reject) {
        $.ajax({
            headers: headers,
            url: url,
            type: method,
            data: data,
            timeout: 5000,
            success: (resultData: any) => {
                resolve(resultData);
            },
            error: function () {
                reject();
            }
        });
    })
}

// 判断字符串是否合规
export function isEmpty(param: string | null) {
    return (param === null || param === undefined || param.length === 0);
}

// 设置壁纸
export function setWallpaper(currentImage: ImageData) {
    let tempLocalStorage = localStorage.getItem("history");
    let tempHistory: ImageData[] = [];
    let hasSame: boolean = false;
    let sameIndex: number = -1;
    if (tempLocalStorage) {
        tempHistory = JSON.parse(tempLocalStorage);

        // 超过数量上限时删除最早记录
        if (tempHistory.length === listPageSize) {
            tempHistory.shift();
        }

        // 查重
        for (let i in tempHistory) {
            if (currentImage.imageUrl === tempHistory[i].imageUrl) {
                hasSame = true;
                sameIndex = Number(i);
            }
        }

        // 删除重复的数据然后重新 push 一个新的
        if (hasSame) {
            tempHistory.splice(sameIndex, 1);
        }
    }

    tempHistory.push(currentImage);
    localStorage.setItem("history", JSON.stringify(tempHistory));

    // 根据不同操作系统设置壁纸，一次只能设置一个，防止不停点“设置壁纸”按钮
    Toast.success("壁纸设置成功（开发中）");

    // let settingStatus = localStorage.getItem("isSettingWallpaper");
    // if (settingStatus === null || settingStatus === "true") {
    //     localStorage.setItem("isSettingWallpaper", "true");
    //     const spawn = require('child_process').spawn;
    //     let temp = spawn("python3", ["../python/setWallpaper.py", currentImage.wallpaperUrl]);
    //     temp.stdout.on("status", function (status: any) {  // status => data
    //         console.log(status);
    //         switch (status) {
    //             case "success":
    //                 Toast.success("设置成功");
    //                 break;
    //             case "error":
    //                 Toast.error("设置失败");
    //                 break;
    //         }
    //     });
    //     spawn.on('close', (code: any) => {
    //         console.log(code);
    //         localStorage.setItem("isSettingWallpaper", "false");
    //     });
    // }
}

// 获取操作系统
export function getUserAgent() {
    let userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Mac") !== -1) {
        return "MacOS";
    }
    if (userAgent.indexOf("Windows") !== -1) {
        return "Windows";
    }
    if (userAgent.indexOf("Linux") !== -1) {
        return "Linux";
    }
    return "Other";
}

// 根据图片背景颜色获取元素反色效果
export function getReverseColor(color: string) {
    color = "0x" + color.replace("#", '');
    let newColor = "000000" + (0xFFFFFF - parseInt(color)).toString(16);
    return "#" + newColor.substring(newColor.length - 6, newColor.length);
}

// 根据图片背景颜色改变字体颜色效果
export function getFontColor(color: string) {
    if (color === "rgba(var(--semi-grey-0), 1)") {
        return "rgba(var(--semi-grey-9), 1)"
    } else {
        let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        if (rgb) {
            let r = parseInt(rgb[1], 16);
            let g = parseInt(rgb[2], 16);
            let b = parseInt(rgb[3], 16);
            let gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114);
            if (gray > 128) {
                return "#000000";
            } else {
                return "#ffffff";
            }
        } else {
            return "#ffffff";
        }
    }
}

export function getJsonLength(jsonData: JSON) {
    let length: number = 0;
    for (let i in jsonData) {
        length++;
    }
    return length;
}

// 补全设置数据
export function fixPreference(preference: Preference) {
    let isFixed = false;
    if (!preference.openAtLogin) {
        preference.openAtLogin = defaultPreference.openAtLogin;
        isFixed = true;
    }
    if (!preference.colorMode) {
        preference.colorMode = defaultPreference.colorMode;
        isFixed = true;
    }
    if (!preference.imageTopics) {
        preference.imageTopics = defaultPreference.imageTopics;
        isFixed = true;
    }
    if (!preference.customTopic) {
        preference.customTopic = defaultPreference.customTopic;
        isFixed = true;
    }
    if (!preference.switchTime) {
        preference.switchTime = defaultPreference.switchTime;
        isFixed = true;
    }

    if (isFixed) {
        localStorage.setItem("preference", JSON.stringify(preference));  // 重新保存设置
    }
    return preference;
}

export function getPreferenceStorage() {
    let tempPreference = localStorage.getItem("preference");
    if (tempPreference === null || tempPreference.length === 0) {
        localStorage.setItem("preference", JSON.stringify(defaultPreference));
        return defaultPreference;
    } else {
        return fixPreference(JSON.parse(tempPreference));  // 检查是否缺少数据
    }
}

// 自动亮暗模式
export function matchMode(e: any) {
    const body = document.body;
    if (e.matches) {
        if (!body.hasAttribute('theme-mode')) {
            body.setAttribute('theme-mode', 'dark');
        }
    } else {
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
        }
    }
}

// 按钮
export function btnMouseOver(color: string, e: any) {
    e.currentTarget.style.backgroundColor = getReverseColor(color);
    e.currentTarget.style.color = getFontColor(getReverseColor(color));
}

export function btnMouseOut(color: string, e: any) {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = getFontColor(color);
}