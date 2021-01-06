import React, { ReactElement, useRef, memo, FC, useMemo, useState, ReactNode } from 'react'
import { Form } from 'antd'
import { FormProps, FormInstance } from 'antd/lib/form/Form'
import { FormItemProps, Rule } from 'antd/lib/form'
import { TooltipProps } from 'antd/lib/tooltip'
import Submitter, { SubmitterProps } from '../components/Submitter'
import { conversionSubmitValue, useDeepCompareEffect } from '../utils'
import LabelIconTip from '../components/LabelIconTip'
import Group, { GroupProps } from '../components/Group'
import { FormItemFieldProps, FieldValueType, FieldType } from '../interface'
import Field from '../components/Field'

export interface FormItem extends FormItemFieldProps {
  name: string
  label?: React.ReactNode
  hidden?: boolean
  span?: number
  tooltip?: string
  tip?: string | TooltipProps
  groups?: FormItem[]
  rules?: Rule[]
  groupProps?: GroupProps
  formItemProps?: Omit<FormItemProps, 'name' | 'label' | 'hidden' | 'rules'>
}

export interface CommonFormProps {
  formItems: FormItem[]
  itemsStateMap?: {
    [key: string]: ItemsState
  }
  submitter?: Omit<SubmitterProps, 'form'> | false
  ignoreFelidWidth?: boolean
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

const genFormList = (
  items: FormItem[],
  map: {
    [key: string]: ItemsState
  }
) => {
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

const setDefaultValueType = (type: FieldType, valueType: FieldValueType | undefined) => {
  if (!valueType) {
    if (type === 'datePicker') {
      return 'date'
    }
    if (type === 'datePickerRange') {
      return 'dateRange'
    }
    if (type === 'timePicker' || type === 'timePickerRange') {
      return 'time'
    }
    return 'text'
  }
  return valueType
}

const genFormItem = (
  { name, tooltip, tip, label, rules = [], hidden = false, formItemProps = {}, fieldProps = {}, ...rest }: FormItem,
  ignoreFelidWidth: boolean,
  setFieldValueType: any
) => {
  rest.valueType = setDefaultValueType(rest.type, rest.valueType)
  setFieldValueType(name, rest.valueType)
  const valuePropName =
    rest.type === 'checkbox' || rest.type === 'radio' || rest.type === 'switch' ? 'checked' : undefined
  return (
    <Form.Item
      key={name}
      name={name}
      label={label ? <LabelIconTip label={label} tooltip={tooltip || tip} /> : undefined}
      rules={rules}
      hidden={hidden}
      {...formItemProps}
      valuePropName={valuePropName}
    >
      <Field ignoreFelidWidth={ignoreFelidWidth} {...rest} fieldProps={fieldProps} />
    </Form.Item>
  )
}

const genFormContent = (formList: FormItem[], ignoreFelidWidth: boolean, setFieldValueType: any) => {
  return formList.map(item => {
    const { groups = [], groupProps = {}, name } = item
    if (groups?.length > 0) {
      const groupKey = `${name}-${Date.now()}`
      return (
        <Group {...groupProps} key={groupKey}>
          {groups?.map(group => genFormItem(group, ignoreFelidWidth, setFieldValueType))}
        </Group>
      )
    }
    return genFormItem(item, ignoreFelidWidth, setFieldValueType)
  })
}

const BaseForm: FC<BaseFormProps> = props => {
  const {
    contentRender,
    submitter,
    formItems,
    itemsStateMap,
    dateFormatter = 'string',
    ignoreFelidWidth = false,
    form: userForm,
    formRef: propsFormRef,
    ...rest
  } = props

  const [_items, _setItems] = useState<FormItem[]>([])

  const [form] = Form.useForm()
  const formRef = useRef<FormInstance>(userForm || form)
  const fieldsValueType = useRef<{
    [key: string]: FieldValueType
  }>({})

  useDeepCompareEffect(() => {
    _setItems(formItems)
  }, [formItems])

  const formList = useMemo(() => {
    return itemsStateMap && Object.keys(itemsStateMap).length > 0 ? genFormList(_items, itemsStateMap) : _items
  }, [_items, itemsStateMap])

  const setFieldValueType = (name: string, type?: FieldValueType) => {
    fieldsValueType.current[name] = type || 'text'
  }

  const items = genFormContent(formList, ignoreFelidWidth, setFieldValueType)
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
