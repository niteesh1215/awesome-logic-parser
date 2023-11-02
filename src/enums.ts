/**
     * Enumeration of relational operators.
     */
export const enum RelationalOperator {
  EQ = 'EQ',
  NEQ = 'NEQ',
  GTE = 'GTE',
  LTE = 'LTE',
  GT = 'GT',
  LT = 'LT',
  STARTSWITH = 'STARTSWITH',
  INCLUDES = 'INCLUDES',
  NOT_INCLUDES = 'NOT_INCLUDES',
  BETWEEN = 'BETWEEN',
  ENDSWITH = 'ENDSWITH'
}

/**
     * Enumeration of logical operators.
     */
export const enum LogicalOperator {
  AND = 'AND',
  OR = 'OR'
}

/**
     * Enumeration of rule types.
     */
export const enum Element {
  EXPRESSION = 'expr',
  LOGIC = 'logic',
  GROUP = 'group'
}
