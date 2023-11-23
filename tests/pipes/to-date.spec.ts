import ToDatePipe from '../../src/pipes/to-date'

describe('Date Pipe', () => {
  it('should parse a date with a format', () => {
    const pipe = new ToDatePipe()
    const result = pipe.transform('10-25-2023', 'MM-dd-yyyy')
    expect(result.toISOString()).toBe('2023-10-24T18:30:00.000Z')
  })

  it('should parse a date and time with a format', () => {
    const pipe = new ToDatePipe()
    const result = pipe.transform('Oct 25, 2023 02:30:00 PM', 'MMM dd, yyyy hh:mm:ss a')
    expect(result.toISOString()).toBe('2023-10-25T09:00:00.000Z')
  })

  it('should parse a date with iso format', () => {
    const pipe = new ToDatePipe()
    const result = pipe.transform('2023-10-25T02:30:00.000Z', 'ISO')
    expect(result.toISOString()).toBe('2023-10-25T02:30:00.000Z')
  })

  it('should parse a date with epoch seconds format', () => {
    const pipe = new ToDatePipe()
    const result = pipe.transform('1672530600', 'EPOCH_SECONDS')
    expect(result.toISOString()).toBe('2022-12-31T23:50:00.000Z')
  })

  it('should parse a date with epoch milliseconds format', () => {
    const pipe = new ToDatePipe()
    const result = pipe.transform('1672530600000', 'EPOCH_MILLISECONDS')
    expect(result.toISOString()).toBe('2022-12-31T23:50:00.000Z')
  })
})
