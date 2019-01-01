const electronBuilder = require('electron-builder');

const paths = require('./paths');
const Platform = electronBuilder.Platform;

const appConfig = require(paths.APP_CONFIG);

electronBuilder.build({
  targets: Platform.MAC.createTarget(),
  projectDir: paths.ROOT,
  config: {
    productName: appConfig.productName || 'Electron React',
    appId: 'com.electron.react',
    extraResources: [
      {
        from: paths.RESOURCES_MAC,
        to: './bin/',
        filter: ['electronapp*']
      }
    ],
    mac: {
      category: 'public.app-category.developer-tools',
      entitlements: paths.RESOURCES_PLIST,
      target: ['zip', 'dmg']
    },
    dmg: {
      contents: [
        {
          x: 130,
          y: 220
        },
        {
          x: 410,
          y: 220,
          type: 'link',
          path: '/Applications'
        }
      ]
    },
    directories: {
      app: paths.ROOT,
      buildResources: 'resources',
      output: 'release'
    }
  }
});
