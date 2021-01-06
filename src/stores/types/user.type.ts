/*
 * @Author: shen
 * @Date: 2020-09-24 21:00:43
 * @LastEditors: shen
 * @LastEditTime: 2020-10-06 15:09:59
 * @Description: user type
 */
export interface MenuItem {
  id: string
  pid: string
  name: string
  title: string
  icon?: string
  path: string
  children?: MenuItem[]
}

export type MenuChild = Omit<MenuItem, 'children'>

export type MenuList = MenuItem[]

export interface UserInfo {
  id: string
  username: string
  nickname: string
  avatar: string
  email: string
  version: number
}

export interface UserState {
  userInfo: UserInfo
  menuList: MenuList
  buttonList: string[]
  logged: boolean
}
