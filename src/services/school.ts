/*
 * @Author: shen
 * @Date: 2020-10-08 16:51:05
 * @LastEditors: shen
 * @LastEditTime: 2020-10-08 16:58:42
 * @Description:
 */
import request from '@/utils/request'

const apiPrefix = '/school'

export interface UserParamsType {
  pageSize?: number | undefined
  current?: number | undefined
}

export interface SchoolDataType {
  id?: string
  name: string
  code: string
  pid?: string
  sort?: number
  status?: number
}

export async function getList(params: UserParamsType) {
  return request(apiPrefix, {
    method: 'GET',
    params
  })
}

export async function create(data: SchoolDataType) {
  return request(`${apiPrefix}/create`, {
    method: 'POST',
    data
  })
}
