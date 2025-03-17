import ToStringPipe from '../../src/pipes/to-string'

describe('ToStringPipe', () => {
  it('should return empty string for null', () => {
    expect(new ToStringPipe().transform(null, '')).toBe('')
  })

  it('should return empty string for undefined', () => {
    expect(new ToStringPipe().transform(undefined, '')).toBe('')
  })

  it('should return the value as string for a string', () => {
    expect(new ToStringPipe().transform('test', '')).toBe('test')
  })

  it('should return the value as string for a number', () => {
    expect(new ToStringPipe().transform(1, '')).toBe('1')
  })

  it('should return the value as string for a boolean', () => {
    expect(new ToStringPipe().transform(true, '')).toBe('true')
  })

  it('should return the value as string for an object', () => {
    expect(new ToStringPipe().transform({}, '')).toBe('[object Object]')
  })

  it('should return the value as string for an array', () => {
    expect(new ToStringPipe().transform([], '')).toBe('')
  })

  it('should return the value as string for a symbol', () => {
    expect(new ToStringPipe().transform(Symbol('test'), '')).toBe('Symbol(test)')
  })
})
