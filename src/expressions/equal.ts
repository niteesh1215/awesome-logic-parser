import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
     * Represents an equal expression.
     */
export class EqualExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.EQ, right)
  }

  /**
           * Parses the equal expression using the provided data object.
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
    // eslint-disable-next-line eqeqeq
    return left == right
  }
}
