/*
 * @Author: shen
 * @Date: 2020-09-15 16:37:48
 * @LastEditors: shen
 * @LastEditTime: 2020-10-06 12:23:28
 * @Description:
 */
import { FC, useState, useEffect } from 'react'
import React from 'react'
import { Menu } from 'antd'
import classnams from 'classnames'
import {
  DashboardOutlined,
  SettingOutlined,
  ApartmentOutlined,
  //测试数据
  MenuUnfoldOutlined,
  MenuOutlined,
  UserOutlined,
  TeamOutlined,
  ReadOutlined
} from '@ant-design/icons'
import { MenuList, MenuItem } from '@/stores/types/user.type'
import { useNavigate, useLocation } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { addTag } from '@/stores/actions/tagsView.action'
import { MenuMode, SiteTheme } from '@/stores/types/app.type'
import { toTree } from '@/utils'
import config from '@/config'

const { prefixCls } = config

const { SubMenu, Item } = Menu

interface BasicMenuProps {
  collapsed: boolean
  siteTheme: SiteTheme
  menuMode: MenuMode
  menuList: MenuList
}

const iconMap: { [prop: string]: any } = {
  DashboardOutlined: <DashboardOutlined />,
  SettingOutlined: <SettingOutlined />,
  ApartmentOutlined: <ApartmentOutlined />,
  //测试数据
  MenuUnfoldOutlined: <MenuUnfoldOutlined />,
  MenuOutlined: <MenuOutlined />,
  UserOutlined: <UserOutlined />,
  TeamOutlined: <TeamOutlined />,
  ReadOutlined: <ReadOutlined />
}

//设置多级菜单默认展开数组
const setMenuOpenKeys: (pathname: string) => string[] = pathname => {
  const pathnames = pathname
    .split('/')
    .filter(v => v)
    .map(s => '/' + s)
  pathnames.pop()
  const temp: string[] = []
  return pathnames.reduce((a, c) => {
    temp.push(a + c)
    return temp
  }, temp)
}

const getTitie = (menu: MenuItem) => {
  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {menu.icon && iconMap[menu.icon]}
      <span className={`${prefixCls}-menu-item`}>{menu.title}</span>
    </span>
  )
}

const BasicMenu: FC<BasicMenuProps> = ({ collapsed, siteTheme, menuMode, menuList }) => {
  const [openKeys, setOpenkeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const treeMenu = toTree(menuList) as MenuList

  const defaultProps = menuMode === MenuMode.TOP || collapsed ? {} : { openKeys }

  const onMenuClick = (menu: MenuItem) => {
    if (menu.path === pathname) return
    // const { id, title, path } = menu
    // setSelectedKeys([id])
    // dispatch(
    //   addTag({
    //     id,
    //     title,
    //     path,
    //     closable: true
    //   })
    // )
    navigate(menu.path)
  }

  useEffect(() => {
    setSelectedKeys([pathname])
    setOpenkeys(setMenuOpenKeys(pathname))
  }, [collapsed, pathname, menuMode])

  const onOpenChange = (keys: string[]) => {
    setOpenkeys(keys)
  }

  const menuCls = classnams({ [`${prefixCls}-sider-menu`]: menuMode === MenuMode.SIDE })

  const renderMenuItem = (menu: MenuItem) => {
    return (
      <Item key={menu.path} onClick={() => onMenuClick(menu)}>
        {getTitie(menu)}
      </Item>
    )
  }
  const renderSubMenu = (menu: MenuItem) => {
    return (
      <SubMenu key={menu.path} title={getTitie(menu)}>
        {menu.children?.map((item: MenuItem) =>
          item.children && item.children.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
        )}
      </SubMenu>
    )
  }
  return (
    <Menu
      mode={menuMode === MenuMode.SIDE ? 'inline' : 'horizontal'}
      inlineIndent={16}
      theme={siteTheme}
      selectedKeys={selectedKeys}
      {...defaultProps}
      onOpenChange={onOpenChange as any}
      className={menuCls}
      style={{ width: '100%' }}
    >
      {treeMenu?.map(item => {
        return item.children && item.children.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
      })}
    </Menu>
  )
}

export default BasicMenu
