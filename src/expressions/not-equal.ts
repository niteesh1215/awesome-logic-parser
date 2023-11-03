import { RelationalOperator } from '..'
import { EqualExpression } from './equal'
import { Expression } from './expression'

/**
     * Represents a not equal expression.
     */
export class NotEqualExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.NEQ, right)
  }

  /**
           * Parses the not equal expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is not satisfied, otherwise false.
           */
  parse (data: object): boolean {
    return !new EqualExpression(this.left, this.right).parse(data)
  }
}
