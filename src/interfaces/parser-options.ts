
/**
     * Options for the Parser class.
     */
export interface IParserOptions {
  regex?: RegExp
}

/**
     * Options for the LogicParser class.
     */
export interface ILogicParserOptions extends IParserOptions {
  resultWhenEmpty: boolean
  returnFalseWhenError: boolean
}

/**
     * Options for the SingleVariableParser class.
     */
export interface ISingleVariableParserOptions extends IParserOptions {
  returnFirstValueForArraySubField?: boolean
}
