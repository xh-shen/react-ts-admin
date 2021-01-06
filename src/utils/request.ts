import { REFRESH_TOKEN, ACCESS_TOKEN } from '@/constants'
/*
 * @Author: shen
 * @Date: 2020-09-19 21:25:37
 * @LastEditors: shen
 * @LastEditTime: 2020-10-06 13:25:45
 * @Description: request
 */
import { extend } from 'umi-request'
import { notification } from 'antd'
// import store from '@/stores'
// import { logoutAsync } from '@/stores/actions/user.action'
import config from '@/config'
import { refreshTokens } from '@/services/passport'
import { getToken, saveTokens, removeToken } from '@/utils/cookie'

const codeMessage: { [prop: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

let isRefreshing = false
let errRequestCache: any = []

/**
 * 异常处理程序
 */
const errorHandler = async (error: any) => {
  const response = error.response
  const data = error.data
  const config = error.request
  if (response && response.status) {
    const errorText = data?.message ? data.message : codeMessage[response.status] || response.statusText
    if (response.status === 401) {
      if (data.code === 10051) {
        if (!isRefreshing) {
          isRefreshing = true
          refreshTokens()
            .then(res => {
              const {
                data: { accessToken, refreshToken }
              } = res
              saveTokens(accessToken, refreshToken)
              errRequestCache.forEach((cb: any) => cb())
              errRequestCache = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }
        return new Promise(resolve => {
          errRequestCache.push(() => {
            resolve(request(config.url, { ...config, prefix: '' }))
          })
        })
      } else {
        removeToken()
        notification.error({
          message: '提示',
          description: errorText
        })
        window.location.href = '/login'
      }
    } else {
      notification.error({
        message: '提示',
        description: errorText
      })
    }
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常'
    })
  }
  return Promise.reject(data)
}

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix: config.prefixUrl,
  timeout: 300000,
  errorHandler, // 默认错误处理
  credentials: 'include' // 默认请求是否带上cookie
})

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  let headers = {}
  if (url === config.refreshTokenUrl) {
    const refreshToken = getToken(REFRESH_TOKEN)
    if (refreshToken) {
      headers = {
        ...options.headers,
        Authorization: refreshToken
      }
    }
  } else {
    // 有access_token
    const accessToken = getToken(ACCESS_TOKEN)
    if (accessToken) {
      headers = {
        ...options.headers,
        Authorization: accessToken
      }
    }
  }
  return {
    url,
    options: { ...options, headers }
  }
})

request.interceptors.response.use(async response => {
  const data = await response.clone().json()
  return !response.status.toString().startsWith('20') ? response : data
})

export default request
