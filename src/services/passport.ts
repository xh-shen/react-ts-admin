/*
 * @Author: shen
 * @Date: 2020-09-19 21:48:56
 * @LastEditors: shen
 * @LastEditTime: 2020-10-08 16:55:52
 * @Description: passport user service
 */
import request from '@/utils/request'

export interface LoginParamsType {
  username: string
  password: string
  code: string
  uuid: string
}

export async function login(data: LoginParamsType) {
  return request('/passport/user/login', {
    method: 'POST',
    data
  })
}

export async function getImgCode() {
  return request('/passport/user/code', {
    method: 'GET'
  })
}

export async function refreshTokens() {
  return request('/passport/user/refresh', {
    method: 'GET'
  })
}

export async function getUserInformation() {
  return request('/passport/user/information', {
    method: 'GET'
  })
}
