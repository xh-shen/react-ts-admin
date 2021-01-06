import React, { ReactElement, useRef, memo, FC, useMemo, useState, useCallback, useEffect } from 'react'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import { Form, Input } from 'antd'
import { FormProps, FormInstance } from 'antd/lib/form/Form'
import { Rule } from 'antd/lib/form'
import { TooltipProps } from 'antd/lib/tooltip'
import Submitter, { SubmitterProps } from '../components/Submitter'
import { conversionSubmitValue, useDeepCompareEffect } from '../utils'
// import useCounter, { ItemsState } from '../container'
import LabelIconTip from '../components/LabelIconTip'

export interface FieldProps {
  style?: React.CSSProperties
}

export interface FormItem {
  label: string
  name: string
  span?: number
  hidden?: boolean
  tooltip?: string
  tip?: string | TooltipProps
  rules?: Rule[]
}

export type FieldValueType =
  | 'password'
  | 'money'
  | 'textarea'
  | 'option'
  | 'date'
  | 'dateWeek'
  | 'dateMonth'
  | 'dateQuarter'
  | 'dateYear'
  | 'dateRange'
  | 'dateTimeRange'
  | 'dateTime'
  | 'time'
  | 'text'
  | 'select'
  | 'index'
  | 'indexBorder'
  | 'progress'
  | 'percent'
  | 'digit'
  | 'avatar'

export interface CommonFormProps {
  formItems: FormItem[]
  itemsStateMap?: {
    [key: string]: ItemsState
  }
  submitter?: Omit<SubmitterProps, 'form'> | false
}

export interface BaseFormProps extends FormProps, CommonFormProps {
  contentRender?: (
    items: React.ReactNode[],
    submitter: ReactElement<Omit<SubmitterProps, 'form'>> | undefined
  ) => React.ReactNode
  dateFormatter?: 'number' | 'string' | false
  formRef?: React.MutableRefObject<FormInstance | undefined>
}

export type ItemsState = {
  hidden?: boolean
}

export interface UseCounterProps {
  itemsStateMap?: {
    [key: string]: ItemsState
  }
  onItemsStateChange?: (map: { [key: string]: ItemsState }) => void
}

const genFormList = (
  items: FormItem[],
  map: {
    [key: string]: ItemsState
  }
) => {
  console.log('map', map)
  if (map && Object.keys(map).length > 0) {
    return items.map(item => {
      const { name } = item
      const config = map[name] || {}
      const tempItem = {
        ...item,
        ...config
      }
      return tempItem
    })
  }
  return [...items]
}

const FormItemRender = ({ name, tooltip, tip, label, rules = [], hidden = false }: FormItem) => {
  return (
    <Form.Item
      key={name}
      name={name}
      label={label ? <LabelIconTip label={label} tooltip={tooltip || tip} /> : undefined}
      rules={rules}
      hidden={hidden}
    >
      <Input />
    </Form.Item>
  )
}

const BaseForm: FC<BaseFormProps> = props => {
  const {
    contentRender,
    submitter,
    formItems,
    itemsStateMap,
    dateFormatter = 'string',
    form: userForm,
    formRef: propsFormRef,
    ...rest
  } = props

  const [_items, _setItems] = useState<FormItem[]>([])

  const [_itemsStateMap, _setItemsStateMap] = useMergedState<{
    [key: string]: ItemsState
  }>(itemsStateMap || {})

  const [form] = Form.useForm()
  const formRef = useRef<FormInstance>(userForm || form)
  const fieldsValueType = useRef<{
    [key: string]: FieldValueType
  }>({})
  // console.log('itemsStateMap', itemsStateMap)
  // const counter = useCounter({
  //   itemsStateMap
  // })

  // const [, updateState] = useState()
  // const forceUpdate = useCallback(() => updateState(undefined), [])

  // useDeepCompareEffect(() => {
  //   if (itemsStateMap && Object.keys(itemsStateMap).length > 0) {
  //     counter.setItemsStateMap(itemsStateMap)
  //   }
  // }, [itemsStateMap])

  const formList = useMemo(() => {
    return genFormList(formItems, _itemsStateMap)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_itemsStateMap])

  useDeepCompareEffect(() => {
    _setItems(formItems)
  }, [formItems])

  useDeepCompareEffect(() => {
    if (formList && formList.length > 0) {
      _setItems(formList)
    }
  }, [formList])

  const items = formList.map(item => FormItemRender(item))
  const submitterProps: Omit<SubmitterProps, 'form'> = typeof submitter === 'boolean' || !submitter ? {} : submitter
  const submitterNode = submitter === false ? undefined : <Submitter {...submitterProps} form={userForm || form} />
  const content = contentRender ? contentRender(items, submitterNode) : items

  return (
    <Form
      form={userForm || form}
      {...rest}
      onFinish={values => {
        if (rest.onFinish) {
          rest.onFinish(conversionSubmitValue(values, dateFormatter, fieldsValueType.current))
        }
      }}
    >
      <Form.Item noStyle shouldUpdate>
        {formInstance => {
          setTimeout(() => {
            if (propsFormRef) {
              propsFormRef.current = formInstance as FormInstance
            }
            formRef.current = formInstance as FormInstance
          }, 0)
        }}
      </Form.Item>
      {content}
    </Form>
  )
}

export default memo(BaseForm)
