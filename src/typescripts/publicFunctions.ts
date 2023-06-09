import {ImageData} from "./publicInterface";
import {Toast} from "@douyinfe/semi-ui";
import {historyMaxSize} from "./publicConstants";

const $ = require("jquery");

// 网络请求
export function httpRequest(headers: object, url: string, data: object, method: "GET" | "POST") {
    return new Promise(function(resolve,reject){
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
export function isEmptyString(param: string | null) {
    return (param === null || param === undefined || param.length === 0);
}

// 设置壁纸
export function setWallpaper(currentImage: ImageData) {
    let tempLocalStorage = localStorage.getItem("history");
    let tempHistory: ImageData[] = [];
    let hasSame: boolean = false;
    let sameIndex: number = -1;
    if(tempLocalStorage) {
        tempHistory = JSON.parse(tempLocalStorage);
        console.log(tempHistory);

        // 超过数量上限时删除最早记录
        if(tempHistory.length === historyMaxSize) {
            tempHistory.shift();
            console.log(tempHistory);
        }

        // 查重
        for (let i in tempHistory) {
            if( currentImage.imageUrl === tempHistory[i].imageUrl){
                hasSame = true;
                sameIndex = Number(i);
                // console.log(sameIndex);
            }
        }

        // 删除重复的数据然后重新 push 一个新的
        if(hasSame) {
            tempHistory.splice(sameIndex, 1);
            // console.log(tempHistory);
        }
    }

    tempHistory.push(currentImage);
    console.log(tempHistory);
    localStorage.setItem("history", JSON.stringify(tempHistory));

    // TODO: 设置壁纸
    Toast.success("设置成功");
}

// 根据图片背景颜色改变字体颜色效果
export function getFontColor(color: string) {
    if(color === "rgba(var(--semi-grey-0), 1)") {
        return "rgba(var(--semi-grey-9), 1)"
    }
    else {
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
        }
        else {
            return "#ffffff";
        }
    }
}

export function getJsonLength(jsonData: JSON) {
    let length: number = 0;
    for (let i in jsonData) {
        length ++;
    }
    return length;
}

// 自动切换亮暗色模式
export function matchMode(e: any) {
    const body = document.body;
    if (e.matches) {
        if (!body.hasAttribute("theme-mode")) {
            body.setAttribute("theme-mode", "dark");
        }
    } else {
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
        }
    }
}