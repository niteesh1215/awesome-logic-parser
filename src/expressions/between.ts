import { RelationalOperator } from '..'
import { type IBetween } from '../interfaces/logic-parser'
import { Expression } from './expression'

/**
     * Represents a between expression.
     */
export class BetweenExpression extends Expression<string, IBetween> {
  constructor (left: string, right: IBetween) {
    super(left, RelationalOperator.BETWEEN, right)
  }

  /**
           * Parses the between expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is satisfied, otherwise false.
           */
  parse (data: object): boolean {
    const left = this.parseLeft(data)

    const between: IBetween = this.right as unknown as IBetween
    const start = this.multipleVariableParser.parse(String(between.start), data)
    const end = this.multipleVariableParser.parse(String(between.end), data)

    return this.validate(left, start, end)
  }

  private validate (left: any, start: any, end: any): boolean {
    if (Array.isArray(left)) {
      return left.some((e) => {
        return this.validate(e, start, end)
      })
    }
    switch (typeof left) {
      case 'number':
        return left >= Number(start) && left <= Number(end)
    }
    return false
  }
}
