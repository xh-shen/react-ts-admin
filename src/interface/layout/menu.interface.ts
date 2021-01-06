export interface MenuItem {
  id: string
  pid: string
  name: string
  title: string
  icon?: string
  path: string
  children?: MenuItem[]
}

export type MenuChild = Omit<MenuItem, 'children'>

export type MenuList = MenuItem[]
