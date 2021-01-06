import React, { FC } from 'react'
import { Dropdown, Menu, Avatar } from 'antd'
import { GlobalOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import { ReactComponent as ZhCnSvg } from '@/assets/header/zh_CN.svg'
import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg'
import { StoreState } from '@/stores'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import HeaderNotice from './HeaderNotice'
import { setAppItem } from '@/stores/actions/app.action'
import Avator from '@/assets/header/avatar.png'
import { SiteTheme, MenuMode, Locale } from '@/stores/types/app.type'
import config from '@/config'

const { prefixCls } = config

const headerPrefixCls = `${prefixCls}-components-global-header`

interface BasicHeaderProps {
  siteTheme: SiteTheme
  menuMode: MenuMode
  className?: string
}

const BasicHeader: FC<BasicHeaderProps> = ({ children, siteTheme, menuMode, className }) => {
  const { locale } = useSelector((state: StoreState) => state.app)
  const dispatch = useDispatch()
  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setAppItem({ locale: key }))
    localStorage.setItem('locale', key)
  }
  const LangMenu = () => (
    <Menu onClick={selectLocale}>
      <Menu.Item style={{ textAlign: 'left' }} disabled={locale === Locale.ZH_CN} key={Locale.ZH_CN}>
        <ZhCnSvg /> 简体中文
      </Menu.Item>
      <Menu.Item style={{ textAlign: 'left' }} disabled={locale === Locale.EN_US} key={Locale.EN_US}>
        <EnUsSvg /> English
      </Menu.Item>
    </Menu>
  )

  const UserManu = () => (
    <Menu>
      <Menu.Item key="info">
        <UserOutlined /> 个人信息
      </Menu.Item>
      <Menu.Item key="setting">
        <SettingOutlined /> 个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )

  const headerCls = classnames({
    [`${headerPrefixCls}-right`]: true,
    [`${headerPrefixCls}-dark`]: siteTheme === 'dark' && menuMode !== MenuMode.SIDE
  })
  return (
    <>
      <div className={className} style={{ flex: '1 1 0%' }}>
        {children}
      </div>
      <div className={headerCls}>
        <HeaderNotice />
        <Dropdown trigger={['hover']} overlayStyle={{ width: '150px' }} overlay={UserManu}>
          <span className={`${headerPrefixCls}-action ${headerPrefixCls}-account`}>
            <Avatar src={Avator} size="small" className="user-avator" style={{ margin: '0 8px 0 0' }} />
            <span className="anticon">admin</span>
          </span>
        </Dropdown>
        <Dropdown trigger={['hover']} overlayStyle={{ width: '150px' }} overlay={LangMenu}>
          <span className={`${headerPrefixCls}-action`}>
            <GlobalOutlined />
          </span>
        </Dropdown>
      </div>
    </>
  )
}

export default BasicHeader
