import React, { FC } from 'react'
import { getUserList } from '@/services/user'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table'

interface UserItem {
  id: string
  username: string
  nickname: string
  realname: string
  avatar: string
  email: string
  status: number
  online: number
  isLock: number
  version: number
}

const columns: ProColumns<UserItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder'
    // width: 72
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    fieldProps: {
      allowClear: true
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true
  },
  {
    title: '姓名',
    dataIndex: 'realname',
    copyable: true
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    copyable: true,
    hideInSearch: true
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    valueType: 'avatar',
    hideInSearch: true
    // width: 120
  },
  {
    title: '在线',
    dataIndex: 'online',
    filters: true,
    // width: 120,
    sorter: (a, b) => a.online - b.online,
    hideInSearch: true,
    valueEnum: {
      0: {
        text: '否',
        status: 'Error'
      },
      1: {
        text: '是',
        status: 'Success'
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    // filters: true,
    // initialValue: '1',
    // width: 120,
    valueEnum: {
      0: {
        text: '停用',
        status: 'Error'
      },
      1: {
        text: '启用',
        status: 'Success'
      }
    }
  },
  {
    title: '是否锁',
    dataIndex: 'isLock',
    filters: true,
    // width: 120,
    valueEnum: {
      0: {
        text: '否',
        status: 'Success'
      },
      1: {
        text: '是',
        status: 'Error'
      }
    }
  },
  {
    title: '操作',
    valueType: 'option',
    // width: 120,
    // fixed: 'right',
    render: (text, row, _, action) => [
      <a key="edit">编辑</a>,
      <a key="view">查看</a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' }
        ]}
      />
    ]
  }
]

interface UserProps {}

const User: FC<UserProps> = () => {
  // const actionRef = useRef<ActionType>()
  return (
    <ProTable<UserItem>
      columns={columns}
      // scroll={{
      //   x: 'max-content'
      //   // y: '200px'
      // }}
      pagination={{
        showQuickJumper: true
      }}
      request={async (params, sorter, filter) => {
        console.log(params, sorter, filter)
        const {
          data: { items, total }
        } = await getUserList(params)
        return { data: items, total, success: true }
      }}
      rowKey="id"
      headerTitle="用户列表"
      toolBarRender={() => [
        <Button key="3" type="primary">
          <PlusOutlined />
          新建
        </Button>
      ]}
    />
  )
}

export default User
