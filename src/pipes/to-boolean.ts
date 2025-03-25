import { Pipe } from './pipe'
/**
 * Converts a value to a boolean.
 * @param value The value to convert.
 * @returns {boolean} The boolean value of the input.
 */

export default class ToBooleanPipe extends Pipe {
  transform (value: unknown, formatStr: string): boolean {
    if (!value) return false
    if (typeof value === 'boolean') return value
    if (typeof value === 'number') return value !== 0
    if (value === 'true') return true
    if (value === 'false') return false

    return !!String(value)
  }
}
