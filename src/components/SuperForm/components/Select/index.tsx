import React, { ForwardRefRenderFunction } from 'react'
import { Select } from 'antd'

interface FieldSelectProps {
  width: number | string
  [key: string]: any
}

const FieldSelect: ForwardRefRenderFunction<any, FieldSelectProps> = (
  { width, placeholder = '请选择', allowClear = true, mode = '', render, style, onChange, ...rest },
  ref
) => {
  const dom = (
    <Select
      style={{
        width: width,
        ...style
      }}
      placeholder={placeholder}
      allowClear={allowClear}
      mode={mode}
      {...rest}
      ref={ref}
      // options={}
      onChange={value => {
        onChange && onChange(value)
      }}
    ></Select>
  )
  if (render) {
    return render({ ...rest }, dom)
  }
  return dom
}

export default React.forwardRef(FieldSelect)
