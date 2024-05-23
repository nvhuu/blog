import stringFormat from 'string-format'
import { ApiUrl } from '~/constants/enum'
export default class ApiUtil {
  static encodeURL = (obj: any, isHasQuery: boolean) => {
    if (!obj) {
      return ''
    }
    const str = []
    for (const p in obj)
      if (Object.prototype.hasOwnProperty.call(obj, p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
      }
    return `${isHasQuery ? '&' : '?'}${str.join('&')}`
  }
  static getApiUrl = (apiUrl: ApiUrl, params?: object | null, query?: object) => {
    let path: string = apiUrl
    if (params) {
      path = stringFormat(apiUrl, params)
    }
    const isHasQuery = path?.includes('?')
    return `${this.getApiRoot()}${path}${this.encodeURL(query, isHasQuery)}`
  }
  static getApiRoot = () => {
    const apiUrl = import.meta.env.VITE_API_URL
    return apiUrl
  }
}
