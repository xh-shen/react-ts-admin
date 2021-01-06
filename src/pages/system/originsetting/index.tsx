import React, { useState } from 'react'
import MultiColumn from '@/components/MultiColumn'
import PrivateButton from '@/components/PrivateButton'
import UserList from './components/UserList'
import SchoolTree from './components/SchoolTree'
import SchoolForm from './components/SchoolForm'
import { DrawerForm, FormItem, ItemsState } from '@/components/SuperForm'
import Modal from 'antd/lib/modal/Modal'

const Originsetting = () => {
  const [schoolModalVisible, setSchoolModalVisible] = useState(false)
  const [schoolModalTitle, setSchoolModalTitle] = useState('新建校区')
  const hideSchoolModal = () => {
    setSchoolModalVisible(false)
  }
  return (
    <>
      <MultiColumn
        leftWidth={400}
        top={
          <PrivateButton.Group type="primary">
            <PrivateButton
              label="新建学校"
              privateName="create-school"
              onClick={() => {
                setSchoolModalVisible(true)
              }}
            />
            {/* <PrivateButton label="新建用户" /> */}
          </PrivateButton.Group>
        }
        left={<SchoolTree />}
        right={<UserList />}
      />
      {/* <Modal width={750} title={schoolModalTitle} visible={schoolModalVisible} onCancel={hideSchoolModal}>
        <SchoolTree />
      </Modal> */}
    </>
  )
}

export default Originsetting
