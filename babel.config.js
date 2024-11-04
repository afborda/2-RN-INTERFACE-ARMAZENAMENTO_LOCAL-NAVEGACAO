module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@routes': './src/routes',
            '@config': './src/config',
            '@constants': './src/constants',
            '@context': './src/context',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@storage': './src/storage',
            '@services': './src/services',
            '@theme': './src/theme',
            '@utils': './src/utils',
            '@types': './src/types'
          }
        }
      ]
    ]
  }
}
