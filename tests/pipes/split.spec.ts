import SplitPipe from '../../src/pipes/split'

describe('SplitPipe', () => {
  let split: SplitPipe

  beforeEach(() => {
    split = new SplitPipe()
  })

  it('should return the value if it is an array', () => {
    expect(split.transform(['a', 'b', 'c'], ',')).toEqual(['a', 'b', 'c'])
  })

  it('should return the value if it is a string', () => {
    expect(split.transform('a,b,c', ',')).toEqual(['a', 'b', 'c'])
  })

  it('should return an empty array if the value is null', () => {
    expect(split.transform(null, ',')).toEqual([])
  })

  it('should return an empty array if the value is undefined', () => {
    expect(split.transform(undefined, ',')).toEqual([])
  })

  it('should return an empty array if the value is an empty string', () => {
    expect(split.transform('', ',')).toEqual([])
  })

  it('should return an empty array if the value is an array with a single empty string', () => {
    expect(split.transform([''], ',')).toEqual([''])
  })

  it('should return an array with a single element if the value is a string with a single element', () => {
    expect(split.transform('a', ',')).toEqual(['a'])
  })

  it('should return an array with a single element if the value is an array with a single element', () => {
    expect(split.transform(['a'], ',')).toEqual(['a'])
  })

  it('should return an array with a single element if the value is an array with a single element and the delimiter is not present', () => {
    expect(split.transform(['a'], '|')).toEqual(['a'])
  })

  it('should return an array with multiple elements if the value is a string with multiple elements', () => {
    expect(split.transform('a,b,c', ',')).toEqual(['a', 'b', 'c'])
  })

  it('should return an array with multiple elements if the value is an array with multiple elements', () => {
    expect(split.transform(['a', 'b', 'c'], ',')).toEqual(['a', 'b', 'c'])
  })

  it('should return an array with multiple elements if the value is a string with multiple elements and the delimiter is present', () => {
    expect(split.transform('a,b,c', ',')).toEqual(['a', 'b', 'c'])
  })

  it('should return an array with a single element if the value is a string with a single element', () => {
    expect(split.transform(123, ',')).toEqual(['123'])
  })
})
