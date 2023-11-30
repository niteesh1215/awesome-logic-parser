import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
     * Represents an includes expression.
     */
export class IncludesExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.INCLUDES, right)
  }

  protected validate (left: any, right: any): boolean {
    switch (typeof left) {
      case 'string':
        return left.includes(right)
      default: {
        if (Array.isArray(left)) {
          return left.includes(right)
        }
      }
    }

    return false
  }
}
