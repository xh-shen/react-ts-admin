import React, { ForwardRefRenderFunction } from 'react'
import { TimePicker } from 'antd'
import moment from 'moment'
import parseValueToMoment from '../../utils/parseValueToMoment'

interface FieldTimePickerProps {
  width: number | string
  [key: string]: any
}

const FieldTimePicker: ForwardRefRenderFunction<any, FieldTimePickerProps> = (
  { width, placeholder = '请选择', allowClear = true, format = 'HH:mm', value, render, style, onChange, ...rest },
  ref
) => {
  const momentValue = parseValueToMoment(value, format) as moment.Moment
  const dom = (
    <TimePicker
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
    ></TimePicker>
  )
  if (render) {
    return render({ ...rest }, dom)
  }
  return dom
}

export default React.forwardRef(FieldTimePicker)
