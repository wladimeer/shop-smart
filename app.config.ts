import 'ts-node/register'
import { APP_VARIANT } from './constants/config'
import { ExpoConfig } from 'expo/config'

const config: ExpoConfig = {
  name: 'Nuvli',
  slug: 'shop-smart',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  backgroundColor: '#000000',
  userInterfaceStyle: 'dark',
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'io.expo.client'
  },
  androidStatusBar: {
    translucent: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#000000'
    },
    package: 'com.bencart_dev.shopsmart'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: [
    'expo-updates',
    [
      'expo-font',
      {
        fonts: ['./fonts/SedanSC-Regular.ttf', './fonts/RedditSansCondensed-Regular.ttf']
      }
    ]
  ],
  extra: {
    eas: {
      projectId: 'ebcd38eb-891a-4c6d-9317-fa2e79f4bd70'
    },
    appVariant: APP_VARIANT
  },
  updates: {
    url: 'https://u.expo.dev/ebcd38eb-891a-4c6d-9317-fa2e79f4bd70'
  },
  runtimeVersion: {
    policy: 'appVersion'
  }
}

export default config
