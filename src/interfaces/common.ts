import { Element, RelationalOperator } from "../enums"

/**
     * Represents a between condition with start and end values.
     */
export interface IBetween {
    start: string
    end: string
}

/**
     * Represents a group of rules.
     */
export interface ILogicGroup {
    type: Element.GROUP
    rules: Array<IExpression | ILogic | ILogicGroup>
}

/**
     * Represents an expression rule.
     */
export interface IExpression {
    type: Element.EXPRESSION
    left: string
    operator: RelationalOperator
    right: string
}

/**
     * Represents a logical operator in a rule group.
     */
export interface ILogic {
    type: Element.LOGIC
    operator: 'AND' | 'OR'
}



/**
     * Options for the LogicParser class.
     */
export interface ILogicParserOptions {
    resultWhenEmpty: boolean
    returnFalseWhenError?: boolean
}

