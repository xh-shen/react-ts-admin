import React, { ForwardRefRenderFunction } from 'react'
import { TreeSelect } from 'antd'

interface FieldTreeSelectProps {
  width: number | string
  [key: string]: any
}

const FieldTreeSelect: ForwardRefRenderFunction<any, FieldTreeSelectProps> = (
  { width, placeholder = '请选择', allowClear = true, render, options, style, onChange, ...rest },
  ref
) => {
  const dom = (
    <TreeSelect
      style={{
        width: width,
        ...style
      }}
      placeholder={placeholder}
      allowClear={allowClear}
      {...rest}
      treeData={options}
      ref={ref}
      onChange={(value, label, extra) => {
        onChange && onChange(value, label, extra)
      }}
    ></TreeSelect>
  )
  if (render) {
    return render({ ...rest }, dom)
  }
  return dom
}

export default React.forwardRef(FieldTreeSelect)
