import React, { ForwardRefRenderFunction } from 'react'
import { Input } from 'antd'

interface FieldPasswordProps {
  width: number | string
  [key: string]: any
}

const FieldPassword: ForwardRefRenderFunction<any, FieldPasswordProps> = (
  { width, placeholder = '请输入', render, style, onChange, ...rest },
  ref
) => {
  const dom = (
    <Input.Password
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

export default React.forwardRef(FieldPassword)
