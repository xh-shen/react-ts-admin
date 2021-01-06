import React, { FC, Suspense, memo } from 'react'
import { Outlet } from 'react-router'
import SuspendFallbackLoading from '@/components/SuspendFallbackLoading'
import { Layout } from 'antd'
// import TagsView from '../tagView'

import config from '@/config'

const { prefixCls } = config

const { Content } = Layout

const MyContent: FC = () => {
  return (
    <Content className={`${prefixCls}-basicLayout-content`}>
      {/* <TagsView /> */}
      <Suspense fallback={<SuspendFallbackLoading />}>
        <Outlet />
      </Suspense>
    </Content>
  )
}

export default memo(MyContent)
