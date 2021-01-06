/*
 * @Author: shen
 * @Date: 2020-08-26 17:53:07
 * @LastEditors: shen
 * @LastEditTime: 2020-09-18 13:28:56
 * @Description:
 */
export type TagItem = {
  id: string

  title: string

  /** tag's route path */
  path: string

  /** can be closed ? */
  closable: boolean
}

export interface TagState {
  /** tagsView list */
  tags: TagItem[]

  /**current tagView id */
  activeTagId: TagItem['id']
}
