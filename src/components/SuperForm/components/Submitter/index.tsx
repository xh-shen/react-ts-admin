import React from 'react'
import { FormInstance } from 'antd/lib/form'
import { Button, Space } from 'antd'
import { ButtonProps } from 'antd/lib/button'

/**
 * 用于配置操作栏
 */
export interface SearchConfig {
  /**
   * 重置按钮的文本
   */
  resetText?: React.ReactNode
  /**
   * 提交按钮的文本
   */
  submitText?: React.ReactNode
}

export interface SubmitterProps {
  form: FormInstance
  onSubmit?: () => void
  onReset?: () => void
  /**
   * 搜索的配置，一般用来配置文本
   */
  searchConfig?: SearchConfig
  /**
   * 提交按钮的 props
   */
  submitButtonProps?: ButtonProps
  /**
   * 重置按钮的 props
   */
  resetButtonProps?: ButtonProps
  /**
   * 自定义操作的渲染的渲染
   */
  render?: ((props: SubmitterProps, dom: JSX.Element[]) => React.ReactNode[] | React.ReactNode | false) | false
}

/**
 * FormFooter 的组件，可以自动进行一些配置
 * @param props
 */
const Submitter: React.FC<SubmitterProps> = props => {
  if (props.render === false) {
    return null
  }

  const { form, onSubmit, render, onReset, searchConfig = {}, submitButtonProps, resetButtonProps } = props

  const { submitText = '提交', resetText = '重置' } = searchConfig
  /**
   * 默认的操作的逻辑
   */
  const dom = [
    <Button
      {...resetButtonProps}
      key="rest"
      onClick={e => {
        form.resetFields()
        onReset?.()
        resetButtonProps?.onClick?.(e)
      }}
    >
      {resetText}
    </Button>,
    <Button
      {...submitButtonProps}
      key="submit"
      type="primary"
      onClick={e => {
        form.submit()
        onSubmit?.()
        submitButtonProps?.onClick?.(e)
      }}
    >
      {submitText}
    </Button>
  ]

  const renderDom = render ? render(props, dom) : dom
  if (!renderDom) {
    return null
  }
  if (Array.isArray(renderDom)) {
    if (renderDom?.length < 1) {
      return null
    }
    return <Space>{renderDom}</Space>
  }
  return renderDom as JSX.Element
}

export default Submitter
