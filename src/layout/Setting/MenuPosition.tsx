import React, { FC, Fragment } from 'react'
import { Tooltip } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { MenuMode } from '@/stores/types/app.type'
import topSvg from '@/assets/setting/top.svg'
import dartSvg from '@/assets/setting/dark.svg'
import config from '@/config'

const { prefixCls } = config
const settingDrawerPrefixCls = `${prefixCls}-setting-drawer`

interface Props {
  menuMode: MenuMode
  onMenuModeChange: (mode: MenuMode) => void
}

interface Mode {
  key: MenuMode
  url: any
  title: string
}

const modeList: Mode[] = [
  {
    key: MenuMode.SIDE,
    url: dartSvg as any,
    title: '侧边菜单布局'
  },
  {
    key: MenuMode.TOP,
    url: topSvg as any,
    title: '顶部菜单布局'
  }
]

export const MenuPosition: FC<Props> = ({ menuMode, onMenuModeChange }) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 className={`${settingDrawerPrefixCls}-title`}>导航模式</h1>
      <div className={`${settingDrawerPrefixCls}-block-checkbox`}>
        {modeList.map((item: Mode) => {
          return (
            <div
              className={`${settingDrawerPrefixCls}-block-checkbox-item`}
              key={item.key}
              onClick={() => onMenuModeChange(item.key)}
            >
              <Fragment>
                {item.key !== menuMode ? (
                  <Tooltip title={item.title}>
                    <img src={item.url} alt={item.key} />
                  </Tooltip>
                ) : (
                  <img src={item.url} />
                )}
                <div
                  style={{ display: item.key == menuMode ? 'block' : 'none' }}
                  className={`${settingDrawerPrefixCls}-block-checkbox-selectIcon  primary-color`}
                >
                  <CheckOutlined />
                </div>
              </Fragment>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MenuPosition
