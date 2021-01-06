// import React, { FC } from 'react'
// import { getUserList } from '@/services/user'
// import { PlusOutlined } from '@ant-design/icons'
// import { Button } from 'antd'
// import ProTable, { ProColumns } from '@ant-design/pro-table'
// import PrivateButton from '@/components/PrivateButton'

// interface UserItem {
//   id: string
//   username: string
//   nickname: string
//   realname: string
//   avatar: string
//   email: string
//   status: number
//   online: number
//   isLock: number
//   version: number
// }

// const columns: ProColumns<UserItem>[] = [
//   {
//     title: '序号',
//     dataIndex: 'index',
//     valueType: 'indexBorder',
//     width: 72
//   },
//   {
//     title: '用户名',
//     dataIndex: 'username',
//     copyable: true,
//     fieldProps: {
//       allowClear: true
//     }
//   },
//   {
//     title: '邮箱',
//     dataIndex: 'email',
//     copyable: true
//   },
//   {
//     title: '姓名',
//     dataIndex: 'realname',
//     copyable: true
//   },
//   {
//     title: '昵称',
//     dataIndex: 'nickname',
//     copyable: true,
//     hideInSearch: true
//   },
//   {
//     title: '头像',
//     dataIndex: 'avatar',
//     valueType: 'avatar',
//     hideInSearch: true,
//     width: 120
//   },
//   {
//     title: '在线',
//     dataIndex: 'online',
//     filters: true,
//     width: 120,
//     sorter: (a, b) => a.online - b.online,
//     hideInSearch: true,
//     valueEnum: {
//       0: {
//         text: '否',
//         status: 'Error'
//       },
//       1: {
//         text: '是',
//         status: 'Success'
//       }
//     }
//   },
//   {
//     title: '状态',
//     dataIndex: 'status',
//     // filters: true,
//     // initialValue: '1',
//     width: 120,
//     valueEnum: {
//       0: {
//         text: '停用',
//         status: 'Error'
//       },
//       1: {
//         text: '启用',
//         status: 'Success'
//       }
//     }
//   },
//   {
//     title: '是否锁',
//     dataIndex: 'isLock',
//     filters: true,
//     width: 120,
//     valueEnum: {
//       0: {
//         text: '否',
//         status: 'Success'
//       },
//       1: {
//         text: '是',
//         status: 'Error'
//       }
//     }
//   },
//   {
//     title: '操作',
//     valueType: 'option',
//     width: 120,
//     fixed: 'right',
//     render: (text, row, _, action) => [
//       <PrivateButton.Group
//         key="buttongroup"
//         type="link"
//         buttonList={[
//           {
//             label: '编辑',
//             privateName: 'create-school',
//             onClick: () => {
//               console.log('新增学校')
//             }
//           },
//           {
//             label: '查看',
//             privateName: 'create-user',
//             onClick: () => {
//               console.log('新增用户')
//             }
//           }
//         ]}
//       />
//       // <a key="edit">编辑</a>,
//       // <a key="view">查看</a>,
//       // <TableDropdown
//       //   key="actionGroup"
//       //   onSelect={() => action.reload()}
//       //   menus={[
//       //     { key: 'copy', name: '复制' },
//       //     { key: 'delete', name: '删除' }
//       //   ]}
//       // />
//     ]
//   }
// ]

// interface UserProps {}

// const UserList: FC<UserProps> = () => {
//   // const actionRef = useRef<ActionType>()
//   return (
//     <ProTable<UserItem>
//       columns={columns}
//       search={false}
//       scroll={{
//         x: 'max-content'
//         // y: '200px'
//       }}
//       pagination={{
//         showQuickJumper: true
//       }}
//       request={async (params, sorter, filter) => {
//         console.log(params, sorter, filter)
//         const {
//           data: { items, total }
//         } = await getUserList(params)
//         return { data: items, total, success: true }
//       }}
//       rowKey="id"
//       headerTitle="用户列表"
//       toolBarRender={() => [
//         <Button key="3" type="primary">
//           <PlusOutlined />
//           新建
//         </Button>
//       ]}
//     />
//   )
// }

// export default UserList
import React from 'react'
import { message } from 'antd'
import ProForm, { ProFormText, ProFormDateRangePicker, ProFormSelect, ProFormDigit } from '@ant-design/pro-form'

const waitTime = (time = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export default () => {
  return (
    <ProForm
      onFinish={async values => {
        await waitTime(2000)
        console.log(values)
        message.success('提交成功！')
      }}
    >
      <ProForm.Group>
        <ProFormDigit width="s" name="id" label="主合同编号" />
        <ProFormText name="company" label="我方公司名称" placeholder="请输入名称" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText name="contract" label="合同名称" placeholder="请输入名称" />
        <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '盖章后生效'
            }
          ]}
          width="xs"
          name="useMode"
          label="合同约定生效方式"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '履行完终止'
            }
          ]}
          name="unusedMode"
          label="合同约定失效效方式"
        />
      </ProForm.Group>
      <ProFormText width="s" name="id" label="主合同编号" />
      <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />
      <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
    </ProForm>
  )
}
