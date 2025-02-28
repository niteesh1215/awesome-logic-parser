import FallbackValue from '../../src/pipes/fallback'

describe('FallbackValue Pipe', () => {
  let fallback: FallbackValue

  beforeEach(() => {
    fallback = new FallbackValue()
  })

  test('should return the value if it is not null or undefined', () => {
    expect(fallback.transform('test', 'default')).toBe('test')
  })

  test('should return the formatStr if the value is null', () => {
    expect(fallback.transform(null, 'default')).toBe('default')
  })

  test('should return the formatStr if the value is undefined', () => {
    expect(fallback.transform(undefined, 'default')).toBe('default')
  })

  test('should trim the formatStr before using it', () => {
    expect(fallback.transform(null, '  default  ')).toBe('default')
  })

  test('should return the value if it is an empty string', () => {
    expect(fallback.transform('', 'default')).toBe('')
  })
})
