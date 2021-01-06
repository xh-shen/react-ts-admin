import React, { ForwardRefRenderFunction } from 'react'
import { InputNumber } from 'antd'

interface FieldDigitProps {
  width: number | string
  [key: string]: any
}

const FieldDigit: ForwardRefRenderFunction<any, FieldDigitProps> = (
  { width, render, style, precision = 2, step = 1, onChange, ...rest },
  ref
) => {
  const dom = (
    <InputNumber
      style={{
        width: width,
        ...style
      }}
      min={0}
      precision={precision}
      step={step}
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

export default React.forwardRef(FieldDigit)
