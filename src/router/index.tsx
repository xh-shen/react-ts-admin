/*
 * @Author: shen
 * @Date: 2020-09-13 13:42:08
 * @LastEditors: shen
 * @LastEditTime: 2020-11-15 09:15:17
 * @Description: router
 */
import React, { lazy, FC } from 'react'
import Dashboard from '@/pages/dashboard'
import LoginPage from '@/pages/login'
import LayoutPage from '@/layout'
import { PartialRouteObject } from 'react-router'
import WrapperRouteComponent from './config'
import { useRoutes } from 'react-router-dom'

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'))
const Originsetting = lazy(() => import(/* webpackChunkName: "originsetting'"*/ '@/pages/system/originsetting'))
const User = lazy(() => import(/* webpackChunkName: "user'"*/ '@/pages/system/user'))
const Role = lazy(() => import(/* webpackChunkName: "role'"*/ '@/pages/system/role'))
const Permission = lazy(() => import(/* webpackChunkName: "permission'"*/ '@/pages/system/permission'))
//测试页面组件
const Test = lazy(() => import(/* webpackChunkName: "test'"*/ '@/pages/test'))
const Documentation = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/doucumentation'))
const Guide = lazy(() => import(/* webpackChunkName: "guide'"*/ '@/pages/guide'))
const RoutePermission = lazy(() => import(/* webpackChunkName: "route-permission"*/ '@/pages/permission/route'))
const ButtonPermission = lazy(() => import(/* webpackChunkName: "button-permission"*/ '@/pages/permission/button'))
const PermissionConfig = lazy(() => import(/* webpackChunkName: "permission-config'"*/ '@/pages/permission/config'))
const AccountPage = lazy(() => import(/* webpackChunkName: "account'"*/ '@/pages/account'))

const routeList: PartialRouteObject[] = [
  {
    path: 'login',
    element: <WrapperRouteComponent element={<LoginPage />} title="登陆" />
  },
  {
    path: '',
    element: <WrapperRouteComponent element={<LayoutPage />} title="" />,
    children: [
      {
        path: 'dashboard',
        element: <WrapperRouteComponent element={<Dashboard />} auth title="首页" />
      },
      {
        path: 'system/originsetting',
        element: <WrapperRouteComponent element={<Originsetting />} auth title="组织架构设置" />
      },
      {
        path: 'system/user',
        element: <WrapperRouteComponent element={<User />} auth title="用户管理" />
      },
      {
        path: 'system/role',
        element: <WrapperRouteComponent element={<Role />} auth title="角色管理" />
      },
      {
        path: 'system/permission',
        element: <WrapperRouteComponent element={<Permission />} auth title="权限管理" />
      },
      //测试路由
      {
        path: 'test/test1/test2',
        element: <WrapperRouteComponent element={<Test />} auth title="测试" />
      },
      {
        path: 'documentation',
        element: <WrapperRouteComponent element={<Documentation />} auth title="文档" />
      },
      {
        path: 'guide',
        element: <WrapperRouteComponent element={<Guide />} auth title="引导" />
      },
      {
        path: 'permission/route',
        element: <WrapperRouteComponent element={<RoutePermission />} auth title="路由权限" />
      },
      {
        path: 'permission/button',
        element: <WrapperRouteComponent element={<ButtonPermission />} auth title="按钮权限" />
      },
      {
        path: 'permission/config',
        element: <WrapperRouteComponent element={<PermissionConfig />} auth title="权限配置" />
      },
      {
        path: 'account',
        element: <WrapperRouteComponent element={<AccountPage />} auth title="个人设置" />
      }
    ]
  },
  {
    path: '*',
    element: <WrapperRouteComponent element={<NotFound />} auth title="title.notFount" />
  }
]

const RenderRouter: FC = () => {
  const element = useRoutes(routeList)
  return element
}

export default RenderRouter
