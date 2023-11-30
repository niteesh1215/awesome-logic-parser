import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
     * Represents an equal expression.
     */
export class EqualExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.EQ, right)
  }

  protected validate (left: any, right: any): boolean {
    switch (typeof left) {
      case 'boolean': right = right === 'true'; break
    }

    // eslint-disable-next-line eqeqeq
    return left == right
  }
}
