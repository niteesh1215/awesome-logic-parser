import { Pipe } from './pipe'
/**
 * Splits a string into an array of substrings separated by a delimiter.
 *
 * Examples:
 *
 * - `{{ 'a,b,c' | split: ',' }}` => `['a', 'b', 'c']`
 * - `{{ 'a,b,c' | split }}` => `['a,b,c']`
 * - `{{ ['a', 'b', 'c'] | split: ',' }}` => `['a', 'b', 'c']`
 * - `{{ null | split: ',' }}` => `[]`
 *
 * @param delimiter the separator character(s) to split the string on. Defaults to `,`
 * @return the array of substrings
 */

export default class SplitPipe extends Pipe {
  transform (value: unknown, delimiter: string = ','): unknown[] {
    if (value === null || value === undefined || value === '') {
      return []
    }

    if (Array.isArray(value)) {
      return value
    }

    if (typeof value !== 'string') {
      value = String(value)
    }

    return (value as string).split(delimiter).map(item => item.trim())
  }
}
