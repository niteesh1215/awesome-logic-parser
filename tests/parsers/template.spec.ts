/* eslint-disable no-template-curly-in-string */
import { TemplateParser } from '../../src'

describe('Multi variable Parser', () => {
  it('should parse a multi variable', () => {
    const parser = new TemplateParser()
    const result = parser.parse('{name} is {age} years old', { name: 'John', age: 25 })
    expect(result).toBe('John is 25 years old')
  })

  it('should parse a multi variable with a date pipe', () => {
    const parser = new TemplateParser()
    const result = parser.parse<Date>('{name} is {age | toDate:MM-dd-yyyy} years old', { name: 'John', age: '10-25-2023' })
    expect(result).toBe('John is Wed Oct 25 2023 00:00:00 GMT+0530 (India Standard Time) years old')
  })

  it('should parse a multi variable with a date and time pipe', () => {
    const parser = new TemplateParser()
    const result = parser.parse<Date>('{name} is {age | toDate:MMM dd, yyyy hh:mm:ss a} years old', { name: 'John', age: 'Oct 25, 2023 02:30:00 PM' })
    expect(result).toBe('John is Wed Oct 25 2023 14:30:00 GMT+0530 (India Standard Time) years old')
  })

  it('should parse a multi variable with a date and time pipe with a strigifier', () => {
    const parser = new TemplateParser({
      stringifier: (value: Date) => {
        if (value instanceof Date) {
          return value.toISOString()
        }
        return value
      }
    })
    const result = parser.parse<Date>('{name} is {age | toDate:MMM dd, yyyy hh:mm:ss a} years old', { name: 'John', age: 'Oct 25, 2023 02:30:00 PM' })
    expect(result).toBe('John is 2023-10-25T09:00:00.000Z years old')
  })

  it('should parse a multi variable with a date and time pipe with a strigifier and match', () => {
    const parser = new TemplateParser({
      stringifier: (value: Date, match) => {
        if (value instanceof Date) {
          return value.toISOString()
        }
        return value || match
      }
    })
    const result = parser.parse<Date>('{name} is {age} {name} years old', { name: 'John' })
    expect(result).toBe('John is {age} John years old')
  })

  it('should handle array of objects of array of objects', () => {
    const parser = new TemplateParser()
    const result = parser.parse('{name.$.name.$.key}', { name: [{ name: { key: 'John' } }, { name: { key: 'Jane' } }] })
    expect(result).toBe('John')
  })

  it('should handle array of objects of array of objects with a date pipe', () => {
    const parser = new TemplateParser()
    const result = parser.parse<any[]>('{name.$.name.$.key}', { name: [{ name: { key: ['John'] } }, { name: { key: ['Jane'] } }] })
    expect(result).toBe('John')
  })

  it('it should extract variables', () => {
    const parser = new TemplateParser()
    const result = parser.getVariables('{name} {dob | toDate:MM-dd-yyyy | toDate:MMM dd, yyyy hh:mm:ss a}')
    expect(result).toEqual([{ key: 'name', pipes: [] }, { key: 'dob', pipes: [{ name: 'toDate', input: 'MM-dd-yyyy' }, { name: 'toDate', input: 'MMM dd, yyyy hh:mm:ss a' }] }])
  })
})
