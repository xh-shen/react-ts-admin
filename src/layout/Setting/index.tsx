import React, { FC, useState } from 'react'
import { SettingOutlined, CloseOutlined } from '@ant-design/icons'
import { Drawer, Divider, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from '@/stores'
import { setAppItem } from '@/stores/actions/app.action'
import { SiteTheme, MenuMode } from '@/stores/types/app.type'
import config from '@/config'
import ThemeMenu from './ThemeMenu'
// import ThemeColor from './ThemeColor'
import MenuPosition from './MenuPosition'
import LayoutChange from './LayoutChange'
import './index.less'

const { prefixCls } = config
const settingDrawerPrefixCls = `${prefixCls}-setting-drawer`

const Setting: FC = () => {
  const [visible, setVisible] = useState(false)
  const { menuMode, siteTheme, fixedHeader, fixedMenu } = useSelector((state: StoreState) => state.app)
  const dispatch = useDispatch()
  const onClose = () => {
    setVisible(false)
  }
  const onThemeChange = (theme: SiteTheme) => {
    dispatch(
      setAppItem({
        siteTheme: theme
      })
    )
    localStorage.setItem('siteTheme', theme)
    message.success('菜单主题更新成功')
  }
  const onMenuModeChange = (mode: MenuMode) => {
    dispatch(
      setAppItem({
        menuMode: mode
      })
    )
    localStorage.setItem('menuMode', mode)
    message.success('导航模式更新成功')
  }

  const onLayoutChange = (type: string, value: boolean) => {
    dispatch(
      setAppItem({
        [type]: value
      })
    )
    localStorage.setItem(type, JSON.stringify(value))
  }

  return (
    <Drawer
      width={300}
      handler={React.createElement(
        'div',
        { className: `${settingDrawerPrefixCls}-handle primary-bg`, onClick: () => setVisible(!visible) },
        !visible ? <SettingOutlined /> : <CloseOutlined />
      )}
      className={settingDrawerPrefixCls}
      forceRender
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <div className={`${settingDrawerPrefixCls}-content`}>
        <ThemeMenu siteTheme={siteTheme} onThemeChange={onThemeChange} />
        {/* <ThemeColor /> */}
        <Divider />
        <MenuPosition menuMode={menuMode} onMenuModeChange={onMenuModeChange} />
        <LayoutChange
          menuMode={menuMode}
          fixedHeader={fixedHeader}
          fixedMenu={fixedMenu}
          onLayoutChange={onLayoutChange}
        />
      </div>
    </Drawer>
  )
}

export default Setting
