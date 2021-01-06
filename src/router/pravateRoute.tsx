import React, { FC, useEffect } from 'react'
import { getToken } from '@/utils/cookie'
import { ACCESS_TOKEN } from '@/constants'
// import { Route, Navigate } from 'react-router-dom'
// import { RouteProps } from 'react-router'

import { Route, useNavigate } from 'react-router-dom'
// import { Result, Button } from 'antd'
// import { useLocale } from '@/locales'
import { RouteProps } from 'react-router'

const PrivateRoute: FC<RouteProps> = props => {
  const navigate = useNavigate()
  // const { formatMessage } = useLocale()
  // const location = useLocation()
  // console.log(location)
  useEffect(() => {
    !getToken(ACCESS_TOKEN) && navigate('/login', { replace: true, state: { from: location.pathname } })
  })

  return <Route {...props} />
  // return logged ? (
  //   <Route {...props} />
  // ) : (
  //   <Navigate to="/login" replace={true} />
  // <Result
  //   status="403"
  //   title="403"
  //   subTitle={formatMessage({ id: 'gloabal.tips.unauthorized' })}
  //   extra={
  //     <Button
  //       type="primary"
  //       onClick={() => navigate('/login', { replace: true, state: { from: location.pathname } })}
  //     >
  //       {formatMessage({ id: 'gloabal.tips.goToLogin' })}
  //     </Button>
  //   }
  // />
  // )
}

export default PrivateRoute
