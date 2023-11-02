/* eslint-disable no-new-func */
/* eslint-disable @typescript-eslint/no-implied-eval */

import { type Pipe } from '../pipes/pipe'
import ToDatePipe from '../pipes/to-date'
import Parser from './parser'

/**
 * Parses a single variable from a string expression using data as context.
 */
export class SingleVariableParser extends Parser {
  /**
         * Parses the specified parsable expression and returns the result.
         * @param parsable - The expression to parse.
         * @param data - The data object to use as context.
         * @returns The parsed value.
         */
  parse<T = any>(parsable: string, data: object): T {
    parsable = parsable.trim()
    parsable = parsable.replace('${', '').replace('}', '')

    const [key, pipe] = parsable.split('|').map(x => x.trim())

    const func = new Function('data', `return data.${key}`)
    const value = func(data)

    return pipe ? this.applyPipe(value, pipe) : value
  }

  private applyPipe (value: string, pipe: string): any {
    const [name, ...formatStrArr] = pipe.split(':').map(x => x.trim())
    const formatStr = formatStrArr.join(':')
    console.log(name, formatStr)
    const pipeInstance = this.getPipeClass(name)
    return pipeInstance.transform(value, formatStr)
  }

  private getPipeClass (name: string): Pipe {
    switch (name) {
      case 'toDate': return new ToDatePipe()
      default: throw new Error(`Pipe ${name} not found`)
    }
  }
}
