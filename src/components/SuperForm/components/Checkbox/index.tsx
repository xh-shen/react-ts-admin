import React, { ForwardRefRenderFunction } from 'react'
import { Checkbox } from 'antd'

interface FieldCheckboxProps {
  [key: string]: any
}

const FieldCheckbox: ForwardRefRenderFunction<any, FieldCheckboxProps> = ({ onChange, ...rest }, ref) => {
  return (
    <Checkbox
      {...rest}
      ref={ref}
      onChange={e => {
        onChange && onChange(e.target.checked)
      }}
    />
  )
}

export default React.forwardRef(FieldCheckbox)
