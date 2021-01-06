import React, { ForwardRefRenderFunction } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import parseValueToMoment from '../../utils/parseValueToMoment'

interface FieldDatePickerProps {
  width: number | string
  [key: string]: any
}

const FieldDatePicker: ForwardRefRenderFunction<any, FieldDatePickerProps> = (
  { width, placeholder = '请选择', allowClear = true, format = 'YYYY-MM-DD', value, render, style, onChange, ...rest },
  ref
) => {
  const momentValue = parseValueToMoment(value, format) as moment.Moment
  const dom = (
    <DatePicker
      style={{
        width,
        ...style
      }}
      placeholder={placeholder}
      allowClear={allowClear}
      ref={ref}
      format={format}
      value={momentValue}
      onChange={(date, dateString) => {
        onChange && onChange(date, dateString)
      }}
      {...rest}
    ></DatePicker>
  )
  if (render) {
    return render({ ...rest }, dom)
  }
  return dom
}

export default React.forwardRef(FieldDatePicker)
