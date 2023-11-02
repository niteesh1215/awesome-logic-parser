import { Expression } from './expression'

/**
     * Represents an includes expression.
     */
export class IncludesExpression extends Expression {
  /**
           * Parses the includes expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is satisfied, otherwise false.
           */
  parse (data: object): boolean {
    const left = this.parseLeft(data)
    const right = this.parseRight(data)

    switch (typeof left) {
      case 'object':
        if (!Array.isArray(left)) return false
        // eslint-disable-next-line no-fallthrough
      case 'string':
        return left.includes(right)
      default:
        throw new Error('Left side of expression must be a string or an array')
    }
  }
}
