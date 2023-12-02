import platform
import sys
import os

# 设置壁纸
def set_wallpaper(wallpaper_url):
    system = platform.system()
    status = ""
    if system == "Windows":
        # TODO: 设置 windows 壁纸
        status = "success"
    elif system == "Darwin":
        # TODO: 设置 mac 壁纸
         status = "success"
    elif system == "Linux":
        # TODO: 设置 linux 壁纸
         status = "success"
    else:
         status = "error"

    print(status)
    sys.stdout.flush()

def main():
    # 接收数据
    wallpaper_url = sys.argv[1]
    # 设置壁纸
    set_wallpaper(wallpaper_url)

if __name__ == "__main__":
    main()
