import platform
import requests
import sys
import os
import getpass
import subprocess

# 设置壁纸
def set_wallpaper(wallpaper_url):
    system = platform.system()     # 获取系统名
    user_name = getpass.getuser()  # 获取用户名
    response = requests.get(wallpaper_url)

    # 设置壁纸
    if system == "Windows":
        printStatus("暂不支持 Windows")
    elif system == "Darwin":
        dir_path = "/Users/" + user_name + "/Pictures/云开壁纸/"
        if not os.path.exists(dir_path):
            os.mkdir(dir_path)
        image_path = dir_path + "currentWallpaper" + ".jpeg"

        if response.status_code == 200:
            with open(image_path, "wb") as f:
                f.write(response.content)
                printStatus("图片下载成功")

            script = "tell application \"Finder\" to set desktop picture to POSIX file \"%s\""%image_path
            result = subprocess.run(["osascript", "-e", script], stdout=subprocess.PIPE)
            if result.returncode == 0:
                printStatus("壁纸设置成功")
            else:
                printStatus("壁纸设置失败")
        else:
            printStatus("图片获取失败")
    elif system == "Linux":
        printStatus("暂不支持 Linux")
    else:
        printStatus("暂不支持未知的操作系统")

    sys.stdout.flush()

def printStatus(value):
    status = value
    print(status)

def main():
    # 接收数据
    wallpaper_url = sys.argv[1]
#     wallpaper_url = "https://images.unsplash.com/photo-1600686067402-995d22a7aabc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMDIwODF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDU0NTYzNjd8&ixlib=rb-4.0.3&q=80&w=1080"
    # 设置壁纸
    set_wallpaper(wallpaper_url)

if __name__ == "__main__":
    main()
