import ToBooleanPipe from '../../src/pipes/to-boolean'

describe('ToBoolean Pipe', () => {
  let toBoolean: ToBooleanPipe

  beforeEach(() => {
    toBoolean = new ToBooleanPipe()
  })

  it('should return the value if it is a boolean', () => {
    expect(toBoolean.transform(true, '')).toBe(true)
    expect(toBoolean.transform(false, '')).toBe(false)
  })

  it('should return true if the value is a non-empty string', () => {
    expect(toBoolean.transform('test', '')).toBe(true)
    expect(toBoolean.transform('0', '')).toBe(true)
  })

  it('should return false if the value is an empty string', () => {
    expect(toBoolean.transform('', '')).toBe(false)
    expect(toBoolean.transform('   ', '')).toBe(false)
  })

  it('should return false if the value is null or undefined', () => {
    expect(toBoolean.transform(null, '')).toBe(false)
    expect(toBoolean.transform(undefined, '')).toBe(false)
  })

  it('should return false if the value is a number', () => {
    expect(toBoolean.transform(0, '')).toBe(false)
    expect(toBoolean.transform(1, '')).toBe(true)
  })

  it('should return false if the value is an object', () => {
    expect(toBoolean.transform({}, '')).toBe(false)
    expect(toBoolean.transform([], '')).toBe(false)
  })
})
