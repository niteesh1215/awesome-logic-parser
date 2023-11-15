/* eslint-disable no-template-curly-in-string */
import { MultipleVariableParser } from '../../src'

describe('Multi variable Parser', () => {
  it('should parse a multi variable', () => {
    const parser = new MultipleVariableParser()
    const result = parser.parse('{name} is {age} years old', { name: 'John', age: 25 })
    expect(result).toBe('John is 25 years old')
  })

  it('should parse a multi variable with a date pipe', () => {
    const parser = new MultipleVariableParser()
    const result = parser.parse<Date>('{name} is {age | toDate:MM-dd-yyyy} years old', { name: 'John', age: '10-25-2023' })
    expect(result).toBe('John is Wed Oct 25 2023 00:00:00 GMT+0530 (India Standard Time) years old')
  })

  it('should parse a multi variable with a date and time pipe', () => {
    const parser = new MultipleVariableParser()
    const result = parser.parse<Date>('{name} is {age | toDate:MMM dd, yyyy hh:mm:ss a} years old', { name: 'John', age: 'Oct 25, 2023 02:30:00 PM' })
    expect(result).toBe('John is Wed Oct 25 2023 14:30:00 GMT+0530 (India Standard Time) years old')
  })

  it('should handle array of objects of array of objects', () => {
    const parser = new MultipleVariableParser()
    const result = parser.parse('{name.$.name.$.key}', { name: [{ name: { key: 'John' } }, { name: { key: 'Jane' } }] })
    expect(result).toBe('John')
  })

  it('should handle array of objects of array of objects with a date pipe', () => {
    const parser = new MultipleVariableParser()
    const result = parser.parse<any[]>('{name.$.name.$.key}', { name: [{ name: { key: ['John'] } }, { name: { key: ['Jane'] } }] })
    expect(result).toBe('John')
  })

  it('should return true', () => {
    const parser = new MultipleVariableParser()
    const result = parser.parse<boolean>('{name} is {age} years old', { name: 'John', age: 25 })
    expect(result).toBe(true)
  })
})