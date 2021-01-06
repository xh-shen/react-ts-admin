/*
 * @Author: shen
 * @Date: 2020-09-19 21:48:56
 * @LastEditors: shen
 * @LastEditTime: 2020-10-08 16:55:11
 * @Description: user service
 */
import request from '@/utils/request'

export interface UserParamsType {
  pageSize?: number | undefined
  current?: number | undefined
}

export async function getUserList(params: UserParamsType) {
  return request('/users', {
    method: 'GET',
    params
  })
}
