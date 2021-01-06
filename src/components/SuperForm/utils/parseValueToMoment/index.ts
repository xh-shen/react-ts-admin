/*
 * @Author: shen
 * @Date: 2020-10-19 08:32:37
 * @LastEditors: shen
 * @LastEditTime: 2020-10-19 08:44:52
 * @Description: 转moment日期格式
 */
import moment, { Moment } from 'moment'
import isNil from '../isNil'

type DateValue = moment.Moment | moment.Moment[] | string | string[] | number | number[]

const parseValueToMoment = (
  value: DateValue,
  formatter?: string
): moment.Moment | moment.Moment[] | null | undefined => {
  if (isNil(value) || moment.isMoment(value)) {
    return value as moment.Moment | null | undefined
  }
  if (Array.isArray(value)) {
    return (value as any[]).map(v => parseValueToMoment(v, formatter) as moment.Moment)
  }
  return moment(value, formatter)
}

export default parseValueToMoment
