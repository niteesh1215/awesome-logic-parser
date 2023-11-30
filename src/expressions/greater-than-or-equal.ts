import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
     * Represents a greater than or equal expression.
     */
export class GreaterThanOrEqualExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.GTE, right)
  }

  protected validate (left: any, right: any): boolean {
    switch (typeof left) {
      case 'number':
        return left >= Number(right)
    }

    return false
  }
}
