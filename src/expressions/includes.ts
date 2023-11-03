import { RelationalOperator } from '..'
import { Expression } from './expression'

/**
     * Represents an includes expression.
     */
export class IncludesExpression extends Expression {
  constructor (left: string, right: string) {
    super(left, RelationalOperator.INCLUDES, right)
  }

  /**
           * Parses the includes expression using the provided data object.
           * @param data - The data object to use as context.
           * @returns True if the expression is satisfied, otherwise false.
           */
  parse (data: object): boolean {
    const left = this.parseLeft(data)
    const right = this.parseRight(data)

    return this.validate(left, right)
  }

  private validate (left: any, right: any): boolean {
    if (Array.isArray(left)) {
      // is left an array of arrays?
      if (left.every(Array.isArray)) {
        return left.some((e) => {
          return this.validate(e, right)
        })
      }

      return left.includes(right)
    }

    switch (typeof left) {
      case 'string':
        return left.includes(right)
    }

    return false
  }
}
