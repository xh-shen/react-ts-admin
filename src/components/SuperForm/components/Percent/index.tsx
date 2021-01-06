import React, { ForwardRefRenderFunction } from 'react'
import { InputNumber } from 'antd'

interface FieldPercentProps {
  width: number | string
  [key: string]: any
}

const FieldPercent: ForwardRefRenderFunction<any, FieldPercentProps> = (
  { width, render, style, onChange, ...rest },
  ref
) => {
  const dom = (
    <InputNumber
      style={{
        width: width,
        ...style
      }}
      min={0}
      max={100}
      formatter={value => `${value}%`}
      parser={value => (value ? value.replace('%', '') : '')}
      {...rest}
      ref={ref}
      onChange={value => {
        onChange && onChange(value)
      }}
    />
  )
  if (render) {
    return render({ ...rest }, dom)
  }
  return dom
}

export default React.forwardRef(FieldPercent)
