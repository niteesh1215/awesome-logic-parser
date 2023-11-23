import { Pipe } from './pipe'
import { parse, parseISO } from 'date-fns'
/**
 * Converts a string to a Date object.
 */
export default class ToDatePipe extends Pipe {
  /**
   *
   * @param value value to be converted to date
   * @param formatStr date format string {@link https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table}
   * @returns {Date}
   */
  transform (value: string, formatStr: string): Date {
    formatStr = formatStr.trim()
    if (formatStr.startsWith('\'') && formatStr.endsWith('\'')) formatStr = formatStr.slice(1, -1)
    switch (formatStr) {
      case 'ISO': return parseISO(value)
      case 'EPOCH_SECONDS': return new Date(parseInt(value) * 1000)
      case 'EPOCH_MILLISECONDS': return new Date(parseInt(value))
      default: return parse(value, formatStr, new Date())
    }
  }
}
