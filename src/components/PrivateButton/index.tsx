import { FC } from 'react'
import Button, { PrivateButtonProps } from './Button'
import Group, { PrivateButtonGroupProps } from './Group'

// eslint-disable-next-line prettier/prettier
export type {
  PrivateButtonProps,
  PrivateButtonGroupProps
}

export type PrivateButtonType = FC<PrivateButtonProps> & {
  Group: FC<PrivateButtonGroupProps>,
}

const PrivateButton = Button as PrivateButtonType

PrivateButton.Group = Group

export default PrivateButton
