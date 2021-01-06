import React, { FC } from 'react'
import Logo from '@/assets/images/logo.png'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { SiteTheme } from '@/stores/types/app.type'

import config from '@/config'

const { prefixCls } = config

interface SiderLogoProps {
  collapsed: boolean
  siteTheme: SiteTheme
}

const SiderLogo: FC<SiderLogoProps> = ({ collapsed, siteTheme }) => {
  return (
    <div className={`${prefixCls}-top-nav-header-main-left`}>
      <div className={`${prefixCls}-top-nav-header-logo`}>
        <Link to="/dashboard">
          <img src={Logo} alt="" />
          {!collapsed && (
            <h1 className={classnames({ 'primary-color': siteTheme === SiteTheme.LIGHT })}>星瀚艺术CMS</h1>
          )}
        </Link>
      </div>
    </div>
  )
}

export default SiderLogo
