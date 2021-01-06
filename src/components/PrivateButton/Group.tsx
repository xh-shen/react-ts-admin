import React, { FC, ReactElement } from 'react'
import { ButtonProps } from 'antd/lib/button/button'
import PrivateButton, { PrivateButtonProps } from './Button'
import { Space } from 'antd'

type ButtonPropsOmit = Omit<ButtonProps, 'onClick' | 'block'>

export interface PrivateButtonGroupProps extends ButtonPropsOmit {
  buttonList?: PrivateButtonProps[]
}

const genChildrenElement = (
  buttonList: PrivateButtonProps[] = [],
  children: ReactElement | ReactElement[],
  rest: ButtonPropsOmit
) => {
  if (buttonList?.length > 0) {
    return buttonList.map((item: PrivateButtonProps, index: number) => {
      const buttonProps = Object.assign({}, rest, item)
      return <PrivateButton {...buttonProps} key={index} />
    })
  } else if (children) {
    return React.Children.map(children, child =>
      React.cloneElement(child, {
        ...rest,
        ...child.props
      })
    )
  }
  return null
}

const Group: FC<PrivateButtonGroupProps> = ({ buttonList, children, ...rest }) => {
  return (
    <div style={{ display: 'inline-flex' }}>
      <Space>{genChildrenElement(buttonList, children as ReactElement, rest)}</Space>
    </div>
  )
}

export default Group
