/*
 * @Author: shen
 * @Date: 2020-08-26 17:53:07
 * @LastEditors: shen
 * @LastEditTime: 2020-09-15 08:29:30
 * @Description: app action
 */
import { Action } from 'redux'
import { SETAPPITEM } from '../constants/app.constant'
import { AppState } from '../types/app.type'

interface SetAppItem extends Action<SETAPPITEM> {
  payload: Partial<AppState>
}

export const setAppItem = (payload: Partial<AppState>): SetAppItem => ({
  type: SETAPPITEM,
  payload
})

export type AppActions = SetAppItem
