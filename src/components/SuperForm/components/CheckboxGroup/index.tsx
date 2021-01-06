import React, { ForwardRefRenderFunction } from 'react'
import { Checkbox } from 'antd'

interface FieldCheckboxGroupProps {
  options: any[]
  [key: string]: any
}

const FieldCheckboxGroup: ForwardRefRenderFunction<any, FieldCheckboxGroupProps> = (
  { onChange, options, ...rest },
  ref
) => {
  return (
    <Checkbox.Group
      {...rest}
      ref={ref}
      options={options?.map(option => {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option
          }
        }
        return option
      })}
      onChange={checkedValue => {
        onChange && onChange(checkedValue)
      }}
    />
  )
}

export default React.forwardRef(FieldCheckboxGroup)
