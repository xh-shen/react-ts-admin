/*
 * @Author: shen
 * @Date: 2020-08-26 17:53:07
 * @LastEditors: shen
 * @LastEditTime: 2020-10-04 21:51:24
 * @Description: user action
 */
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { apiLogout } from '@/api/user.api'
import { login, getUserInformation, LoginParamsType } from '@/services/passport'
import { getMenuList } from '@/api/layout.api'
import { StoreState } from '@/stores'
import { UserState, MenuList, UserInfo } from '../types/user.type'
import { SETUSERITEM, SETUSERMENU, CLEARUSERMENU, SETUSERINFO, SETLOGINSTATUS } from '../constants/user.constant'
import { getToken, saveTokens, removeToken } from '@/utils/cookie'
import { ACCESS_TOKEN } from '@/constants'

interface SetUserItem extends Action<SETUSERITEM> {
  payload: Partial<UserState>
}

interface SetLoginStatus extends Action<SETLOGINSTATUS> {
  payload: boolean
}

interface SetUserMenu extends Action<SETUSERMENU> {
  payload: MenuList
}

interface SetUserInfo extends Action<SETUSERINFO> {
  payload: UserInfo
}

interface ClearUserMenu extends Action<CLEARUSERMENU> {}

export const setUserItem = (payload: Partial<UserState>): SetUserItem => ({
  type: SETUSERITEM,
  payload
})

export const setLoginStatus = (payload: boolean): SetLoginStatus => ({
  type: SETLOGINSTATUS,
  payload
})

export const setUserMenu = (payload: MenuList): SetUserMenu => ({
  type: SETUSERMENU,
  payload
})

export const setUserInfo = (payload: UserInfo): SetUserInfo => ({
  type: SETUSERINFO,
  payload
})

export const clearUserMenu = (): ClearUserMenu => ({
  type: CLEARUSERMENU
})

export type UserActions = SetUserItem | SetUserMenu | ClearUserMenu | SetUserInfo | SetLoginStatus

export const loginAsync = (payload: LoginParamsType): ThunkAction<Promise<boolean>, StoreState, null, SetUserItem> => {
  return async () => {
    const { code, data } = await login(payload)
    if (code === 200) {
      saveTokens(data.accessToken, data.refreshToken)
      return true
    }
    return false
  }
}

export const logoutAsync = (): ThunkAction<Promise<boolean>, StoreState, null, ClearUserMenu> => {
  return async dispatch => {
    const { status } = await apiLogout({ token: getToken(ACCESS_TOKEN)! })
    if (status) {
      removeToken()
      dispatch(clearUserMenu())
      return true
    }
    return false
  }
}

export const getMenuAsync = (): ThunkAction<Promise<boolean>, StoreState, null, SetUserMenu> => {
  return async dispatch => {
    const { result, status } = await getMenuList()
    if (status) {
      dispatch(setUserMenu(result))
      return true
    }
    return false
  }
}

export const getUserInfoAsync = (): ThunkAction<Promise<boolean>, StoreState, null, SetUserInfo | SetLoginStatus> => {
  return async dispatch => {
    const { code, data } = await getUserInformation()
    if (code === 200) {
      dispatch(setLoginStatus(true))
      dispatch(setUserInfo(data))
      return true
    }
    return false
  }
}
