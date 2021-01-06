/*
 * @Author: shen
 * @Date: 2020-10-11 09:32:54
 * @LastEditors: shen
 * @LastEditTime: 2020-10-22 09:19:16
 * @Description:
 */
// import { PasswordProps, TextAreaProps, InputProps } from 'antd/lib/input'
// import { SelectProps, SelectValue } from 'antd/lib/select'
// import { CheckboxProps } from 'antd/lib/checkbox'
// import { RadioProps } from 'antd/lib/radio'
// import { DatePickerProps } from 'antd/lib/date-picker'
// import { TimePickerProps } from 'antd/lib/time-picker'
// import { CascaderProps } from 'antd/lib/cascader'
// import { InputNumberProps } from 'antd/lib/input-number'
// import { SwitchProps } from 'antd/lib/switch'
// import { TreeSelectProps } from 'antd/lib/tree-select'

export type FieldType =
  | 'group'
  | 'input'
  | 'text'
  | 'password'
  | 'textarea'
  | 'select'
  | 'digit'
  | 'money'
  | 'percent'
  | 'checkbox'
  | 'checkbox-group'
  | 'radio'
  | 'radio-group'
  | 'cascader'
  | 'switch'
  | 'datePicker'
  | 'datePickerRange'
  | 'timePicker'
  | 'timePickerRange'
  | 'treeSelect'

export type FieldValueType =
  | 'text'
  | 'date'
  | 'dateWeek'
  | 'dateMonth'
  | 'dateQuarter'
  | 'dateYear'
  | 'dateRange'
  | 'dateTimeRange'
  | 'dateTime'
  | 'time'

interface Option {
  label: string
  value: string
  disabled?: boolean
  children?: Option[]
  [key: string]: any
}

export interface FormItemFieldProps {
  type: FieldType
  valueType?: FieldValueType
  placeholder?: string | string[]
  disabled?: boolean | boolean[]
  onChange?: (value: any, value2: any, value3: any) => void
  width?: number | 's' | 'm' | 'xl' | 'xs' | 'l'
  options?: Option[] | string[]
  fieldProps?: FieldProps
  render?: ((props: RenderProps, dom: JSX.Element) => JSX.Element) | undefined
}

// type FormItemFieldPropsKeys = keyof Omit<FormItemFieldProps, 'width' | 'fieldProps' | 'type' | 'valueType' | 'render'>

// export type FieldProps = Omit<InputProps, FormItemFieldPropsKeys> &
//   Omit<PasswordProps, FormItemFieldPropsKeys | keyof InputProps> &
//   Omit<SelectProps<SelectValue>, FormItemFieldPropsKeys> &
//   Omit<CheckboxProps, FormItemFieldPropsKeys> &
//   Omit<RadioProps, FormItemFieldPropsKeys> &
//   Omit<DatePickerProps, FormItemFieldPropsKeys> &
//   Omit<TimePickerProps, FormItemFieldPropsKeys> &
//   Omit<CascaderProps, FormItemFieldPropsKeys> &
//   Omit<InputNumberProps, FormItemFieldPropsKeys> &
//   Omit<SwitchProps, FormItemFieldPropsKeys> &
//   Omit<TreeSelectProps<SelectValue>, FormItemFieldPropsKeys> &
//   Omit<TextAreaProps, FormItemFieldPropsKeys> & {
//     [key: string]: any
//   }

export interface FieldProps {
  [key: string]: any
}

export type RenderProps = Omit<FormItemFieldProps, 'fieldProps' | 'type' | 'valueType' | 'width'> & FieldProps
