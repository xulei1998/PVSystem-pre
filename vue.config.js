const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://192.168.31.41:3000',
  //       changeOrigin: true,
  //       pathRewrite: { '^/api': 'http://localhost:3000/api' }
  //     }
  //   }
  // }
})
