import React, { FC } from 'react'
import { List, Switch } from 'antd'
import { MenuMode } from '@/stores/types/app.type'

interface Props {
  fixedHeader: boolean
  fixedMenu: boolean
  menuMode: MenuMode
  onLayoutChange: (type: string, value: boolean) => void
}

const LayoutChange: FC<Props> = ({ fixedHeader, fixedMenu, menuMode, onLayoutChange }) => {
  return (
    <List split={false}>
      <List.Item>
        <span>固定 Header</span>
        <Switch size="small" checked={fixedHeader} onChange={checked => onLayoutChange('fixedHeader', checked)} />
      </List.Item>
      <List.Item>
        <span style={{ opacity: menuMode === MenuMode.TOP ? 0.5 : 1 }}>固定侧边菜单</span>
        <Switch
          size="small"
          disabled={menuMode === MenuMode.TOP}
          checked={fixedMenu}
          onChange={checked => onLayoutChange('fixedMenu', checked)}
        />
      </List.Item>
    </List>
  )
}

export default LayoutChange
