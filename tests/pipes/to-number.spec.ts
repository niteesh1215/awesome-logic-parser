import ToNumberPipe from '../../src/pipes/to-number'

describe('ToNumber Pipe', () => {
  let toNumber: ToNumberPipe

  beforeEach(() => {
    toNumber = new ToNumberPipe()
  })

  it('should return the value if it is a number', () => {
    expect(toNumber.transform(1, '')).toBe(1)
  })

  it('should return the value if it is a string number', () => {
    expect(toNumber.transform('1', '')).toBe(1)
  })

  it('should throw an error if the value is not a number', () => {
    expect(() => toNumber.transform('not a number', '')).toThrowError('Not a valid number')
  })

})
