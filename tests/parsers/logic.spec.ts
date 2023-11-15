/* eslint-disable no-template-curly-in-string */
import { Element, type ILogicGroup, LogicParser, LogicalOperator, RelationalOperator } from '../../src'

describe('Logic Parser', () => {
  // Sample data
  const data = {
    age: 25,
    name: 'John',
    hobbies: ['reading', 'swimming'],
    city: 'New York',
    text: 'Hello, World'
  }

  it('case 1: it should return true', () => {
    // Define variables for testing
    const minAge = 18
    const maxAge = 30
    const targetCity = 'New York'
    const startsWith = 'Jo'
    const hobby = 'swimming'
    const endsWith = 'World'

    // Sample rules
    const logicGroup: ILogicGroup = {
      type: Element.GROUP,
      rules: [
        // Relational operators
        {
          type: Element.EXPRESSION,
          left: '{age}',
          operator: RelationalOperator.GTE,
          right: `${minAge}`
        },
        {
          type: Element.LOGIC,
          operator: LogicalOperator.AND
        },
        {
          type: Element.EXPRESSION,
          left: '{city}',
          operator: RelationalOperator.EQ,
          right: `${targetCity}`
        },
        {
          type: Element.LOGIC,
          operator: LogicalOperator.AND
        },
        {
          type: Element.EXPRESSION,
          left: '{name}',
          operator: RelationalOperator.STARTSWITH,
          right: `${startsWith}`
        },
        {
          type: Element.LOGIC,
          operator: LogicalOperator.AND
        },
        {
          type: Element.EXPRESSION,
          left: '{hobbies}',
          operator: RelationalOperator.INCLUDES,
          right: `${hobby}`
        },
        {
          type: Element.LOGIC,
          operator: LogicalOperator.AND
        },
        {
          type: Element.EXPRESSION,
          left: '{text}',
          operator: RelationalOperator.ENDSWITH,
          right: `${endsWith}`
        },
        {
          type: Element.LOGIC,
          operator: LogicalOperator.AND
        },
        {
          type: Element.EXPRESSION,
          left: '{age}',
          operator: RelationalOperator.BETWEEN,
          right: {
            start: `${minAge}`,
            end: `${maxAge}`
          } as any
        },
        {
          type: Element.GROUP,
          rules: [
            {
              type: Element.EXPRESSION,
              left: '{age}',
              operator: RelationalOperator.GTE,
              right: `${minAge}`
            },
            {
              type: Element.LOGIC,
              operator: LogicalOperator.AND
            },
            {
              type: Element.EXPRESSION,
              left: '{city}',
              operator: RelationalOperator.EQ,
              right: `${targetCity}`
            },
            {
              type: Element.LOGIC,
              operator: LogicalOperator.AND
            },
            {
              type: Element.EXPRESSION,
              left: '{name}',
              operator: RelationalOperator.STARTSWITH,
              right: `${startsWith}`
            },
            {
              type: Element.LOGIC,
              operator: LogicalOperator.AND
            },
            {
              type: Element.EXPRESSION,
              left: '{hobbies}',
              operator: RelationalOperator.INCLUDES,
              right: `${hobby}`
            },
            {
              type: Element.LOGIC,
              operator: LogicalOperator.AND
            },
            {
              type: Element.EXPRESSION,
              left: '{text}',
              operator: RelationalOperator.ENDSWITH,
              right: `${endsWith}`
            },
            {
              type: Element.LOGIC,
              operator: LogicalOperator.AND
            },
            {
              type: Element.EXPRESSION,
              left: '{age}',
              operator: RelationalOperator.BETWEEN,
              right: {
                start: `${minAge}`,
                end: `${maxAge}`
              } as any
            }
          ]
        }
      ]
    }

    const logicParser = new LogicParser({
      resultWhenEmpty: false,
      returnFalseWhenError: true
    })

    const result = logicParser.parse(logicGroup, data)
    expect(result).toBe(true)
  })

  it('case 2: it should return true', () => {
    const logicGroup = {
      type: 'group',
      rules: [
        {
          type: 'expr',
          left: '{body.$.Is_enabled}',
          operator: 'EQ',
          right: 'true'
        },
        {
          type: 'logic',
          operator: 'OR'
        },
        {
          type: 'expr',
          left: '{body.$.Phone}',
          operator: 'LTE',
          right: '917011396497'
        },
        {
          type: 'logic',
          operator: 'OR'
        },
        {
          type: 'expr',
          left: '{body.$.Place}',
          operator: 'INCLUDES',
          right: 'L'
        }
      ]
    } as any

    const data = {
      body: [
        {
          Is_enabled: true,
          Place: 'Lucknow',
          Phone: 917011396497,
          Status: 'Complicated'
        }
      ]
    }

    const logicParser = new LogicParser({
      resultWhenEmpty: false,
      returnFalseWhenError: true
    })

    const result = logicParser.parse(logicGroup, data)
    expect(result).toBe(true)
  })
})
