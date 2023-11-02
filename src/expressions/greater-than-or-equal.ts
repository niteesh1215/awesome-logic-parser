import { RelationalOperator } from '..'
import { Expression } from './expression'
import { LessThanExpression } from './less-than'

/**
     * Represents a greater than or equal expression.
     */
export class GreaterThanOrEqualExpression extends Expression {
  /**
           * Parses the greater than or equal expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is satisfied, otherwise false.
           */
  parse (data: object): boolean {
    return !new LessThanExpression(this.left, RelationalOperator.LT, this.right).parse(data)
  }
}
