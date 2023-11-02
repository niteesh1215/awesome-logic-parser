import { Expression } from './expression'

/**
     * Represents an equal expression.
     */
export class EqualExpression extends Expression {
  /**
           * Parses the equal expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is satisfied, otherwise false.
           */
  parse (data: object): boolean {
    const left = this.parseLeft(data)
    const right = this.parseRight(data)

    // eslint-disable-next-line eqeqeq
    return left == right
  }
}
