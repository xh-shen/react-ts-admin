/*
 * @Author: shen
 * @Date: 2020-09-14 08:38:14
 * @LastEditors: shen
 * @LastEditTime: 2020-10-06 11:03:58
 * @Description: global config
 */

interface Config {
  title: string
  prefixUrl: string
  prefixCls: string
  baseUrl: string
  refreshTokenUrl: string
}

const config: Config = {
  title: '星瀚艺术CMS管理系统',
  prefixCls: 'xh-cms',
  prefixUrl: '/api',
  baseUrl: '/api',
  refreshTokenUrl: '/api/passport/user/refresh'
}

export default config
