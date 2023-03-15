// 导入app、BrowserWindow模块
// app 控制应用程序的事件生命周期。事件调用app.on('eventName', callback)，方法调用app.functionName(arg)
// BrowserWindow 创建和控制浏览器窗口。new BrowserWindow([options]) 事件和方法调用同app
// Electron参考文档 https://www.electronjs.org/docs
const {app, BrowserWindow, nativeImage } = require('electron')
const path = require('path')
// const url = require('url');


function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1085,
        height: 600,
        minWidth: 1100,
        minHeight: 600,
        maxWidth: 1100,
        maxHeight: 600,
        resizable: false,
        // useContentSize: true,
        title: "SkyWallpaper", // 窗口标题,如果由loadURL()加载的HTML文件中含有标签<title>，该属性可忽略
        icon: nativeImage.createFromPath('public/favicon.ico'), // "string" || nativeImage.createFromPath('public/favicon.ico')从位于 path 的文件创建新的 NativeImage 实例
        webPreferences: { // 网页功能设置
            webviewTag: true, // 是否使用<webview>标签 在一个独立的 frame 和进程里显示外部 web 内容
            webSecurity: false, // 禁用同源策略
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true // 是否启用node集成 渲染进程的内容有访问node的能力,建议设置为true, 否则在render页面会提示node找不到的错误
        }
    })


    // 加载应用 --打包react应用后，__dirname为当前文件路径
    // mainWindow.loadURL(url.format({
    //   pathname: path.join(__dirname, './build/index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }));


    // 因为我们是加载的react生成的页面，并不是静态页面
    // 所以loadFile换成loadURL。
    // 加载应用 --开发阶段  需要运行 yarn start
    mainWindow.loadURL('http://localhost:3000');

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
    mainWindow.webContents.openDevTools()
}

app.allowRendererProcessReuse =true;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() =>{
    console.log('qpp---whenready');
    createWindow();})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    console.log('window-all-closed');
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.