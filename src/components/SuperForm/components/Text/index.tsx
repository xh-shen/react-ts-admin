import React, { ForwardRefRenderFunction } from 'react'
import { Input } from 'antd'

interface FieldInputProps {
  width: number | string
  [key: string]: any
}

const FieldText: ForwardRefRenderFunction<any, FieldInputProps> = (
  { width, placeholder = '请输入', render, style, onChange, ...rest },
  ref
) => {
  const dom = (
    <Input
      style={{
        width: width,
        ...style
      }}
      placeholder={placeholder}
      {...rest}
      ref={ref}
      onChange={e => {
        onChange && onChange(e.target.value)
      }}
    />
  )
  if (render) {
    return render({ ...rest }, dom)
  }
  return dom
}

export default React.forwardRef(FieldText)
