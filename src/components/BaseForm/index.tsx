import React, { FC, useEffect, memo, useState, useCallback, useMemo } from 'react'
import { Form, Input, Button, InputNumber, Row, Col } from 'antd'
import { cloneDeepWith } from 'lodash'
import { BaseFormProps, FormItem as FormItemType } from './types'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const FormItemRender = ({ name, label, rules = [], hidden = false }: FormItemType) => {
  return (
    <Form.Item name={name} label={label} rules={rules} hidden={hidden}>
      <Input />
    </Form.Item>
  )
}

const BaseForm: FC<BaseFormProps> = ({ formInstance, formItemStateMap, span = 8, formItems }) => {
  const [items, setItems] = useState<FormItemType[]>([])
  const [form] = Form.useForm()
  // let _items: FormItemType[] = []
  useEffect(() => {
    setItems(cloneDeepWith(formItems))
  }, [])
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const initFormItemCol = () => {
    if (!items?.length) {
      return null
    }
    return items.map(item => {
      return (
        <Col span={item.span || span} key={item.name} style={{ display: !item.hidden ? 'block' : 'none' }}>
          {FormItemRender(item)}
        </Col>
      )
    })
  }

  const setFormItemState = useCallback(() => {
    if (formItemStateMap) {
      for (const name in formItemStateMap) {
        const index = items.findIndex(item => item.name === name)
        if (index > -1) {
          items[index] = { ...items[index], ...formItemStateMap[name] }
        }
      }
    }
    setItems(items)
  }, [formItemStateMap, items])
  useEffect(() => {
    setFormItemState()
  })

  useEffect(() => {
    formInstance && formInstance(form)
  }, [form, formInstance])

  return (
    <Form
      form={form}
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={20}>{initFormItemCol()}</Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export declare type FormItem = FormItemType
export declare type FormItemState = Partial<FormItemType>

export default memo(BaseForm)
