import React, { ForwardRefRenderFunction } from 'react'
import { Radio } from 'antd'

interface FieldRadioProps {
  [key: string]: any
}

const FieldCheckbox: ForwardRefRenderFunction<any, FieldRadioProps> = ({ onChange, ...rest }, ref) => {
  return (
    <Radio
      {...rest}
      ref={ref}
      onChange={e => {
        onChange && onChange(e.target.checked)
      }}
    />
  )
}

export default React.forwardRef(FieldCheckbox)
