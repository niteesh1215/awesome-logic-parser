import { type IVariable } from '../interfaces/common'
import { type ITemplateParserOptions } from '../interfaces/parser-options'
import Parser from './parser'
import { VariableParser } from './variable'

/**
     * Parses template string using data as context.
     */
export class TemplateParser extends Parser<ITemplateParserOptions> {
  private readonly variableParser: VariableParser

  constructor (options?: ITemplateParserOptions) {
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
      return this.options?.stringifier ? this.options.stringifier(value, match) : String(value)
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
