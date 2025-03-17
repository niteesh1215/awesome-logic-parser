import { Pipe } from './pipe'
/**
 * Converts a value to a string.
 * @param value The value to convert.
 * @returns {string} The string value of the input.
 */

export default class ToStringPipe extends Pipe {
  transform (value: unknown, formatStr: string): string {
    if (!value) return ''
    return String(value)
  }
}
