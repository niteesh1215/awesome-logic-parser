import { Pipe } from './pipe'
/**
 * Converts a value to a number.
 * @param value The value to convert.
 * @returns {number} The number value of the input.
 */

export default class ToNumberPipe extends Pipe {
  // formatStr can be anything in future like fixed point length in case of floating numbers
  transform (value: unknown, formatStr: string): number {
    if (!Number(value)) throw new Error('Not a valid number')
    return Number(value)
  }
}
