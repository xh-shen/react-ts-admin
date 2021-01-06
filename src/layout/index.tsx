import React, { FC, useEffect, useCallback, useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { StoreState } from '@/stores'
import { setAppItem } from '@/stores/actions/app.action'
import { getMenuAsync, getUserInfoAsync } from '@/stores/actions/user.action'
import BasicLayout from './BasicLayout'
import LayoutSkeleton from './LayoutSkeleton'
import MyContent from './Content'
import './index.less'

const LayoutPage: FC = () => {
  const [auth, setAuth] = useState(false)
  const appState = useSelector((state: StoreState) => state.app)
  const { menuList } = useSelector((state: StoreState) => state.user)
  const { collapsed } = appState
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard')
    }
  }, [navigate, location])

  const initData = useCallback(async () => {
    await dispatch(await getUserInfoAsync())
    await dispatch(await getMenuAsync())
    setAuth(true)
  }, [dispatch])

  useEffect(() => {
    initData()
  }, [initData])

  const handleMenuCollapse = () => {
    dispatch(
      setAppItem({
        collapsed: !collapsed
      })
    )
  }

  // return <LayoutSkeleton />

  return (
    <Fragment>
      {auth ? (
        <BasicLayout onCollapse={handleMenuCollapse} menuList={menuList} {...appState}>
          <MyContent />
        </BasicLayout>
      ) : (
        <LayoutSkeleton />
      )}
    </Fragment>
  )
}

export default LayoutPage
