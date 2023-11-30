import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
     * Represents a less than or equal expression.
     */
export class LessThanOrEqualExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.LTE, right)
  }

  protected validate (left: any, right: any): boolean {
    switch (typeof left) {
      case 'number':
        return left <= Number(right)
    }

    return false
  }
}
