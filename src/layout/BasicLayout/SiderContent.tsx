import React, { FC } from 'react'
import { Layout } from 'antd'
import classnames from 'classnames'
import { SiteTheme } from '@/stores/types/app.type'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import config from '@/config'

const { Sider } = Layout
const { prefixCls } = config
const prefixClsSider = `${prefixCls}-sider`

interface SiderContentProps {
  collapsed: boolean
  siteTheme: SiteTheme
  fixedMenu: boolean
  onCollapse: () => void
}

const SiderContent: FC<SiderContentProps> = ({ collapsed, onCollapse, siteTheme, fixedMenu, children }) => {
  const siderCls = classnames({
    [`${prefixClsSider}`]: true,
    [`${prefixClsSider}-fixed`]: fixedMenu,
    [`${prefixClsSider}-light`]: siteTheme === SiteTheme.LIGHT
  })
  return (
    <Sider
      className={siderCls}
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={48}
      breakpoint="md"
      theme={siteTheme}
      style={{ overflow: 'hidden', zIndex: 10 }}
    >
      {children}
      <div onClick={onCollapse} className={`${prefixCls}-sider-collapsed-button primary-hover-color`}>
        <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
      </div>
    </Sider>
  )
}

export default SiderContent
