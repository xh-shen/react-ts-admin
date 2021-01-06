import React, { FC } from 'react'
import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'

const BaseModal: FC<ModalProps> = ({ width = 700, children, ...restProps }) => {
  return (
    <Modal width={width} {...restProps}>
      {children}
    </Modal>
  )
}

export default BaseModal
