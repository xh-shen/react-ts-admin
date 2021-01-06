import React, { useState } from 'react'
import StandardForm, { FormItem, ItemsState } from '@/components/SuperForm'
import { Button, message } from 'antd'
import { waitTime } from '@/utils'

const SchoolTree = () => {
  const [form] = StandardForm.useForm()
  const [itemsStateMap, setItemsStateMap] = useState<{
    [key: string]: ItemsState
  }>({
    name: {
      hidden: false
    }
  })
  const formItems: FormItem[] = [
    {
      type: 'group',
      name: 'GROUP',
      // groupProps: {
      //   title: '我是组'
      // },
      groups: [
        {
          type: 'password',
          label: 'password',
          name: 'password',
          width: 'xs',
          fieldProps: {
            // visibilityToggle: false
          }
        },
        {
          type: 'text',
          label: 'text',
          name: 'text',
          width: 's',
          fieldProps: {
            addonAfter: <div onClick={() => console.log(1111)}>aa</div>
          }
        }
      ]
    },
    {
      type: 'datePicker',
      label: 'datePicker',
      valueType: 'dateTime',
      name: 'datePicker',
      fieldProps: {
        showTime: true
      }
    },
    {
      type: 'datePickerRange',
      label: 'datePickerRange',
      name: 'datePickerRange'
    },
    {
      type: 'timePicker',
      label: 'timePicker',
      name: 'timePicker',
      fieldProps: {
        format: 'HH:mm:ss'
      }
    },
    {
      type: 'timePickerRange',
      label: 'timePickerRange',
      name: 'timePickerRange',
      fieldProps: {
        format: 'HH:mm:ss'
      }
    },
    {
      type: 'textarea',
      label: 'textarea',
      name: 'name',
      fieldProps: {
        showCount: true,
        maxLength: 100
      }
    },
    {
      type: 'switch',
      label: 'switch',
      name: 'switch',
      onChange: value => {
        console.log(value)
        // form.setFieldsValue({ name2: value })
      }
    },
    {
      type: 'checkbox',
      label: 'checkbox',
      name: 'checkbox',
      fieldProps: {},
      onChange: value => {
        console.log(value)
        // form.setFieldsValue({ name2: value })
      }
    },
    {
      type: 'checkbox-group',
      label: 'checkbox-group',
      name: 'checkbox-group',
      fieldProps: {},
      options: ['aa', 'bbb', 'ccc'],
      onChange: value => {
        console.log(value)
        // form.setFieldsValue({ name2: value })
      }
    },
    {
      type: 'radio',
      label: 'radio',
      name: 'radio',
      onChange: value => {
        console.log(value)
      }
    },
    {
      type: 'radio-group',
      label: 'radio-group',
      name: 'radio-group',
      fieldProps: {},
      options: [
        {
          label: '测试',
          value: 'text',
          disabled: true
        },
        {
          label: '测试1',
          value: 'text1',
          disabled: false
        }
      ],
      onChange: value => {
        console.log(value)
      }
    },
    {
      type: 'cascader',
      label: 'cascader',
      name: 'cascader',
      fieldProps: {},
      options: [
        {
          label: '测试',
          value: 'text',
          children: [
            {
              label: '测试1-1',
              value: 'text1-1'
            },
            {
              label: '测试1-2',
              value: 'text1-2'
            }
          ]
        },
        {
          label: '测试1',
          value: 'text1',
          disabled: false
        }
      ],
      onChange: (value, selectedOptions) => {
        console.log(value)
        console.log(selectedOptions)
      }
    },
    {
      type: 'treeSelect',
      label: 'treeSelect',
      name: 'treeSelect',
      fieldProps: {
        multiple: true
      },
      options: [
        {
          label: '测试',
          value: 'text',
          children: [
            {
              label: '测试1-1',
              value: 'text1-1'
            },
            {
              label: '测试1-2',
              value: 'text1-2'
            }
          ]
        },
        {
          label: '测试1',
          value: 'text1',
          disabled: false
        }
      ],

      onChange: (value, label, extra) => {
        console.log(value)
        console.log(label)
        console.log(extra)
      }
    },
    {
      type: 'digit',
      label: 'digit',
      name: 'digit',
      width: 'xs',
      fieldProps: {
        precision: 0
      }
    },
    {
      type: 'money',
      label: 'money',
      name: 'money',
      width: 'xs'
      // disabled: true
    },
    {
      type: 'percent',
      label: 'percent',
      name: 'percent',
      width: 'xs'
    },
    {
      type: 'select',
      label: 'select',
      name: 'select',
      tooltip: '只是提示而已',
      rules: [{ required: true, message: '请选择学校代码' }],
      options: [
        { value: '1', label: '测试' },
        { value: '2', label: '测试2' }
      ],
      fieldProps: {
        mode: 'multiple',
        labelInValue: true,
        showSearch: true
      },
      onChange: value => {
        console.log(value)
        // form.setFieldsValue({ name2: value })
      }
    }
  ]

  const onClick = () => {
    setItemsStateMap({
      name: {
        hidden: !itemsStateMap.name.hidden
      }
    })
  }

  return (
    <div style={{ padding: 16 }}>
      <Button onClick={onClick}>测试</Button>
      <StandardForm
        form={form}
        initialValues={{
          name: '东湾半岛校区',
          datePicker: '2020-10-17',
          datePickerRange: [],
          timePicker: '08:21'
        }}
        // layout="horizontal"
        formItems={formItems}
        itemsStateMap={itemsStateMap}
        onFinish={async values => {
          console.log(values)
          // await waitTime(2000)
          message.success('提交成功！')
        }}
      />
    </div>
  )
}

export default SchoolTree
