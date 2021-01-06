import React from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip, Space } from 'antd'
import { TooltipProps } from 'antd/lib/tooltip'
import config from '@/config'
import './index.less'

const { prefixCls } = config
const prefixClsLabelTip = `${prefixCls}-label-tip`

/**
 * 在 form 的 label 后面增加一个 tips 来展示一些说明文案
 * @param props
 */
const LabelIconTip: React.FC<{
  label: React.ReactNode
  subTitle?: React.ReactNode
  tooltip?: string | TooltipProps
}> = props => {
  const { label, tooltip, subTitle } = props

  if (!tooltip && !subTitle) {
    return <>{label}</>
  }
  const tooltipProps = typeof tooltip === 'string' ? { title: tooltip } : (tooltip as TooltipProps)

  return (
    <Space size={4} className={prefixClsLabelTip}>
      {label}
      {subTitle && <div className={`${prefixClsLabelTip}-subtitle`}>{subTitle}</div>}
      {tooltip && (
        <Tooltip {...tooltipProps}>
          <InfoCircleOutlined className={`${prefixClsLabelTip}-icon`} />
        </Tooltip>
      )}
    </Space>
  )
}

export default LabelIconTip
