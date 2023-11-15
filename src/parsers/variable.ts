/* eslint-disable no-new-func */
/* eslint-disable @typescript-eslint/no-implied-eval */

import { type Variable } from '../interfaces/common'
import { type IVariableParserOptions } from '../interfaces/parser-options'
import { type Pipe } from '../pipes/pipe'
import ToDatePipe from '../pipes/to-date'
import Parser from './parser'

/**
 * Parses a single variable from a string expression using data as context.
 */
export class VariableParser extends Parser<IVariableParserOptions> {
  /**
         * Parses the specified parsable expression and returns the result.
         * @param parsable - The expression to parse.
         * @param data - The data object to use as context.
         * @returns The parsed value.
         */
  parse<T = any>(parsable: string, data: object): T {
    const variable = this.getVariable(parsable)
    const result = this.extractValueFromKey(variable.key, data)
    const value = this.options.returnFirstValueForArraySubField && Array.isArray(result)
      ? result[0]
      : result

    return variable.pipes.reduce((acc, pipe) => this.applyPipe(acc, pipe), value)
  }

  private applyPipe (value: string, pipe: string): any {
    pipe = pipe.trim()
    const [name, ...formatStrArr] = pipe.split(':')
    const formatStr = formatStrArr.join(':')
    const pipeInstance = this.getPipe(name)
    return pipeInstance.transform(value, formatStr)
  }

  private getPipe (name: string): Pipe {
    switch (name) {
      case 'toDate': return new ToDatePipe()
      default: throw new Error(`Pipe ${name} not found`)
    }
  }

  /**
 * Extracts a value from an object using a key string.
 * @param key - The key string to specify the path to the value in the object.
 * @param obj - The object from which to extract the value.
 * @returns The extracted value or undefined if not found.
 */
  private extractValueFromKey (key: string, obj: any): any {
    const keys = key.split('.') // Split the key by dots
    let value = obj

    for (const k of keys) {
      if (k === '$') {
        // If the key part is "$," treat it as an array index
        if (Array.isArray(value)) {
          // Flatten the array of objects into a single object
          const tempObject: Record<string, any> = {}
          value.forEach((e) => {
            if (typeof e === 'object') {
              Object.keys(e).forEach((k) => {
                if (tempObject[k] === undefined) {
                  tempObject[k] = []
                }
                tempObject[k].push(e[k])
              })
            }
          })
          value = tempObject
        }
      } else if (Array.isArray(value)) {
        // If the key part is not "$" but the value is an array, return the array
        return value
      } else {
        value = value[k] // Navigate deeper into the object
      }

      if (value === undefined) {
        // Handle undefined values
        return undefined
      }
    }

    return value
  }

  getVariable (parsable: string): Variable {
    parsable = parsable.trim()

    const extract = (str: string): Variable => {
      const parts = str.split('|').map(x => x.trim())
      return {
        key: parts[0],
        pipes: parts.slice(1)
      }
    }

    const iterator = parsable.matchAll(this.options.regex as RegExp)

    const match1 = iterator.next()
    if (match1.done) {
      return extract(parsable)
    }

    const match2 = iterator.next()
    if (!match2.done) {
      throw new Error(`Multiple variables found in ${parsable}`)
    }

    return extract(match1.value[1])
  }
}