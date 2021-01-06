/*
 * @Author: shen
 * @Date: 2020-08-26 17:53:07
 * @LastEditors: shen
 * @LastEditTime: 2020-10-20 09:51:28
 * @Description: 代理跨域配置
 */
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    })
  )
  app.use(
    proxy('/iframe', {
      target: 'http://0.0.0.0:8080/',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/iframe': '/'
      // }
    })
  )
}
