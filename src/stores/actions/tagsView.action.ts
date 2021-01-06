/*
 * @Author: shen
 * @Date: 2020-08-26 17:53:07
 * @LastEditors: shen
 * @LastEditTime: 2020-09-13 11:03:35
 * @Description: tags view action
 */
import { Action } from 'redux'
import { SETACTIVETAG, ADDTAG, REMOVETAG, REMOVEALLTAG, REMOVEOTHERTAG } from '../constants/tagsView.constant'
import { TagItem } from '@/interface/layout/tagsView.interface'

interface SetActiveTag extends Action<SETACTIVETAG> {
  payload: TagItem['id']
}
interface AddTag extends Action<ADDTAG> {
  payload: TagItem
}
interface RemoveTag extends Action<REMOVETAG> {
  payload: TagItem['id']
}
interface RemoveAllTag extends Action<REMOVEALLTAG> {}
interface RemoveOtherTag extends Action<REMOVEOTHERTAG> {}

export const setActiveTag = (payload: string): SetActiveTag => ({
  type: SETACTIVETAG,
  payload
})

export const addTag = (payload: AddTag['payload']): AddTag => ({
  type: ADDTAG,
  payload
})

export const removeTag = (payload: string): RemoveTag => ({
  type: REMOVETAG,
  payload
})

export const removeAllTag = (): RemoveAllTag => ({
  type: REMOVEALLTAG
})

export const removeOtherTag = (): RemoveOtherTag => ({
  type: REMOVEOTHERTAG
})

export type TagsActions = SetActiveTag | AddTag | RemoveTag | RemoveAllTag | RemoveOtherTag
