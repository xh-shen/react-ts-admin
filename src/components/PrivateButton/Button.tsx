import React, { FC } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import { useSelector } from 'react-redux'
import { StoreState } from '@/stores'

export interface PrivateButtonProps extends ButtonProps {
  label: string
  privateName?: string
}

const PrivateButton: FC<PrivateButtonProps> = ({ privateName, label, type, style, ...props }) => {
  const { buttonList } = useSelector((state: StoreState) => state.user)
  const styles = type === 'link' ? { ...style, height: 'auto', padding: 0 } : style
  return (
    <>
      {!privateName || buttonList.includes(privateName) ? (
        <Button type={type} {...props} style={styles}>
          {label}
        </Button>
      ) : null}
    </>
  )
}

export default PrivateButton
