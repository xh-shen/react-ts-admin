import React, { ForwardRefRenderFunction } from 'react'
import { Cascader } from 'antd'

interface FieldCascaderProps {
  width: number | string
  [key: string]: any
}

const FieldCascader: ForwardRefRenderFunction<any, FieldCascaderProps> = (
  { width, placeholder = '请选择', allowClear = true, render, style, onChange, ...rest },
  ref
) => {
  const dom = (
    <Cascader
      style={{
        width: width,
        ...style
      }}
      placeholder={placeholder}
      allowClear={allowClear}
      {...rest}
      ref={ref}
      onChange={(value, selectedOptions: any) => {
        onChange && onChange(value, selectedOptions)
      }}
    ></Cascader>
  )
  if (render) {
    return render({ ...rest }, dom)
  }
  return dom
}

export default React.forwardRef(FieldCascader)
