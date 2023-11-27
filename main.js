// 导入app、BrowserWindow模块
// app 控制应用程序的事件生命周期。事件调用app.on('eventName', callback)，方法调用app.functionName(arg)
// BrowserWindow 创建和控制浏览器窗口。new BrowserWindow([options]) 事件和方法调用同app
// Electron参考文档 https://www.electronjs.org/docs
const {app, BrowserWindow, nativeImage } = require('electron');
const path = require('path')
const url = require('url');
const exeName = path.basename(process.execPath);

function createWindow () {
    // Create the browser window.
    let mainWindow = new BrowserWindow({
        width: 1000,
        height: 750,
        minWidth: 1000,
        minHeight: 750,
        resizable: true,
        // fullscreenable: false,
        // useContentSize: true,
        title: "云开壁纸", // 窗口标题,如果由loadURL()加载的HTML文件中含有标签<title>，该属性可忽略
        icon: nativeImage.createFromPath('public/favicon.ico'), // "string" || nativeImage.createFromPath('public/favicon.ico')从位于 path 的文件创建新的 NativeImage 实例
        webPreferences: { // 网页功能设置
            webviewTag: true, // 是否使用<webview>标签 在一个独立的 frame 和进程里显示外部 web 内容
            webSecurity: false, // 禁用同源策略
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true // 是否启用node集成 渲染进程的内容有访问node的能力,建议设置为true, 否则在render页面会提示node找不到的错误
        }
    })

    // 加载应用 --打包阶段
    mainWindow.loadFile(path.join(__dirname, './dist/mainPage.html'));

    // 加载应用 --开发阶段  需要运行 npm run start
    // mainWindow.loadURL('http://localhost:3000');

    // 解决应用启动白屏问题
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    // 当窗口关闭时发出。在你收到这个事件后，你应该删除对窗口的引用，并避免再使用它。
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // 在启动的时候打开DevTools
    // mainWindow.webContents.openDevTools()
}

app.allowRendererProcessReuse =true;

app.setLoginItemSettings({
    openAtLogin: false,
    openAsHidden: true,
    path: process.execPath,
    args: [
        "--processStart", exeName,
    ]
})

app.whenReady().then(() =>{
    createWindow();

    app.on('activate', function () {
        // 如果没有窗口打开，则打开一个窗口（macOS）
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    // 关闭所有窗口时退出应用（Windows，Linux）
    if (process.platform !== 'darwin') {
        app.quit()
    }
})