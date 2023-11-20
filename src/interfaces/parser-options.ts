
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
  resultWhenEmpty: boolean
  returnFalseWhenError: boolean
}

/**
     * Options for the VariableParser class.
     */
export interface IVariableParserOptions extends IParserOptions {
  returnFirstValueForArraySubField?: boolean
}
