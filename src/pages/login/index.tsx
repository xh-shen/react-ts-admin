import React, { FC, useEffect, useState } from 'react'
import { Button, Col, Form, Input, Row, Spin } from 'antd'
import { useDispatch } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoginParamsType, getImgCode } from '@/services/passport'
import { loginAsync } from '@/stores/actions/user.action'
import Logo from '@/assets/images/logo.png'
import { getToken } from '@/utils/cookie'
import { ACCESS_TOKEN } from '@/constants'
import './index.less'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const initialValues: LoginParamsType = {
  username: 'shenqz',
  password: '111111',
  code: '',
  uuid: ''
}

const Login: FC = () => {
  const [loading, setLoading] = useState(false)
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeUrl, setCodeUrl] = useState('')
  const [uuid, setUuid] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const token = getToken(ACCESS_TOKEN)
  const onFinished = async (form: LoginParamsType) => {
    setLoading(true)
    try {
      await dispatch(await loginAsync({ ...form, uuid }))
      setLoading(false)
      const from = (location.state as any)?.from || { pathname: '/dashboard' }
      navigate(from)
    } catch (error) {
      getImageCode()
      setLoading(false)
    }
  }

  const getImageCode = async () => {
    try {
      setCodeLoading(true)
      const {
        data: { code, uuid }
      } = await getImgCode()
      setCodeLoading(false)
      setCodeUrl(code)
      setUuid(uuid)
    } catch (error) {
      setCodeLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate({ pathname: '/dashboard' })
    }
  }, [navigate, token])

  useEffect(() => {
    getImageCode()
  }, [])

  return (
    <div className="login-page">
      <div className="login-page-content">
        <div className="login-page-title">
          <img src={Logo} alt="" />
          <span>星瀚艺术CMS</span>
        </div>
        <Form onFinish={onFinished} size="large" className="login-page-form" initialValues={initialValues}>
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
            <Input type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Row gutter={8}>
              <Col span={16}>
                <Form.Item name="code" noStyle rules={[{ required: true, message: '请输入验证码！' }]}>
                  <Input maxLength={5} placeholder="验证码" />
                </Form.Item>
              </Col>
              <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {!codeLoading ? (
                  <img src={codeUrl} style={{ cursor: 'pointer' }} alt="验证码" onClick={getImageCode} />
                ) : (
                  <Spin indicator={antIcon} />
                )}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button htmlType="submit" type="primary" loading={loading} className="login-page-form_button">
              登录
            </Button>
          </Form.Item>
        </Form>
        <p className="login-page-footer">星瀚艺术CMS管理系统由xh-shen独立制作驱动</p>
      </div>
    </div>
  )
}

export default Login
