/* eslint-disable no-new-func */
/* eslint-disable @typescript-eslint/no-implied-eval */
/**
 * Parses a single variable from a string expression using data as context.
 */
export class SingleVariableParser {
  /**
         * Parses the specified parsable expression and returns the result.
         * @param parsable - The expression to parse.
         * @param data - The data object to use as context.
         * @returns The parsed value.
         */
  parse (parsable: string, data: object): any {
    parsable = parsable.trim()
    parsable = parsable.replace('${', '').replace('}', '')

    const func = new Function('data', `return data.${parsable}`)
    return func(data)
  }
}
