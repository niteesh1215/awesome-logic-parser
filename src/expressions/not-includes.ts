import { RelationalOperator } from '..'
import { Expression } from './expression'
import { IncludesExpression } from './includes'

/**
     * Represents a not includes expression.
     */
export class NotIncludesExpression extends Expression {
  /**
           * Parses the not includes expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is not satisfied, otherwise false.
           */
  parse (data: object): boolean {
    return !new IncludesExpression(this.left, RelationalOperator.INCLUDES, this.right).parse(data)
  }
}
