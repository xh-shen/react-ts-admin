import React, { FC, useEffect } from 'react'
import { Tabs } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from '@/stores'
import { setActiveTag, removeTag, addTag } from '@/stores/actions/tagsView.action'
import { useNavigate, useLocation } from 'react-router-dom'
import TagsViewAction from './tagViewAction'
import usePrevious from '@/hooks/usePrevious'
import { MenuItem } from '@/interface/layout/menu.interface'

const { TabPane } = Tabs

const TagsView: FC = () => {
  const { menuList } = useSelector((state: StoreState) => state.user)
  const { tags, activeTagId } = useSelector((state: StoreState) => state.tagsView)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const prevActiveTagId = usePrevious(activeTagId)

  // onClick tag
  const onChange = (key: string) => {
    dispatch(setActiveTag(key))
  }

  // onRemove tag
  const onClose = (targetKey: string) => {
    dispatch(removeTag(targetKey))
  }

  useEffect(() => {
    if (menuList.length) {
      const menu = menuList.find((m: MenuItem) => m.path === location.pathname)
      if (menu) {
        // Initializes dashboard page.
        const dashboard = menuList[0]
        dispatch(
          addTag({
            path: dashboard.path,
            title: dashboard.title,
            id: dashboard.id,
            closable: false
          })
        ),
          // Initializes the tag generated for the current page
          // Duplicate tag will be ignored in redux.
          dispatch(
            addTag({
              path: menu.path,
              title: menu.title,
              id: menu.id,
              closable: true
            })
          )
      }
    }
  }, [dispatch, location.pathname, menuList])

  useEffect(() => {
    // If current tag id changed, push to new path.
    if (prevActiveTagId !== activeTagId) {
      const tag = tags.find(tag => tag.id === activeTagId) || tags[0]
      navigate(tag.path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTagId, prevActiveTagId])

  return (
    <div id="pageTabs" style={{ background: '#fff', padding: '6px 4px' }}>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        onChange={onChange}
        activeKey={activeTagId}
        type="editable-card"
        hideAdd
        onEdit={(targetKey, action) => action === 'remove' && onClose(targetKey as string)}
        tabBarExtraContent={<TagsViewAction />}
      >
        {tags.map(tag => (
          <TabPane tab={tag.title} key={tag.id} closable={tag.closable} />
        ))}
      </Tabs>
    </div>
  )
}

export default TagsView
