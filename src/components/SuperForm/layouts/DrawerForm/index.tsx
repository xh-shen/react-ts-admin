import React, { useState, FC } from 'react'
import { Drawer, Form } from 'antd'
import { FormProps } from 'antd/lib/form/Form'
import BaseForm, { CommonFormProps } from '../../BaseForm'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import { DrawerProps } from 'antd/lib/drawer'
import omit from 'omit.js'

export type DrawerFormProps = Omit<FormProps, 'onFinish'> &
  CommonFormProps & {
    // ProForm 基础表单，暂无特殊属性
    onFinish?: (formData: any) => Promise<void>

    /**
     * 受控的打开关闭
     */
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void

    drawerProps?: DrawerProps
  }

const DrawerForm: FC<DrawerFormProps> & {
  useForm: typeof Form.useForm
} = ({ onVisibleChange, drawerProps, ...rest }) => {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useMergedState<boolean>(!!rest.visible, {
    value: rest.visible,
    onChange: onVisibleChange
  })
  return (
    <BaseForm
      layout="vertical"
      submitter={{
        searchConfig: {
          submitText: '确认',
          resetText: '取消'
        },
        resetButtonProps: {
          onClick: () => {
            console.log(11)
            setVisible(false)
          }
        }
      }}
      {...omit(rest, ['visible'])}
      contentRender={(items, submitter) => {
        return (
          <Drawer
            getContainer={false}
            width={800}
            {...drawerProps}
            visible={visible}
            onClose={e => {
              setVisible(false)
              drawerProps?.onClose?.(e)
            }}
            footer={submitter}
          >
            {items}
          </Drawer>
        )
      }}
    />
  )
}

DrawerForm.useForm = Form.useForm

export default DrawerForm
