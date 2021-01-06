/*
 * @Author: shen
 * @Date: 2020-08-26 17:53:07
 * @LastEditors: shen
 * @LastEditTime: 2020-09-16 19:47:27
 * @Description: app reducer
 */
import { AppActions } from '../actions/app.action'
import { AppState, Locale, MenuMode, SiteTheme } from '../types/app.type'
import { SETAPPITEM } from '../constants/app.constant'
import { getGlobalState } from '@/utils/getGloabal'

const appState: AppState = {
  ...getGlobalState(),
  noticeCount: 99,
  locale: (localStorage.getItem('locale')! || Locale.ZH_CN) as Locale,
  newUser: JSON.parse(localStorage.getItem('newUser')!) ?? true,
  menuMode: (localStorage.getItem('menuMode')! || MenuMode.SIDE) as MenuMode,
  siteTheme: (localStorage.getItem('siteTheme')! || SiteTheme.LIGHT) as SiteTheme,
  fixedHeader: JSON.parse(localStorage.getItem('fixedHeader')!) ?? true,
  fixedMenu: JSON.parse(localStorage.getItem('fixedMenu')!) ?? true
}

export const appReducer = (state = appState, actions: AppActions): AppState => {
  switch (actions.type) {
    case SETAPPITEM:
      return { ...state, ...actions.payload }
    default:
      return state
  }
}
