import React, { FC } from 'react'

interface Props {
  collapsed: boolean
}

const SiderFixed: FC<Props> = ({ collapsed }) => {
  const w = collapsed ? '48px' : '200px'
  const style = {
    width: w,
    overflow: 'hidden',
    flex: `0 0 ${w}`,
    maxWidth: w,
    minWidth: w
  }
  return <div style={style}></div>
}

export default SiderFixed
