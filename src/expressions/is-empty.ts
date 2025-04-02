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
    switch (typeof left) {
      case 'string':
        if (right && right === 'true') return (left as string).length === 0
        break
      default: {
        if (Array.isArray(left) && right && right === 'true') return left.length === 0
      }
    }

    return false
  }
}
