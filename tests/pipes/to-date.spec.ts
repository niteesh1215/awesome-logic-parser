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
})
