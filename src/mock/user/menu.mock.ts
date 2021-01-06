/*
 * @Author: shen
 * @Date: 2020-08-26 17:53:07
 * @LastEditors: shen
 * @LastEditTime: 2020-11-15 09:14:21
 * @Description: menu mock
 */
import { MenuList } from '@/stores/types/user.type'
import { mock, intercepter } from '../config'

const mockMenuList: MenuList = [
  {
    id: 'system',
    pid: '',
    name: 'system',
    title: '系统管理',
    icon: 'SettingOutlined',
    path: '/system'
  },
  {
    id: 'originsetting',
    pid: 'system',
    name: 'originsetting',
    title: '组织架构设置',
    icon: '',
    path: '/system/originsetting'
  },
  {
    id: 'user',
    pid: 'system',
    name: 'user',
    title: '用户管理',
    icon: '',
    path: '/system/user'
  },
  {
    id: 'role',
    pid: 'system',
    name: 'role',
    title: '角色管理',
    icon: '',
    path: '/system/role'
  },
  {
    id: 'permission',
    pid: 'system',
    name: 'permission',
    title: '权限管理',
    icon: '',
    path: '/system/permission'
  },

  //测试数据
  {
    id: 'test',
    pid: '',
    name: 'test',
    title: '测试',
    icon: 'ReadOutlined',
    path: '/test'
  },
  {
    id: 'test1',
    pid: 'test',
    name: 'test1',
    title: '测试',
    icon: '',
    path: '/test/test1'
  },
  {
    id: 'test2',
    pid: 'test1',
    name: 'test2',
    title: '测试',
    icon: '',
    path: '/test/test1/test2'
  },
  {
    id: 'b',
    pid: '',
    name: 'documentation',
    title: '文档',
    icon: 'ReadOutlined',
    path: '/documentation'
  },
  {
    id: 'c',
    pid: '',
    name: 'guide',
    title: '引导',
    icon: 'UserOutlined',
    path: '/guide'
  },
  {
    id: 'd',
    pid: '',
    name: 'permission',
    title: '权限',
    icon: 'UserOutlined',
    path: '/permission'
  },
  {
    id: 'e',
    pid: '',
    name: 'account',
    title: '个人设置',
    icon: 'UserOutlined',
    path: '/account'
  },
  {
    id: 'f',
    pid: 'd',
    name: 'routePermission',
    title: '路由权限',
    path: '/permission/route'
  },
  {
    id: 'g',
    pid: 'd',
    name: 'buttonPermission',
    title: '按钮权限',
    path: '/permission/button'
  },
  {
    id: 'h',
    pid: 'd',
    name: 'permissionConfig',
    title: '权限配置',
    path: '/permission/config'
  }
]

mock.mock('/user/menu', 'get', intercepter(mockMenuList))
