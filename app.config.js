import { APP_VARIANT, FREE_VARIANT } from './constants/config'

const config = {
  name: APP_VARIANT === FREE_VARIANT ? 'ShopSmart' : 'ShopSmartPro',
  slug: 'shop-smart',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  backgroundColor: '#000000',
  userInterfaceStyle: 'dark',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#000000'
  },
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
  }
}

export default config
