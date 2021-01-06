/*
 * @Author: shen
 * @Date: 2020-09-20 09:34:06
 * @LastEditors: shen
 * @LastEditTime: 2020-10-04 20:47:29
 * @Description: cookie
 */
import Cookies from 'js-cookie'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '@/constants'

/**
 * 存储tokens
 * @param {string} accessToken
 * @param {string} refreshToken
 */
export function saveTokens(accessToken: string, refreshToken: string): void {
  Cookies.set(ACCESS_TOKEN, `Bearer ${accessToken}`)
  Cookies.set(REFRESH_TOKEN, `Bearer ${refreshToken}`)
}

/**
 * 存储access_token
 * @param {string} accessToken
 */
export function saveAccessToken(accessToken: string): void {
  Cookies.set(ACCESS_TOKEN, `Bearer ${accessToken}`)
}

/**
 * 获得某个token
 * @param {string} tokenKey
 */
export function getToken(tokenKey: string): string {
  return Cookies.get(tokenKey) as string
}

/**
 * 移除token
 */
export function removeToken(): void {
  Cookies.remove(ACCESS_TOKEN)
  Cookies.remove(REFRESH_TOKEN)
}
