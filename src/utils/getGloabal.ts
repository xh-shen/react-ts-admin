/*
 * @Author: shen
 * @Date: 2020-08-26 17:53:07
 * @LastEditors: shen
 * @LastEditTime: 2020-09-13 09:20:54
 * @Description: 获取全局配置
 */
export function getGlobalState() {
  const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'MOBILE' : 'DESKTOP'
  const collapsed = device !== 'DESKTOP'
  return {
    device,
    collapsed
  } as const
}
