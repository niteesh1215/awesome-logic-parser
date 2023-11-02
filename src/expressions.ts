import { SingleVariableParser } from './parsers/single-variable'
import { MultipleVariableParser } from './parsers/multi-variable'
import { RelationalOperator } from './enums'
import { type IBetween } from './interfaces/common'

/**
     * Abstract base class for rule expressions.
     * @template T - Type of the left-hand side of the expression.
     * @template U - Type of the right-hand side of the expression.
     */
export abstract class Expression<T = string, U = any> {
  public readonly left: T
  public readonly operator: RelationalOperator
  public readonly right: U

  /**
         * Creates an instance of Expression.
         * @param left - The left-hand side of the expression.
         * @param operator - The relational operator.
         * @param right - The right-hand side of the expression.
         */
  constructor (left: T, operator: RelationalOperator, right: U) {
    this.left = left
    this.operator = operator
    this.right = right
  }

  /**
         * Parses the expression using the provided data object.
         * @param data - The data object to use as context.
         * @returns True if the expression is satisfied, otherwise false.
         */
  abstract parse (data: object): boolean

  protected parseLeft (data: object): any {
    const parser = new SingleVariableParser()
    if (typeof this.left !== 'string') throw new Error('Left side of expression must be a string')
    return parser.parse(this.left, data)
  }

  protected parseRight (data: object): any {
    const parser = new MultipleVariableParser()
    if (typeof this.right !== 'string') throw new Error('Right side of expression must be a string')
    return parser.parse(this.right as string, data)
  }
}

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

/**
     * Represents a not equal expression.
     */
export class NotEqualExpression extends Expression {
  /**
         * Parses the not equal expression using the provided data object.
         * @param data - The data object to use as context.
         * @returns True if the expression is not satisfied, otherwise false.
         */
  parse (data: object): boolean {
    return !new EqualExpression(this.left, RelationalOperator.EQ, this.right).parse(data)
  }
}

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

/**
     * Represents a less than expression.
     */
export class LessThanExpression extends Expression {
  /**
         * Parses the less than expression using the provided data object.
         * @param data - The data object to use as context.
         * @returns True if the expression is satisfied, otherwise false.
         */
  parse (data: object): boolean {
    const left = this.parseLeft(data)
    const right = this.parseRight(data)

    switch (typeof left) {
      case 'number':
        return left < Number(right)
      default:
        throw new Error('Left side of expression must be a number')
    }
  }
}

/**
     * Represents a greater than or equal expression.
     */
export class GreaterThanOrEqualExpression extends Expression {
  /**
         * Parses the greater than or equal expression using the provided data object.
         * @param data - The data object to use as context.
         * @returns True if the expression is satisfied, otherwise false.
         */
  parse (data: object): boolean {
    return !new LessThanExpression(this.left, RelationalOperator.LT, this.right).parse(data)
  }
}

/**
     * Represents a less than or equal expression.
     */
export class LessThanOrEqualExpression extends Expression {
  /**
         * Parses the less than or equal expression using the provided data object.
         * @param data - The data object to use as context.
         * @returns True if the expression is satisfied, otherwise false.
         */
  parse (data: object): boolean {
    return !new GreaterThanExpression(this.left, RelationalOperator.GT, this.right).parse(data)
  }
}

/**
     * Represents a starts with expression.
     */
export class StartsWithExpression extends Expression {
  /**
         * Parses the starts with expression using the provided data object.
         * @param data - The data object to use as context.
         * @returns True if the expression is satisfied, otherwise false.
         */
  parse (data: object): boolean {
    const left = this.parseLeft(data)
    const right = this.parseRight(data)

    switch (typeof left) {
      case 'string':
        return left.startsWith(right)
      default:
        throw new Error('Left side of expression must be a string')
    }
  }
}

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

/**
     * Represents a between expression.
     */
export class BetweenExpression extends Expression<string, IBetween> {
  /**
         * Parses the between expression using the provided data object.
         * @param data - The data object to use as context.
         * @returns True if the expression is satisfied, otherwise false.
         */
  parse (data: object): boolean {
    const left = this.parseLeft(data)
    const multiParser = new MultipleVariableParser()
    const between: IBetween = this.right as unknown as IBetween
    const start = multiParser.parse(between.start, data)
    const end = multiParser.parse(between.end, data)

    switch (typeof left) {
      case 'number':
        return left >= Number(start) && left <= Number(end)
      default:
        return false
    }
  }
}
