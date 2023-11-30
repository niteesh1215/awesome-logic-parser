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
          left: '{body.code}',
          operator: 'INCLUDES',
          right: '91'
        },
        {
          type: 'logic',
          operator: 'AND'
        },
        {
          type: 'expr',
          left: '{body.Present-in-office}',
          operator: 'EQ',
          right: 'true'
        }
      ]
    } as any

    const data = {
      body: {
        Home: 'Lucknow',
        State: 'UP',
        code: '+91',
        Phone1: 7011396497,
        Phone2: 9560586555,
        Position: 'CEO',
        'Present-in-office': true,
        time: '2023-11-23T07:23:13.244Z',
        final: 'search?q=eugenie+bouchard&sca_esv=586549689&rlz=1C1CHBF_enIN1037IN1037&ei=tTJoZf2fEoDc2roP74yJ8AU&gs_ssp=eJzj4tLP1TdIKTa1yCsxYPQSSC1NT83LTFVIyi9NzkgsSgEAkJMKCw&oq=eugine&gs_lp=Egxnd3Mtd2l6LXNlcnAiBmV1Z2luZSoCCAIyBRAAGIAEMgcQABiABBgKMgcQLhiABBgKMg0QLhiABBjHARivARgKMgcQABiABBgKMgcQLhiABBgKMgcQLhiABBgKMgcQABiABBgKMgcQLhiABBgKMg0QLhiABBjHARjRAxgKMhYQLhiABBgKGJcFGNwEGN4EGN8E2AEDSOQvUMMFWKwecAJ4AZABBJgBxwKgAf8TqgEHMC4yLjguMbgBAcgBAPgBAagCFMICChAAGEcY1gQYsAPCAg0QABiABBiKBRiwAxhDwgIREAAYgAQYigUYkQIYsQMYgwHCAgsQABiABBiKBRiRAsICDhAAGIAEGIoFGJECGLEDwgIIEAAYgAQYsQPCAgsQABiABBixAxiDAcICExAAGIAEGIoFGOoCGLQCGEPYAQHCAhYQABgDGI8BGOUCGOoCGLQCGIwD2AECwgIWEC4YAxiPARjlAhjqAhi0AhiMA9gBAsICDhAAGIAEGIoFGLEDGIMBwgIFEC4YgATCAhAQABiABBiKBRixAxiDARhDwgIKEAAYgAQYigUYQ8ICEBAuGIAEGIoFGLEDGIMBGEPCAhAQLhiABBiKBRjHARjRAxhDwgINEAAYgAQYigUYsQMYQ8ICEBAuGIAEGIoFGLEDGNQCGEPCAg0QLhiABBiKBRixAxhDwgIKEC4YgAQYigUYQ8ICHxAuGIAEGIoFGLEDGNQCGEMYlwUY3AQY3gQY4ATYAQPCAgsQLhivARjHARiABMICGhAuGK8BGMcBGIAEGJcFGNwEGN4EGOAE2AED4gMEGAAgQYgGAZAGCroGBAgBGAe6BgYIAhABGAq6BgYIAxABGBQ&sclient=gws-wiz-serp',
        media_url: 'https://cdn.pixabay.com/photo/2015/12/11/09/30/mobile-phone-1087845_1280.jpg'
      }
    }

    const logicParser = new LogicParser({
      resultWhenEmpty: false,
      returnFalseWhenError: true
    })

    const result = logicParser.parse(logicGroup, data)
    expect(result).toBe(true)
  })
})
