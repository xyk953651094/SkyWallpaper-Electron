module.exports = {
  packagerConfig: {
    icon: './src/assets/logo',
    appVersion: '1.0.0',
    name: '云开壁纸',
    win32metadata: {
      'ProductName': '云开壁纸',
      'CompanyName': '待看云开',
      'FileDescription': '云开壁纸',
    }
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'win32'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
