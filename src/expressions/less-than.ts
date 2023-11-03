import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
     * Represents a less than expression.
     */
export class LessThanExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.LT, right)
  }

  /**
           * Parses the less than expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is satisfied, otherwise false.
           */
  parse (data: object): boolean {
    const left = this.parseLeft(data)
    const right = this.parseRight(data)

    return this.validate(left, right)
  }

  private validate (left: any, right: any): boolean {
    if (Array.isArray(left)) {
      return left.some((e) => {
        return this.validate(e, right)
      })
    }

    switch (typeof left) {
      case 'number':
        return left < Number(right)
    }

    return false
  }
}
