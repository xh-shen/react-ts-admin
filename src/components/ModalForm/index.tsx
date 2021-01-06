import React, { FC, useState, useEffect, useRef, useImperativeHandle } from 'react'
import { Col, Form, Input, InputNumber, Row, notification } from 'antd'
import BaseModal from '../BaseModal'

interface ModalFormProps {
  visible: boolean
  title?: string
  formName?: string
  span?: number
  cRef?: any
  request: () => void
  onCancel: () => void
  onSuccess?: () => void
}

const useResetFormOnCloseModal = ({ form, visible }: any) => {
  const prevVisibleRef = useRef()
  useEffect(() => {
    prevVisibleRef.current = visible
  }, [visible])
  const prevVisible = prevVisibleRef.current

  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])
}

const ModalForm: FC<ModalFormProps> = ({ title, visible, span = 12, cRef, onCancel, onSuccess, formName }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm()
  const modalProps = {
    title,
    visible,
    onCancel
  }

  useImperativeHandle(cRef, () => ({
    //getForm就是暴露给父组件的方法
    getForm: () => form
  }))

  useResetFormOnCloseModal({
    form,
    visible
  })

  const handleOk = async () => {
    form.submit()
  }

  const onFinish = (values: any) => {
    setConfirmLoading(true)
    setTimeout(() => {
      setConfirmLoading(false)
      notification.success({
        message: '提示',
        description: '操作成功'
      })
      onSuccess && onSuccess()
      // onCancel()
    }, 3000)
    console.log('Success:', values)
  }

  return (
    <BaseModal
      confirmLoading={confirmLoading}
      cancelButtonProps={{ disabled: confirmLoading }}
      maskClosable={false}
      keyboard={false}
      closable={false}
      onOk={handleOk}
      {...modalProps}
    >
      <Form form={form} name={formName || 'modalForm'} onFinish={onFinish}>
        <Row gutter={20}>
          <Col span={span}>
            <Form.Item name="name" label="User Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={span}>
            <Form.Item name="age" label="User Age" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  )
}

export default ModalForm
