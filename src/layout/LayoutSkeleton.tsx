import React from 'react'
import useMediaQuery from 'use-media-antd-query'
import classnames from 'classnames'
import { Skeleton, Card, Space, Divider, Layout } from 'antd'
import config from '@/config'

const { Header, Sider } = Layout

const { prefixCls } = config
const globalHeaderCls = classnames([`${prefixCls}-global-header`, `${prefixCls}-global-header-layout-side`])

const siderCls = classnames({
  [`${prefixCls}-sider`]: true,
  [`${prefixCls}-sider-light`]: true
})
/**
 * 一条分割线
 */
export const Line = ({ padding }: { padding?: string | number }) => (
  <div
    style={{
      padding: padding || '0 24px'
    }}
  >
    <Divider style={{ margin: 0 }} />
  </div>
)

export const MediaQueryKeyEnum = {
  xs: 2,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  xxl: 6
}

const StatisticSkeleton: React.FC<{ active?: boolean }> = ({ active }) => {
  const colSize = useMediaQuery()
  const arraySize = MediaQueryKeyEnum[colSize] || 6
  const firstWidth = (index: number) => {
    if (arraySize > 2 && index !== 0) {
      return 42
    }
    if (index === 0) {
      return 0
    }
    return 16
  }
  return (
    <Card
      bordered={false}
      style={{
        marginBottom: 16
      }}
    >
      <div
        style={{
          width: '100%',
          justifyContent: 'space-between',
          display: 'flex'
        }}
      >
        {new Array(arraySize).fill(null).map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            style={{
              borderLeft: arraySize > 2 && index === 1 ? '1px solid rgba(0,0,0,0.06)' : undefined,
              paddingLeft: firstWidth(index),
              flex: 1,
              marginRight: index === 0 ? 16 : 0
            }}
          >
            <Skeleton
              active={active}
              paragraph={false}
              title={{
                width: 100,
                style: { marginTop: 0 }
              }}
            />
            <Skeleton.Button
              active={active}
              style={{
                height: 48
              }}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}

/**
 * 列表子项目骨架屏
 */
const ListSkeletonItem: React.FC<{ active: boolean }> = ({ active }) => (
  <>
    <Card
      bordered={false}
      // eslint-disable-next-line react/no-array-index-key
      style={{
        borderRadius: 0
      }}
      bodyStyle={{
        padding: 24
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            maxWidth: '100%',
            flex: 1
          }}
        >
          <Skeleton
            active={active}
            title={{
              width: 100,
              style: {
                marginTop: 0
              }
            }}
            paragraph={{
              rows: 1,
              style: {
                margin: 0
              }
            }}
          />
        </div>
        <Skeleton.Button active={active} size="small" style={{ width: 165, marginTop: 12 }} />
      </div>
    </Card>
    <Line />
  </>
)

/**
 * 列表骨架屏
 */
const ListSkeleton: React.FC<{ active: boolean }> = ({ active }) => (
  <Card
    bordered={false}
    bodyStyle={{
      padding: 0
    }}
  >
    {new Array(10).fill(null).map((_, index) => (
      <ListSkeletonItem key={index} active={!!active} />
    ))}

    <Card
      bordered={false}
      style={{
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
      }}
      bodyStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Skeleton.Button
        style={{
          width: 102
        }}
        active={active}
        size="small"
      />
    </Card>
  </Card>
)

export type ListPageSkeletonProps = {
  active?: boolean
  pageHeader?: false
  statistic?: number | false
  actionButton?: false
  toolbar?: false
  list?: number | false
}

/**
 * header 骨架屏
 * @param param0
 */
const PageHeaderSkeleton = ({ active }: { active: boolean }) => (
  <Header
    style={{
      padding: '0px',
      height: '48px',
      lineHeight: '48px',
      width: '100%',
      zIndex: 9
    }}
  >
    <div className={globalHeaderCls}>
      <Skeleton
        paragraph={false}
        title={{
          width: 185
        }}
      />
      <Space style={{ margin: '0 8px', paddingTop: 24 }}>
        <Skeleton.Button style={{ width: 20 }} active={active} size="small" />
        <Skeleton.Button style={{ width: 20 }} active={active} size="small" />
        <Skeleton.Button style={{ width: 20 }} active={active} size="small" />
        <Skeleton.Button style={{ width: 20 }} active={active} size="small" />
        <Skeleton.Button style={{ width: 80 }} active={active} size="small" />
      </Space>
      {/* <Skeleton.Button active={active} size="small" /> */}
    </div>
  </Header>
)

const PageSiderSkeleton = ({ active }: { active: boolean }) => (
  <Sider className={siderCls} style={{ overflow: 'hidden', zIndex: 10 }}>
    <div style={{ padding: 16 }}>
      <Skeleton.Button active={active} size="small" style={{ width: 160, height: 32 }} />
      <div style={{ marginTop: 20 }}>
        {new Array(8).fill(null).map((_, index) => (
          <Space key={index} style={{ margin: '10px 0' }}>
            <Skeleton.Button style={{ width: 20 }} active={active} size="small" />
            <Skeleton.Input style={{ width: 100 }} size="small" />
          </Space>
        ))}
      </div>
    </div>
  </Sider>
)

const LayoutSkeleton: React.FC<ListPageSkeletonProps> = ({ active = true }) => (
  <div className={`${prefixCls} ${prefixCls}-basicLayout`}>
    <Layout
      style={{
        width: '100%'
      }}
    >
      <PageSiderSkeleton active={active} />
      <Layout>
        <PageHeaderSkeleton active={active} />
        <div style={{ margin: 24, height: 'calc(100vh - 100px)', overflow: 'hidden' }}>
          <StatisticSkeleton active={active} />
          <Card
            bordered={false}
            bodyStyle={{
              padding: 0
            }}
          >
            <ListSkeleton active={active} />
          </Card>
        </div>
      </Layout>
    </Layout>
  </div>
)

export default LayoutSkeleton
