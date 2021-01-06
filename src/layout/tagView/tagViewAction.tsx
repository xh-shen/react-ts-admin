import React, { FC } from 'react'
import { Menu, Dropdown } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { removeTag, removeOtherTag, removeAllTag } from '@/stores/actions/tagsView.action'
import { StoreState } from '@/stores'
import { LocaleFormatter } from '@/locales'

const TagsViewAction: FC = () => {
  const { activeTagId } = useSelector((state: StoreState) => state.tagsView)
  const dispatch = useDispatch()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="0" onClick={() => dispatch(removeTag(activeTagId))}>
            <LocaleFormatter id="tagsView.operation.closeCurrent" />
          </Menu.Item>
          <Menu.Item key="1" onClick={() => dispatch(removeOtherTag())}>
            <LocaleFormatter id="tagsView.operation.closeOther" />
          </Menu.Item>
          <Menu.Item key="2" onClick={() => dispatch(removeAllTag())}>
            <LocaleFormatter id="tagsView.operation.closeAll" />
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={() => dispatch(removeAllTag())}>
            <LocaleFormatter id="tagsView.operation.dashboard" />
          </Menu.Item>
        </Menu>
      }
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra" />
      </span>
    </Dropdown>
  )
}

export default TagsViewAction
