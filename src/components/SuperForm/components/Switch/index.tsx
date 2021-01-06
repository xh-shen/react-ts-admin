import React, { ForwardRefRenderFunction } from 'react'
import { Switch } from 'antd'

interface FieldSwitchProps {
  [key: string]: any
}

const FieldSwitch: ForwardRefRenderFunction<any, FieldSwitchProps> = ({ onChange, ...rest }, ref) => {
  return (
    <Switch
      {...rest}
      ref={ref}
      onChange={(checked, e) => {
        onChange && onChange(checked, e)
      }}
    />
  )
}

export default React.forwardRef(FieldSwitch)
