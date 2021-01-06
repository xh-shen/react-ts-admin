import React, { FC, useState, useEffect, useCallback } from 'react'
import { Modal, Tree, Spin } from 'antd'
import { Role } from '@/interface/permission/role.interface'
import { useLocale } from '@/locales'
import { getMenuList } from '@/api/layout.api'
import { useSelector } from 'react-redux'
import { StoreState } from '@/stores'
import usePrevious from '@/hooks/usePrevious'
import { TreeNodeNormal } from 'antd/lib/tree/Tree'
import { MenuItem } from '@/stores/types/user.type'

interface Values extends Role {}

interface RoleModifyDialogProps {
  values: Values
  visible: boolean
  onAuthorize: (values: string[]) => void
  onCancel: () => void
}

const RoleAuthorizeDialog: FC<RoleModifyDialogProps> = ({ onAuthorize, onCancel, visible, values }) => {
  const { menuList } = useSelector((state: StoreState) => state.user)
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [treeData, setTreeData] = useState<TreeNodeNormal[]>([])
  const { locale } = useSelector((state: StoreState) => state.app)
  const { formatMessage } = useLocale()
  const prevRoleId = usePrevious(values.id)
  const prevLocale = usePrevious(locale)
  const onSubmit = async () => {
    onAuthorize(checkedKeys)
  }

  const initData = useCallback(async () => {
    const { result, status } = await getMenuList()
    if (status) {
      // format treeData
      setTreeData(
        result.map(a => ({
          title: a.title,
          key: a.id,
          children: a.children?.map(b => ({
            title: b.title,
            key: b.id
          }))
        }))
      )
    }
  }, [])

  // Set the checkedKeys when the user menu list is loaded
  useEffect(() => {
    if (menuList.length) {
      setCheckedKeys(menuList.map((m: MenuItem) => m.id))
    }
  }, [menuList])

  useEffect(() => {
    // Optimize: Opening a dialog repeatedly will not trigger initData method. #usePrevious hooks
    // Locale changed will trigger initData in any case.
    if ((visible && prevRoleId !== values.id) || prevLocale !== locale) {
      console.log('initData')
      initData()
    }
  }, [initData, visible, prevRoleId, values.id, prevLocale, locale])

  return (
    <Modal
      title={formatMessage({ id: 'gloabal.tips.authorize' })}
      visible={visible}
      onOk={onSubmit}
      onCancel={onCancel}
    >
      {treeData.length ? (
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={keys => setCheckedKeys(keys as string[])}
          treeData={treeData}
        />
      ) : (
        <Spin />
      )}
    </Modal>
  )
}

export default RoleAuthorizeDialog
