import { Pipe } from './pipe'
/**
 * Converts a value to a boolean.
 * @param value The value to convert.
 * @returns {boolean} The boolean value of the input.
 */

export default class ToBooleanPipe extends Pipe {
  transform (value: unknown, formatStr: string): boolean {
    if (!value) return false
    else if (typeof value === 'number') return !!value
    // Check if value is an object or array
    else if (Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]') return false
    return !!String(value).trim()
  }
}
