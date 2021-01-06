import React, { FC, useState, memo } from 'react'
import { Button, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form'

// import ModalForm from '@/components/ModalForm'
import { create } from '@/services/school'
import BaseForm, { FormItem, FormItemState } from '@/components/BaseForm'

interface SchoolFormProps {
  visible: boolean
  title?: string
  onCancel: () => void
}

const SchoolForm: FC<SchoolFormProps> = ({ title, visible, onCancel }) => {
  const [form, setForm] = useState<FormInstance>()
  const [formItemStateMap, setFormItemStateMap] = useState<{
    [key: string]: FormItemState
  } | null>(null)

  const formItems: FormItem[] = [
    {
      label: '学校名称',
      name: 'name'
    },
    {
      label: '学校代码',
      name: 'code'
    }
  ]

  const handleOk = () => {
    setFormItemStateMap({
      ...formItemStateMap,
      name: {
        hidden: false
      }
    })
    form && form.submit()
  }

  const onClick = () => {
    setFormItemStateMap({
      ...formItemStateMap,
      code: {
        hidden: true
      }
    })
  }

  return (
    <Modal destroyOnClose width={750} title={title} visible={visible} onCancel={onCancel} onOk={handleOk}>
      <BaseForm formItemStateMap={formItemStateMap} formInstance={form => setForm(form)} formItems={formItems} />
      <Button onClick={onClick}>测试</Button>
    </Modal>
  )
}

export default memo(SchoolForm)
