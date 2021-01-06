const sonsTree = (obj: { id: any; children: any[] }, arr: string | any[]) => {
  const children = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].pid === obj.id) {
      sonsTree(arr[i], arr)
      children.push(arr[i])
    }
  }
  obj.children = children
  return obj
}

export const toTree = (data: string | any[]) => {
  const treeArr = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].pid === '') {
      const o = sonsTree(data[i], data)
      treeArr.push(o)
    }
  }
  return treeArr
}

export const waitTime = (time = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
