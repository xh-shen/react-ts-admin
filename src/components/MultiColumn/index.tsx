import React, { FC, ReactNode } from 'react'
import config from '@/config'
import './index.less'

const { prefixCls } = config
const prefixClsMultiColumn = `${prefixCls}-multi-column`

interface MultiColumnProps {
  top?: ReactNode
  left?: ReactNode
  right?: ReactNode
  leftWidth?: number
}

const MultiColumn: FC<MultiColumnProps> = ({ top, left, right, leftWidth = 300 }) => {
  return (
    <div className={prefixClsMultiColumn}>
      {top ? <div className={`${prefixClsMultiColumn}-top`}>{top}</div> : null}
      <div className={`${prefixClsMultiColumn}-content`}>
        {left ? (
          <div style={{ width: leftWidth + 'px' }} className={`${prefixClsMultiColumn}-left`}>
            {left}
          </div>
        ) : null}
        {right ? <div className={`${prefixClsMultiColumn}-right`}>{right}</div> : null}
      </div>
    </div>
  )
}

export default MultiColumn
