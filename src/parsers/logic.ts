import { Element, LogicalOperator, RelationalOperator } from '../enums'
import { BetweenExpression, EndsWithExpression, EqualExpression, type Expression, GreaterThanExpression, GreaterThanOrEqualExpression, IncludesExpression, LessThanExpression, LessThanOrEqualExpression, NotEqualExpression, NotIncludesExpression, StartsWithExpression } from '../expressions'
import { type IBetween, type IExpression, type ILogic, type ILogicGroup, type ILogicParserOptions } from '../interfaces/common'

/**
     * Parses rule expressions based on a set of rules and data context.
     * @throws Error if an error occurs during parsing.
     */
export class LogicParser {
  private readonly options: ILogicParserOptions

  /**
         * Creates an instance of LogicParser with optional parsing options.
         * @param options - Parsing options for the rule parser.
         */
  constructor (options?: ILogicParserOptions) {
    this.options = options ?? {
      resultWhenEmpty: false,
      returnFalseWhenError: false
    }
  }

  evaluate (parsable: ILogicGroup | IExpression, data: object): boolean {
    return (parsable.type === Element.GROUP)
      ? this.evaluateGroup(parsable, data)
      : (parsable.type === Element.EXPRESSION)
          ? this.evaluateExpression(parsable, data)
          : false
  }

  /**
         * Evaluates a rule group and its contained rules using the provided data object.
         * @param ruleGroup - The rule group to parse.
         * @param data - The data object to use as context.
         * @returns True if the rule group is satisfied, otherwise false.
         */
  private evaluateGroup (ruleGroup: ILogicGroup, data: object): boolean {
    const { rules } = ruleGroup

    if (!rules?.length) return this.options.resultWhenEmpty
    if (rules[0].type === Element.LOGIC) throw new Error('First rule cannot be a ILogic operator')

    let result = this.evaluate(rules[0], data)

    for (let i = 1; i < rules.length; i += 2) {
      const logic = rules[i] as ILogic
      const rule = rules[i + 1] as IExpression | ILogicGroup
      result = (logic.operator === LogicalOperator.AND)
        ? result && this.evaluate(rule, data)
        : result || this.evaluate(rule, data)
    }

    return result
  }

  private evaluateExpression (expr: IExpression, data: object): boolean {
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
