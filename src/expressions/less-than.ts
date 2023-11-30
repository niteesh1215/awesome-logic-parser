import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
     * Represents a less than expression.
     */
export class LessThanExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.LT, right)
  }

  protected validate (left: any, right: any): boolean {
    switch (typeof left) {
      case 'number':
        return left < Number(right)
    }

    return false
  }
}
