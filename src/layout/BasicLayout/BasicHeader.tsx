import React, { FC } from 'react'
import { Dropdown, Menu, Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAsync } from '@/stores/actions/user.action'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import HeaderNotice from './HeaderNotice'
import Avator from '@/assets/header/avatar.png'
import { SiteTheme, MenuMode } from '@/stores/types/app.type'
import config from '@/config'
import { StoreState } from '@/stores'

const { prefixCls } = config

const headerPrefixCls = `${prefixCls}-components-global-header`

type Action = 'userInfo' | 'userSetting' | 'logout'

interface BasicHeaderProps {
  siteTheme: SiteTheme
  menuMode: MenuMode
  className?: string
}

const BasicHeader: FC<BasicHeaderProps> = ({ children, siteTheme, menuMode, className }) => {
  const { userInfo } = useSelector((state: StoreState) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return
      case 'userSetting':
        return
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()))
        res && navigate('/login')
        return
    }
  }

  const UserManu = () => (
    <Menu>
      <Menu.Item key="info">
        <UserOutlined /> 个人信息
      </Menu.Item>
      <Menu.Item key="setting">
        <SettingOutlined /> 个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={() => onActionClick('logout')}>
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
            <span className="anticon">{userInfo.username}</span>
          </span>
        </Dropdown>
      </div>
    </>
  )
}

export default BasicHeader
