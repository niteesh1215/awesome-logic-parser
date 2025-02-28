import { Pipe } from './pipe'

export default class FallbackValue extends Pipe {
  transform (value: unknown, formatStr: string): unknown {
    formatStr = formatStr.trim()
    return value ?? formatStr
  }
}
