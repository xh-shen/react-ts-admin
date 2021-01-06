import React, { ForwardRefRenderFunction } from 'react'
import { Input } from 'antd'

interface FieldTextareaProps {
  width: number | string
  [key: string]: any
}

const FieldTextarea: ForwardRefRenderFunction<any, FieldTextareaProps> = (
  { width, placeholder = '请输入', render, onChange, style, ...rest },
  ref
) => {
  const dom = (
    <Input.TextArea
      style={{
        width: width,
        ...style
      }}
      placeholder={placeholder}
      {...rest}
      showCount={false}
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

export default React.forwardRef(FieldTextarea)
