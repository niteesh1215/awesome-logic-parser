import { RelationalOperator } from '..'
import { Expression } from './expression'
import { GreaterThanExpression } from './greater-than'

/**
     * Represents a less than or equal expression.
     */
export class LessThanOrEqualExpression extends Expression {
  /**
           * Parses the less than or equal expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is satisfied, otherwise false.
           */
  parse (data: object): boolean {
    return !new GreaterThanExpression(this.left, RelationalOperator.GT, this.right).parse(data)
  }
}
