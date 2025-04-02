import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
 * Represents an is-empty expression.
 */
export class IsEmptyExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.IS_EMPTY, right)
  }

  protected validate (left: any[], right: any): boolean {
    // Check if incoming left is an array or not
    if (!Array.isArray(left)) return false

    if (right && right === 'true') return left.length === 0
    return false
  }
}
