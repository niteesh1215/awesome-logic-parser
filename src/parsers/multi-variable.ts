import { type Variable } from '../interfaces/common'
import { type IParserOptions } from '../interfaces/parser-options'
import Parser from './parser'
import { SingleVariableParser } from './single-variable'

/**
     * Parses a string expression containing multiple variables using data as context.
     */
export class MultipleVariableParser extends Parser {
  private readonly singleVariableParser: SingleVariableParser

  constructor (options?: Partial<IParserOptions>) {
    super(options)
    this.singleVariableParser = new SingleVariableParser({ ...options, returnFirstValueForArraySubField: true })
  }

  /**
         * Parses the specified parsable expression and replaces variable placeholders with their corresponding values.
         * @param parsable - The expression to parse.
         * @param data - The data object to use as context.
         * @returns The parsed expression with variables replaced.
         */
  parse<T = string>(parsable: string, data: object): T {
    parsable = parsable.replace(this.options.regex as RegExp, (match, placeholder) => {
      const value = this.singleVariableParser.parse(placeholder, data)
      return String(value)
    })

    return parsable as T
  }

  getVariables (parsable: string): Variable[] {
    const variables: Variable[] = []

    const iterator = parsable.matchAll(this.options.regex as RegExp)
    for (const match of iterator) {
      const value = this.singleVariableParser.getVariable(match[1])
      variables.push(value)
    }

    return variables
  }
}
