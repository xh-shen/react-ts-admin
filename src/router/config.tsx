import React, { FC, memo } from 'react'
import { Route } from 'react-router-dom'
import { RouteProps } from 'react-router'
import PrivateRoute from './pravateRoute'
import config from '@/config'

export interface WrapperRouteProps extends RouteProps {
  title: string
  auth?: boolean
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ title, auth, ...props }) => {
  const WitchRoute = auth ? PrivateRoute : Route
  if (title) {
    document.title = `${title}-${config.title}`
  }
  return <WitchRoute {...props} />
}

export default memo(WrapperRouteComponent)
