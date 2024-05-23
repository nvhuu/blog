import { weekDays } from '~/constants'
import { DateInfoType } from '~/types'

export default class AppUtils {
  static getDate = (date: Date) => {
    return date.getDate()
  }
  static getCurrentDate = () => {
    const currentDate = new Date()
    return currentDate.getDate().toString().padStart(2, '0')
  }
  static getDay = (date: Date) => {
    return date.getDay()
  }
  static getCurrentDay = () => {
    const currentDate = new Date()
    return currentDate.getDay()
  }
  static getCurrentWeek = () => {
    const currentDate = new Date()
    const currentDay = currentDate.getDay()
    const daysInWeek = 7
    const firstDayOfWeek = new Date(
      currentDate.getTime() - (currentDay === 0 ? 6 : currentDay - 1) * 24 * 60 * 60 * 1000
    )
    const week: Array<DateInfoType> = []
    for (let i = 0; i < daysInWeek; i++) {
      const day = new Date(firstDayOfWeek)
      day.setDate(firstDayOfWeek.getDate() + i)

      const dateInfo: DateInfoType = {
        dayName: weekDays[day.getDay()].slice(0, 3),
        date: day.getDate().toString().padStart(2, '0'),
        month: (day.getMonth() + 1).toString().padStart(2, '0'),
        year: day.getFullYear().toString(),
        dateString: `${day.getDate().toString().padStart(2, '0')}_${(day.getMonth() + 1).toString().padStart(2, '0')}_${day.getFullYear()}`
      }
      week.push(dateInfo)
    }

    return week
  }

  static cloneDeep = (value: any) => {
    return JSON.parse(JSON.stringify(value))
  }
}
