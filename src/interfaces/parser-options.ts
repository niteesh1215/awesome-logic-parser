
/**
     * The options for the Parser class.
     * regex: The regular expression to use for parsing.
     * Parses variables in the format of `{variable}` by default.
     * Defaults to `/\{(.*?)\}/g`.
     */
export interface IParserOptions {
  regex?: RegExp
}

/**
     * Options for the LogicParser class.
     */
export interface ILogicParserOptions extends IParserOptions {
  /**
   * The result to return when the expression is empty.
   */
  resultWhenEmpty: boolean
  /**
   * If true, the parser will return false when an error occurs.
   */
  returnFalseWhenError: boolean
}

/**
     * Options for the VariableParser class.
     */
export interface IVariableParserOptions extends IParserOptions {
  returnFirstValueForArraySubField?: boolean
}

/**
 * Options for the TemplateParser class.
 */

export interface ITemplateParserOptions extends IParserOptions {
  stringifier?: (value: any) => string
  keepParameterWhenUndefined?: boolean
}
