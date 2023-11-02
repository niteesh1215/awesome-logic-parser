import Parser from './parser'
import { SingleVariableParser } from './single-variable'

/**
     * Parses a string expression containing multiple variables using data as context.
     */
export class MultipleVariableParser extends Parser {
  /**
         * Parses the specified parsable expression and replaces variable placeholders with their corresponding values.
         * @param parsable - The expression to parse.
         * @param data - The data object to use as context.
         * @returns The parsed expression with variables replaced.
         */
  parse<T = string>(parsable: string, data: object): T {
    const singleVariableParser = new SingleVariableParser()
    parsable = parsable.replace(/\$\{(.*?)\}/g, (match, placeholder) => {
      const value = singleVariableParser.parse(placeholder, data)
      return String(value)
    })

    return parsable as T
  }
}
