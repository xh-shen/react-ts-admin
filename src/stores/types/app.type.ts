/*
 * @Author: shen
 * @Date: 2020-09-15 08:28:34
 * @LastEditors: shen
 * @LastEditTime: 2020-09-16 19:47:14
 * @Description: app types
 */

import { Device } from '@/interface/layout/index.interface'

export enum MenuMode {
  TOP = 'top',
  SIDE = 'side'
}

export enum SiteTheme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum Locale {
  ZH_CN = 'zh_CN',
  EN_US = 'en_US'
}

export interface AppState {
  /** user's device */
  device: Device

  /** menu collapsed status */
  collapsed: boolean

  /** notification count */
  noticeCount: number

  /** user's language */
  locale: Locale

  /** Is first time to view the site ? */
  newUser: boolean

  /** menu mode **/
  menuMode: MenuMode

  /** site theme **/
  siteTheme: SiteTheme

  /** is fixed header **/
  fixedHeader: boolean

  /** is fixed menu **/
  fixedMenu: boolean
}
