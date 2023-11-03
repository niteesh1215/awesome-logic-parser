import { Element, LogicalOperator, RelationalOperator } from '../enums'
import { BetweenExpression } from '../expressions/between'
import { EndsWithExpression } from '../expressions/ends-with'
import { EqualExpression } from '../expressions/equal'
import { type Expression } from '../expressions/expression'
import { GreaterThanExpression } from '../expressions/greater-than'
import { GreaterThanOrEqualExpression } from '../expressions/greater-than-or-equal'
import { IncludesExpression } from '../expressions/includes'
import { LessThanExpression } from '../expressions/less-than'
import { LessThanOrEqualExpression } from '../expressions/less-than-or-equal'
import { NotEqualExpression } from '../expressions/not-equal'
import { NotIncludesExpression } from '../expressions/not-includes'
import { StartsWithExpression } from '../expressions/starts-with'
import { type IBetween, type IExpression, type ILogic, type ILogicGroup, type ILogicParserOptions } from '../interfaces/common'
import Parser from './parser'

/**
     * Parses rule expressions based on a set of rules and data context.
     * @throws Error if an error occurs during parsing.
     */
export class LogicParser extends Parser {
  private readonly options: ILogicParserOptions

  /**
         * Creates an instance of LogicParser with optional parsing options.
         * @param options - Parsing options for the rule parser.
         */
  constructor (options?: ILogicParserOptions) {
    super()
    this.options = options ?? {
      resultWhenEmpty: false,
      returnFalseWhenError: false
    }
  }

  parse<T = boolean>(parsable: ILogicGroup | IExpression, data: object): T {
    return (parsable.type === Element.GROUP)
      ? this.parseGroup(parsable, data) as T
      : (parsable.type === Element.EXPRESSION)
          ? this.parseExpression(parsable, data) as T
          : false as T
  }

  /**
         * Evaluates a rule group and its contained rules using the provided data object.
         * @param ruleGroup - The rule group to parse.
         * @param data - The data object to use as context.
         * @returns True if the rule group is satisfied, otherwise false.
         */
  private parseGroup (ruleGroup: ILogicGroup, data: object): boolean {
    const { rules } = ruleGroup

    if (!rules?.length) return this.options.resultWhenEmpty
    if (rules[0].type === Element.LOGIC) throw new Error('First rule cannot be a ILogic operator')

    let result = this.parse(rules[0], data)

    for (let i = 1; i < rules.length; i += 2) {
      const logic = rules[i] as ILogic
      const rule = rules[i + 1] as IExpression | ILogicGroup
      result = (logic.operator === LogicalOperator.AND)
        ? result && this.parse(rule, data)
        : result || this.parse(rule, data)
    }

    return result
  }

  private parseExpression (expr: IExpression, data: object): boolean {
    try {
      return this.getExpression(expr).parse(data)
    } catch (e) {
      if (this.options.returnFalseWhenError) return false
      throw e
    }
  }

  private getExpression (exprData: IExpression): Expression {
    const { operator, left, right } = exprData
    switch (operator) {
      case RelationalOperator.EQ:
        return new EqualExpression(left, operator, String(right))
      case RelationalOperator.NEQ:
        return new NotEqualExpression(left, operator, String(right))
      case RelationalOperator.GT:
        return new GreaterThanExpression(left, operator, String(right))
      case RelationalOperator.GTE:
        return new GreaterThanOrEqualExpression(left, operator, String(right))
      case RelationalOperator.LT:
        return new LessThanExpression(left, operator, String(right))
      case RelationalOperator.LTE:
        return new LessThanOrEqualExpression(left, operator, String(right))
      case RelationalOperator.STARTSWITH:
        return new StartsWithExpression(left, operator, String(right))
      case RelationalOperator.ENDSWITH:
        return new EndsWithExpression(left, operator, String(right))
      case RelationalOperator.INCLUDES:
        return new IncludesExpression(left, operator, String(right))
      case RelationalOperator.NOT_INCLUDES:
        return new NotIncludesExpression(left, operator, String(right))
      case RelationalOperator.BETWEEN:
        return new BetweenExpression(left, operator, right as unknown as IBetween)
      default:
        throw new Error(`RelationalOperator ${operator as string} not supported`)
    }
  }
}
