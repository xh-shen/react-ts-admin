/*
 * @Author: shen
 * @Date: 2020-08-26 17:53:07
 * @LastEditors: shen
 * @LastEditTime: 2020-10-06 15:11:04
 * @Description: user reducer
 */
import { UserActions } from '../actions/user.action'
import { UserState, UserInfo } from '../types/user.type'
import { SETUSERITEM, SETUSERMENU, CLEARUSERMENU, SETUSERINFO, SETLOGINSTATUS } from '../constants/user.constant'

const homeMenu = {
  id: 'a',
  pid: '',
  name: 'dashboard',
  title: '首页',
  icon: 'DashboardOutlined',
  path: '/dashboard'
}

const userState: UserState = {
  logged: localStorage.getItem('t') ? true : false,
  menuList: [],
  buttonList: ['create-school', 'create-user'],
  userInfo: {} as UserInfo
}

export const userReducer = (state = userState, actions: UserActions): UserState => {
  switch (actions.type) {
    case SETUSERITEM:
      return { ...state, ...actions.payload }
    case SETLOGINSTATUS:
      return { ...state, logged: actions.payload }
    case SETUSERINFO:
      return { ...state, userInfo: actions.payload }
    case SETUSERMENU:
      return { ...state, menuList: [homeMenu, ...actions.payload] }
    case CLEARUSERMENU:
      return { ...state, menuList: [] }
    default:
      return state
  }
}
