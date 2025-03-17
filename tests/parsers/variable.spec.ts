/* eslint-disable no-template-curly-in-string */

import { VariableParser } from '../../src'
describe('Single variable Parser', () => {
  it('should parse a single variable', () => {
    const parser = new VariableParser()
    const result = parser.parse('{name}', { name: 'John' })
    expect(result).toBe('John')
  })

  it('should parse a single variable with a date pipe', () => {
    const parser = new VariableParser()
    const result = parser.parse<Date>('{name | toDate:MM-dd-yyyy}', { name: '10-25-2023' })
    expect(result.toISOString()).toBe('2023-10-24T18:30:00.000Z')
  })

  it('should parse a single variable with a date and time pipe', () => {
    const parser = new VariableParser()
    const result = parser.parse<Date>('{name | toDate:MMM dd, yyyy hh:mm:ss a}', { name: 'Oct 25, 2023 02:30:00 PM' })
    expect(result.toISOString()).toBe('2023-10-25T09:00:00.000Z')
  })

  it('should handle array of objects of array of objects', () => {
    const parser = new VariableParser()
    const result = parser.parse('{name.$.name.$.key}', { name: [{ name: { key: 'John' } }, { name: { key: 'Jane' } }] })
    expect(result.join(',')).toBe(['John', 'Jane'].join(','))
  })

  it('should handle array of objects of array of objects with a date pipe', () => {
    const parser = new VariableParser()
    const result = parser.parse<any[]>('{name.$.name.$.key}', { name: [{ name: { key: ['John'] } }, { name: { key: ['Jane'] } }] })
    const toCheck = result.reduce((acc, curr) => acc.concat(curr), []).join(',')
    expect(toCheck).toBe(['John', 'Jane'].join(','))
  })

  it('should return first value for subarray field', () => {
    const parser = new VariableParser({ returnFirstValueForArraySubField: true })
    const result = parser.parse<any[]>('{name.$.name.$.key}', { name: [{ name: { key: ['John'] } }, { name: { key: ['Jane'] } }] })
    expect(result[0]).toBe('John')
  })

  it('should return variable', () => {
    const parser = new VariableParser()
    const result = parser.getVariable('{name}')
    expect(result).toEqual({ key: 'name', pipes: [] })

    const result2 = parser.getVariable('{name | toDate:MM-dd-yyyy}')
    expect(result2).toEqual({ key: 'name', pipes: [{ name: 'toDate', input: 'MM-dd-yyyy' }] })
  })

  it('should parse a iso date pipe', () => {
    const parser = new VariableParser()
    const result = parser.parse<Date>('{date | toDate:ISO}', { date: '2023-10-25T02:30:00.000Z' })
    expect(result.toISOString()).toBe('2023-10-25T02:30:00.000Z')
  })

  it('should parse a epoch seconds date pipe', () => {
    const parser = new VariableParser()
    const result = parser.parse<Date>('{date | toDate:EPOCH_SECONDS}', { date: '1672530600' })
    expect(result.toISOString()).toBe('2022-12-31T23:50:00.000Z')
  })

  it('should parse a epoch milliseconds date pipe', () => {
    const parser = new VariableParser()
    const result = parser.parse<Date>('{date | toDate:EPOCH_MILLISECONDS}', { date: '1672530600000' })
    expect(result.toISOString()).toBe('2022-12-31T23:50:00.000Z')
  })

  it('should parse a single variable with a fallback pipe', () => {
    const parser = new VariableParser()
    const result = parser.parse('{name | fallbackValue:\'Unknown\'}', { name: undefined })
    expect(result).toBe('Unknown')
  })

  it('should parse a single variable with a fallback pipe when value is null', () => {
    const parser = new VariableParser()
    const result = parser.parse('{name | fallbackValue:\'Niteesh\'}', { name: null })
    expect(result).toBe('Niteesh')
  })

  it('should parse a single variable with a fallback pipe when value is empty string', () => {
    const parser = new VariableParser()
    const result = parser.parse('{name | fallbackValue:\'Unknown\'}', { name: '' })
    expect(result).toBe('')
  })

  it('should parse a single variable with a fallback pipe when value is present', () => {
    const parser = new VariableParser()
    const result = parser.parse('{name | fallbackValue:\'Unknown\'}', { name: 'John' })
    expect(result).toBe('John')
  })

  it('should parse a single variable with multiple pipes including fallback', () => {
    const parser = new VariableParser()
    const result = parser.parse<Date>('{name | toDate:MM-dd-yyyy | fallbackValue:\'Unknown\'}', { name: '10-25-2023' })
    expect(result.toISOString()).toBe('2023-10-24T18:30:00.000Z')
  })

  it('should parse a single variable with a type casting pipe to number', () => {
    const parser = new VariableParser()
    const result = parser.parse<number>('{name | toNumber}', { name: '123' })
    expect(result).toBe(123)
  })

  it('should parse a single variable with a type casting pipe to boolean', () => {
    const parser = new VariableParser()
    const result = parser.parse<boolean>('{name | toBoolean}', { name: 'true' })
    expect(result).toBe(true)
  })

  it('should parse a single variable with a type casting pipe to string', () => {
    const parser = new VariableParser()
    const result = parser.parse<string>('{name | toString}', { name: 123 })
    expect(result).toBe('123')
  })

  it('should parse a single variable with a type casting pipe to array', () => {
    const parser = new VariableParser()
    const result = parser.parse<string[]>('{name | split:\',\'}', { name: '123,456' })
    expect(result).toEqual(['123', '456'])
  })
})
