import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
     * Represents a not includes expression.
     */
export class NotIncludesExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.NOT_INCLUDES, right)
  }

  protected validate (left: any, right: any): boolean {
    switch (typeof left) {
      case 'string':
        return !left.includes(right)
      default: {
        if (Array.isArray(left)) {
          return !left.includes(right)
        }
      }
    }

    return false
  }
}
