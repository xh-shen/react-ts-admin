import React, { ForwardRefRenderFunction } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

interface FieldDatePickerRangeProps {
  width: number | string
  [key: string]: any
}

const { RangePicker } = DatePicker

const FieldDatePickerRange: ForwardRefRenderFunction<any, FieldDatePickerRangeProps> = (
  {
    width,
    placeholder = ['请选择', '请选择'],
    allowClear = true,
    format = 'YYYY-MM-DD',
    value,
    render,
    style,
    onChange,
    ...rest
  },
  ref
) => {
  const momentValue = value?.map((v: string) => moment(v, format))
  const dom = (
    <RangePicker
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
    ></RangePicker>
  )
  if (render) {
    return render({ ...rest }, dom)
  }
  return dom
}

export default React.forwardRef(FieldDatePickerRange)
