import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
     * Represents an ends with expression.
     */
export class EndsWithExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.ENDSWITH, right)
  }

  protected validate (left: any, right: any): boolean {
    switch (typeof left) {
      case 'string':
        return left.endsWith(right)
    }
    return false
  }
}
