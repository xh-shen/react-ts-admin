/*
 * @Author: shen
 * @Date: 2020-08-26 17:53:07
 * @LastEditors: shen
 * @LastEditTime: 2020-10-19 08:51:46
 * @Description: webpack配置
 */

const { override, addLessLoader, addWebpackAlias, fixBabelImports, addWebpackPlugin } = require('customize-cra')
const path = require('path')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')

const options = {
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './src/styles'),
  varFile: path.join(__dirname, './src/styles/var.less'),
  mainLessFile: path.join(__dirname, './src/styles/index.less'),
  themeVariables: ['@primary-color'],
  indexFileName: 'index.html',
  generateOnce: false,
}

const resolve = dir => path.join(__dirname, '.', dir)

const rewiredSourceMap = () => (config) => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
  return config
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    // modifyVars: {
    //   '@primary-color': '#13c2c2'
    // },
    javascriptEnabled: true,
  }),
  addWebpackAlias({
    '@': resolve('src')
  }),
  // addWebpackPlugin(
  //   new AntDesignThemePlugin(options)
  // ),
  rewiredSourceMap()
)
