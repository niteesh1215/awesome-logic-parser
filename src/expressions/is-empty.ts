import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
 * Represents an is-empty expression.
 */
export class IsEmptyExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.IS_EMPTY, right)
  }

  protected validate (left: any, right: any): boolean {
    const isRightTruthy = right === 'true'

    if (typeof left === 'string') {
      return (left.length === 0) === isRightTruthy
    }

    if (Array.isArray(left)) {
      return (left.length === 0) === isRightTruthy
    }

    return false
  }
}
