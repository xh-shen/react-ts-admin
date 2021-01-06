import React, { FC, useEffect } from 'react'
import { Spin } from 'antd'
import NProgress from 'nprogress'

const SuspendFallbackLoading: FC = () => {
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  })
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20%' }}>
      <Spin tip="" size="large" />
    </div>
  )
}

export default SuspendFallbackLoading
