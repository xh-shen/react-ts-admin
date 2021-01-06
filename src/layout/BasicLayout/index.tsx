import React, { FC } from 'react'
import { Layout } from 'antd'
import classnames from 'classnames'
import Setting from '../Setting'
import SiderFixed from './SiderFixed'
import SiderContent from './SiderContent'
import BasicHeader from './BasicHeader'
import { AppState, MenuMode, SiteTheme } from '@/stores/types/app.type'
import SiderLogo from './SiderLogo'
import TopLogo from './TopLogo'
import BasicMenu from './BasicMenu'
import { MenuList } from '@/stores/types/user.type'

import config from '@/config'

const { prefixCls } = config
const globalHeaderCls = classnames([`${prefixCls}-global-header`, `${prefixCls}-global-header-layout-side`])

const { Header } = Layout

// type WithFalse<T> = T | false

interface BasicLayoutProps extends AppState {
  // logo: React.ReactNode | WithFalse<() => React.ReactNode>
  onCollapse: () => void
  className?: string
  menuList: MenuList
}

const BasicLayout: FC<BasicLayoutProps> = ({
  onCollapse,
  collapsed,
  menuMode,
  siteTheme,
  fixedMenu,
  fixedHeader,
  menuList,
  children
}) => {
  const topNavHeaderCls = classnames({
    [`${prefixCls}-top-nav-header`]: true,
    light: siteTheme === SiteTheme.LIGHT
  })
  const headerStyle = {
    padding: '0px',
    height: '48px',
    lineHeight: '48px',
    width: '100%'
  }
  const headerCls = classnames({ [`${prefixCls}-fixed-header`]: fixedHeader })
  return (
    <div className={`${prefixCls} ${prefixCls}-basicLayout`}>
      <Layout style={{ minHeight: '100%' }}>
        {menuMode === MenuMode.SIDE ? (
          <>
            {fixedMenu && <SiderFixed collapsed={collapsed} />}
            <SiderContent fixedMenu={fixedMenu} collapsed={collapsed} onCollapse={onCollapse} siteTheme={siteTheme}>
              <SiderLogo collapsed={collapsed} siteTheme={siteTheme} />
              <div style={{ flex: '1 1 0%', overflow: 'hidden auto' }}>
                <BasicMenu collapsed={collapsed} siteTheme={siteTheme} menuMode={menuMode} menuList={menuList} />
              </div>
            </SiderContent>
            <Layout>
              {fixedHeader && <Header style={headerStyle} />}
              <Header
                className={headerCls}
                style={{
                  ...headerStyle,
                  zIndex: 9,
                  width: fixedHeader ? `calc(100% - ${collapsed ? '48px' : '200px'})` : '100%'
                }}
              >
                <div className={globalHeaderCls}>
                  <BasicHeader siteTheme={siteTheme} menuMode={menuMode}></BasicHeader>
                </div>
              </Header>
              {children}
            </Layout>
          </>
        ) : (
          <>
            {fixedHeader && <Header style={headerStyle} />}
            <Header className={headerCls} style={{ ...headerStyle, zIndex: 9 }}>
              <div className={topNavHeaderCls}>
                <TopLogo collapsed={collapsed} siteTheme={siteTheme} />
                <BasicHeader siteTheme={siteTheme} menuMode={menuMode} className={`${prefixCls}-top-nav-header-menu`}>
                  <BasicMenu collapsed={collapsed} siteTheme={siteTheme} menuMode={menuMode} menuList={menuList} />
                </BasicHeader>
              </div>
            </Header>
            {children}
          </>
        )}
        <Setting />
      </Layout>
    </div>
  )
}

export default BasicLayout
