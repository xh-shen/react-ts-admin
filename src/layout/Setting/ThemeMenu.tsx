import React, { FC, Fragment } from 'react'
import { Tooltip } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { SiteTheme } from '@/stores/types/app.type'
import lightSvg from '@/assets/setting/light.svg'
import dartSvg from '@/assets/setting/dark.svg'
import config from '@/config'

const { prefixCls } = config
const settingDrawerPrefixCls = `${prefixCls}-setting-drawer`

interface Props {
  siteTheme: SiteTheme
  onThemeChange: (theme: SiteTheme) => void
}

interface Theme {
  key: SiteTheme
  url: any
  title: string
}

const themeList: Theme[] = [
  {
    key: SiteTheme.LIGHT,
    url: lightSvg as any,
    title: '亮色菜单风格'
  },
  {
    key: SiteTheme.DARK,
    url: dartSvg as any,
    title: '暗色菜单风格'
  }
]

export const ThemeMenu: FC<Props> = ({ siteTheme, onThemeChange }) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 className={`${settingDrawerPrefixCls}-title`}>整体风格设置</h1>
      <div className={`${settingDrawerPrefixCls}-block-checkbox`}>
        {themeList.map((item: Theme) => {
          return (
            <div
              className={`${settingDrawerPrefixCls}-block-checkbox-item`}
              key={item.key}
              onClick={() => onThemeChange(item.key)}
            >
              <Fragment>
                {item.key !== siteTheme ? (
                  <Tooltip title={item.title}>
                    <img src={item.url} alt={item.key} />
                  </Tooltip>
                ) : (
                  <img src={item.url} />
                )}
                <div
                  style={{ display: item.key == siteTheme ? 'block' : 'none' }}
                  className={`${settingDrawerPrefixCls}-block-checkbox-selectIcon primary-color`}
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

export default ThemeMenu
