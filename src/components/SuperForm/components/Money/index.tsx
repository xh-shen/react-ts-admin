import React, { ForwardRefRenderFunction } from 'react'
import { InputNumber } from 'antd'

interface FieldMoneyProps {
  width: number | string
  [key: string]: any
}

const FieldMoney: ForwardRefRenderFunction<any, FieldMoneyProps> = (
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
      precision={2}
      formatter={value => {
        if (value) {
          return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        return ''
      }}
      parser={value => (value ? value.replace(new RegExp(`\\￥\\s?|(,*)`, 'g'), '') : '')}
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

export default React.forwardRef(FieldMoney)
