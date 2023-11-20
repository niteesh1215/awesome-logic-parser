import { type IVariable } from '../interfaces/common'
import { type IParserOptions } from '../interfaces/parser-options'
import Parser from './parser'
import { VariableParser } from './variable'

/**
     * Parses template string using data as context.
     */
export class TemplateParser extends Parser {
  private readonly variableParser: VariableParser

  constructor (options?: Partial<IParserOptions>) {
    super(options)
    this.variableParser = new VariableParser({ ...options, returnFirstValueForArraySubField: true })
  }

  /**
         * Parses the specified parsable expression and replaces variable placeholders with their corresponding values.
         * @param parsable - The expression to parse.
         * @param data - The data object to use as context.
         * @returns The parsed expression with variables replaced.
         */
  parse<T = string>(parsable: string, data: object): T {
    parsable = parsable.replace(this.options.regex as RegExp, (match, placeholder) => {
      const value = this.variableParser.parse(placeholder, data)
      return String(value)
    })

    return parsable as T
  }

  getVariables (parsable: string): IVariable[] {
    const variables: IVariable[] = []

    const iterator = parsable.matchAll(this.options.regex as RegExp)
    for (const match of iterator) {
      const value = this.variableParser.getVariable(match[1])
      variables.push(value)
    }

    return variables
  }
}
