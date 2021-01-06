/*
 * @Author: shen
 * @Date: 2020-10-09 16:21:03
 * @LastEditors: shen
 * @LastEditTime: 2020-10-09 21:30:26
 * @Description:
 */
import { useState } from 'react'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import { FormItem } from './BaseForm'

export type ItemsState = {
  hidden?: boolean
}

export interface UseCounterProps {
  itemsStateMap?: {
    [key: string]: ItemsState
  }
  onItemsStateChange?: (map: { [key: string]: ItemsState }) => void
}

function useCounter(props: UseCounterProps = {}) {
  const [items, setItems] = useState<FormItem[]>([])

  const [itemsStateMap, setItemsStateMap] = useMergedState<{
    [key: string]: ItemsState
  }>(props.itemsStateMap || {}, {
    value: props.itemsStateMap,
    onChange: props.onItemsStateChange
  })

  return {
    items,
    setItems,
    itemsStateMap,
    setItemsStateMap
  }
}

export default useCounter
