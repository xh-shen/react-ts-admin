import React, { useState, FC } from 'react'
import { Form } from 'antd'
import { FormProps } from 'antd/lib/form/Form'
import BaseForm, { CommonFormProps } from '../../BaseForm'

export interface StandardFormProps extends FormProps, CommonFormProps {
  // StandardForm 基础表单，暂无特殊属性
  onFinish?: (formData: any) => Promise<void>
}

const StandardForm: FC<StandardFormProps> & {
  useForm: typeof Form.useForm
} = props => {
  const [loading, setLoading] = useState(false)
  return (
    <BaseForm
      layout="vertical"
      submitter={{
        submitButtonProps: {
          loading
        },
        // 反转按钮，在正常模式下，按钮应该是主按钮在前
        render: (_, dom) => dom.reverse()
      }}
      contentRender={(items, submitter) => {
        return (
          <>
            {items}
            {submitter}
          </>
        )
      }}
      {...props}
      onFinish={async formData => {
        if (props.onFinish) {
          setLoading(true)
          await props.onFinish(formData)
          setLoading(false)
        }
      }}
    />
  )
}

StandardForm.useForm = Form.useForm

export default StandardForm
