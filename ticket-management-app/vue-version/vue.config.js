const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3001
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})