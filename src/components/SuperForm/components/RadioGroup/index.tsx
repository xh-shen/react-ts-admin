import React, { ForwardRefRenderFunction } from 'react'
import { Radio } from 'antd'

interface FieldRadioGroupProps {
  options: any[]
  [key: string]: any
}

const FieldCheckboxGroup: ForwardRefRenderFunction<any, FieldRadioGroupProps> = (
  { onChange, options, ...rest },
  ref
) => {
  const renderChildren = () => {
    if (options?.length) {
      return (
        <>
          {options.map(option => {
            if (typeof option === 'string') {
              return (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              )
            }
            return (
              <Radio disabled={option.disabled} key={option.value} value={option.value}>
                {option.label}
              </Radio>
            )
          })}
        </>
      )
    }
    return null
  }
  return (
    <Radio.Group
      {...rest}
      ref={ref}
      onChange={e => {
        onChange && onChange(e.target.value)
      }}
    >
      {renderChildren()}
    </Radio.Group>
  )
}

export default React.forwardRef(FieldCheckboxGroup)
