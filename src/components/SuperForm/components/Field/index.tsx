import React, { ForwardRefRenderFunction, Fragment } from 'react'
import { FormItemFieldProps, FieldType, FieldValueType, RenderProps } from '../../interface'
import FieldText from '../Text'
import FieldPassword from '../Password'
import FieldTextarea from '../Textarea'
import FieldSelect from '../Select'
import FieldMoney from '../Money'
import FieldPercent from '../Percent'
import FieldDigit from '../Digit'
import FieldCheckbox from '../Checkbox'
import FieldCheckboxGroup from '../CheckboxGroup'
import FieldRadio from '../Radio'
import FieldRadioGroup from '../RadioGroup'
import FieldCascader from '../Cascader'
import FieldSwitch from '../Switch'
import FieldDatePicker from '../DatePicker'
import FieldDatePickerRange from '../DatePickerRange'
import FieldTimePicker from '../TimePicker'
import FieldTimePickerRange from '../TimePickerRange'
import FieldTreeSelect from '../TreeSelect'

const WIDTH_SIZE_ENUM = {
  // 适用于短数字，短文本或者选项
  xs: 104,
  // 适用于较短字段录入、如姓名、电话、ID 等。
  s: 216,
  // 标准宽度，适用于大部分字段长度。
  m: 328,
  // 适用于较长字段录入，如长网址、标签组、文件路径等。
  l: 440,
  // 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
  xl: 552
}

interface FieldProps extends FormItemFieldProps {
  ignoreFelidWidth: boolean
}

const createFieldRender = (
  type: FieldType,
  valueType: FieldValueType,
  width: number | string,
  props: RenderProps
): React.ReactNode => {
  if (type === 'text') {
    return <FieldText {...props} width={width} />
  }
  if (type === 'password') {
    return <FieldPassword {...props} width={width} />
  }
  if (type === 'textarea') {
    return <FieldTextarea {...props} width={width} />
  }
  if (type === 'select') {
    return <FieldSelect width={width} {...props} />
  }
  if (type === 'digit') {
    return <FieldDigit width={width} {...props} />
  }
  if (type === 'money') {
    return <FieldMoney width={width} {...props} />
  }
  if (type === 'percent') {
    return <FieldPercent width={width} {...props} />
  }
  if (type === 'checkbox') {
    return <FieldCheckbox {...props} />
  }
  if (type === 'checkbox-group') {
    return <FieldCheckboxGroup {...props} />
  }
  if (type === 'radio') {
    return <FieldRadio {...props} />
  }
  if (type === 'radio-group') {
    return <FieldRadioGroup {...props} />
  }
  if (type === 'cascader') {
    return <FieldCascader width={width} {...props} />
  }
  if (type === 'switch') {
    return <FieldSwitch {...props} />
  }
  if (type === 'datePicker') {
    return <FieldDatePicker width={width} {...props} />
  }
  if (type === 'datePickerRange') {
    return <FieldDatePickerRange width={width} {...props} />
  }
  if (type === 'timePicker') {
    return <FieldTimePicker width={width} {...props} />
  }
  if (type === 'timePickerRange') {
    return <FieldTimePickerRange width={width} {...props} />
  }
  if (type === 'treeSelect') {
    return <FieldTreeSelect width={width} {...props} />
  }
  return null
}

const Field: ForwardRefRenderFunction<any, FieldProps> = (
  { type, valueType = 'text', ignoreFelidWidth, width, fieldProps, ...commonProps },
  ref
) => {
  const myWidth = ignoreFelidWidth ? '100%' : typeof width === 'number' ? width : WIDTH_SIZE_ENUM[width || 'm']
  return (
    <Fragment>
      {createFieldRender(type, valueType, myWidth, {
        ref,
        ...fieldProps,
        ...commonProps
      })}
    </Fragment>
  )
}

export default React.forwardRef(Field)
