import { Expression } from './expression'

/**
     * Represents an ends with expression.
     */
export class EndsWithExpression extends Expression {
  /**
           * Parses the ends with expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is satisfied, otherwise false.
           */
  parse (data: object): boolean {
    const left = this.parseLeft(data)
    const right = this.parseRight(data)

    switch (typeof left) {
      case 'string':
        return left.endsWith(right)
      default:
        throw new Error('Left side of expression must be a string')
    }
  }
}
