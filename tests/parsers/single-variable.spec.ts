/* eslint-disable no-template-curly-in-string */

import { SingleVariableParser } from '../../src'
describe('Single variable Parser', () => {
  it('should parse a single variable', () => {
    const parser = new SingleVariableParser()
    const result = parser.parse('${name}', { name: 'John' })
    expect(result).toBe('John')
  })

  it('should parse a single variable with a date pipe', () => {
    const parser = new SingleVariableParser()
    const result = parser.parse<Date>('${name | toDate:MM-dd-yyyy}', { name: '10-25-2023' })
    expect(result.toISOString()).toBe('2023-10-24T18:30:00.000Z')
  })

  it('should parse a single variable with a date and time pipe', () => {
    const parser = new SingleVariableParser()
    const result = parser.parse<Date>('${name | toDate:MMM dd, yyyy hh:mm:ss a}', { name: 'Oct 25, 2023 02:30:00 PM' })
    expect(result.toISOString()).toBe('2023-10-25T09:00:00.000Z')
  })

  it('should handle array of objects of array of objects', () => {
    const parser = new SingleVariableParser()
    const result = parser.parse('${name.$.name.$.key}', { name: [{ name: { key: 'John' } }, { name: { key: 'Jane' } }] })
    expect(result.join(',')).toBe(['John', 'Jane'].join(','))
  })

  it('should handle array of objects of array of objects with a date pipe', () => {
    const parser = new SingleVariableParser()
    const result = parser.parse<any[]>('${name.$.name.$.key}', { name: [{ name: { key: ['John'] } }, { name: { key: ['Jane'] } }] })
    const toCheck = result.reduce((acc, curr) => acc.concat(curr), []).join(',')
    expect(toCheck).toBe(['John', 'Jane'].join(','))
  })

  it('should return first value for subarray field', () => {
    const parser = new SingleVariableParser({ returnFirstValueForArraySubField: true })
    const result = parser.parse<any[]>('${name.$.name.$.key}', { name: [{ name: { key: ['John'] } }, { name: { key: ['Jane'] } }] })
    expect(result[0]).toBe('John')
  })
})
