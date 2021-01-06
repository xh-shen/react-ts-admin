import React, { FC, useRef } from 'react'
import ModalForm from '@/components/ModalForm'
import { create } from '@/services/school'

interface SchoolFormProps {
  visible: boolean
  title?: string
  onCancel: () => void
}

const SchoolForm: FC<SchoolFormProps> = ({ title, visible, onCancel }) => {
  const formRef = useRef()
  console.log(formRef)
  const onSuccess = () => {
    console.log(formRef)
  }
  return (
    <ModalForm
      formName="schoolForm"
      title={title}
      cRef={formRef}
      visible={visible}
      request={() => {
        console.log(111)
      }}
      onSuccess={onSuccess}
      onCancel={onCancel}
    />
  )
}

export default SchoolForm
