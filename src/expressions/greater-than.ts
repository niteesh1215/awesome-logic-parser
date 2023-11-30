import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
     * Represents a greater than expression.
     */
export class GreaterThanExpression extends Expression {
  constructor (left: string, right: string | number) {
    super(left, RelationalOperator.GT, String(right))
  }

  protected validate (left: any, right: any): boolean {
    switch (typeof left) {
      case 'number':
        return left > Number(right)
    }

    return false
  }
}
