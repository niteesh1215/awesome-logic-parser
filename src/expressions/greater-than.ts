import { Expression } from './expression'

/**
     * Represents a greater than expression.
     */
export class GreaterThanExpression extends Expression {
  /**
           * Parses the greater than expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is satisfied, otherwise false.
           */
  parse (data: object): boolean {
    const left = this.parseLeft(data)
    const right = this.parseRight(data)

    switch (typeof left) {
      case 'number':
        return left > Number(right)
      default:
        throw new Error('Left side of expression must be a number')
    }
  }
}
