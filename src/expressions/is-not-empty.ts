import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
 * Represents an non-empty expression.
 */
export class IsNotEmptyExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.IS_EMPTY, right)
  }

  protected validate (left: any[], right: any): boolean {
    if (Array.isArray(left)) {
      return left.length > 0
    }
    return false
  }
}
