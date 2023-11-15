import { type IParserOptions } from '../interfaces/parser-options'

export default abstract class Parser<T = IParserOptions> {
  protected readonly options: T

  constructor (options?: T) {
    this.options = Object.assign({
      regex: /\{(.*?)\}/g
    }, options ?? {}) as T
  }

  /**
   * Parses the specified parsable object and replaces variable placeholders with their corresponding values.
   * @param parsable - The object to parse.
   * @param data - The data object to use as context.
   * @returns The parsed object with variables replaced.
   */
  abstract parse<T = any>(parsable: any, data: object): T
}
