/*
 * @Author: shen
 * @Date: 2020-10-10 16:48:06
 * @LastEditors: shen
 * @LastEditTime: 2020-10-10 17:12:29
 * @Description:
 */
import React, { FC } from 'react'
import { Space } from 'antd'
import config from '@/config'
import './index.less'

const { prefixCls } = config
const prefixClsFormGroup = `${prefixCls}-form-group`

export interface GroupProps {
  title?: React.ReactNode
  size?: number
  style?: React.CSSProperties
  titleStyle?: React.CSSProperties
  titleRender?: (title: React.ReactNode, props: GroupProps) => React.ReactNode
}

const Group: FC<GroupProps> = props => {
  const { children, style, title, size = 32, titleStyle, titleRender } = props
  const titleDom = titleRender ? titleRender(title, props) : title
  return (
    <div style={style}>
      {titleDom && (
        <div className={`${prefixClsFormGroup}-title`} style={titleStyle}>
          {titleDom}
        </div>
      )}
      <Space className={`${prefixClsFormGroup}-container`} size={size}>
        {children}
      </Space>
    </div>
  )
}

export default Group
