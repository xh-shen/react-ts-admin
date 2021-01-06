/*
 * @Author: shen
 * @Date: 2020-10-08 17:37:15
 * @LastEditors: shen
 * @LastEditTime: 2020-10-08 21:12:46
 * @Description:
 */
import { FormInstance, Rule } from 'antd/lib/form'

export interface FormItem {
  label: string
  name: string
  span?: number
  hidden?: boolean
  rules?: Rule[]
}

export interface BaseFormProps {
  formInstance?: (form: FormInstance) => void
  formItems: FormItem[]
  span?: number
  formItemStateMap?: {
    [key: string]: Partial<FormItem>
  } | null
}
