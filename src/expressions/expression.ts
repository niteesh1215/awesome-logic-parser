import { VariableParser } from '../parsers/variable'
import { type RelationalOperator } from '../enums'
import { TemplateParser } from '../parsers/template'

/**
     * Abstract base class for rule expressions.
     * @template T - Type of the left-hand side of the expression.
     * @template U - Type of the right-hand side of the expression.
     */
export abstract class Expression<T = string, U = any> {
  public variableParser: VariableParser = new VariableParser()
  public templateParser: TemplateParser = new TemplateParser()

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
    if (typeof this.left !== 'string') throw new Error('Left side of expression must be a string')
    return this.variableParser.parse(this.left, data)
  }

  protected parseRight (data: object): any {
    if (typeof this.right !== 'string') throw new Error('Right side of expression must be a string')
    return this.templateParser.parse(this.right as string, data)
  }
}
