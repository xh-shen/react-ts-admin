import React, { useEffect, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import { StoreState } from './stores'
import { lacaleConfig } from './locales'
import { ConfigProvider } from 'antd'
import SuspendFallbackLoading from '@/components/SuspendFallbackLoading'
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import RenderRouter from './router'

const App: React.FC = () => {
  const { locale } = useSelector((state: StoreState) => state.app)

  useEffect(() => {
    if (locale === 'en_US') {
      moment.locale('en')
    } else if (locale === 'zh_CN') {
      moment.locale('zh-cn')
    }
  }, [locale])

  const getAntdLocale = () => {
    if (locale === 'en_US') {
      return enUS
    } else if (locale === 'zh_CN') {
      return zhCN
    }
  }
  console.log(getAntdLocale())
  return (
    <ConfigProvider locale={getAntdLocale()} componentSize="middle">
      <IntlProvider locale={locale.split('_')[0]} messages={lacaleConfig[locale]}>
        <Suspense fallback={<SuspendFallbackLoading />}>
          <BrowserRouter>
            <RenderRouter />
          </BrowserRouter>
        </Suspense>
      </IntlProvider>
    </ConfigProvider>
  )
}

export default App
