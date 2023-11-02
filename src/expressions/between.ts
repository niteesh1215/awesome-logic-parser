import { MultipleVariableParser } from '..'
import { type IBetween } from '../interfaces/common'
import { Expression } from './expression'

/**
     * Represents a between expression.
     */
export class BetweenExpression extends Expression<string, IBetween> {
  /**
           * Parses the between expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is satisfied, otherwise false.
           */
  parse (data: object): boolean {
    const left = this.parseLeft(data)
    const multiParser = new MultipleVariableParser()
    const between: IBetween = this.right as unknown as IBetween
    const start = multiParser.parse(between.start, data)
    const end = multiParser.parse(between.end, data)

    switch (typeof left) {
      case 'number':
        return left >= Number(start) && left <= Number(end)
      default:
        return false
    }
  }
}
