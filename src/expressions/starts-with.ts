import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
     * Represents a starts with expression.
     */
export class StartsWithExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.STARTSWITH, right)
  }

  /**
           * Parses the starts with expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is satisfied, otherwise false.
           */
  parse (data: object): boolean {
    const left = this.parseLeft(data)
    const right = this.parseRight(data)

    return this.validate(left, right)
  }

  protected validate (left: any, right: any): boolean {
    switch (typeof left) {
      case 'string':
        return left.startsWith(right)
    }

    return false
  }
}
