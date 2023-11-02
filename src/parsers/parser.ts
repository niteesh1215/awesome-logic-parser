export default abstract class Parser {
  abstract parse<T = any>(parsable: any, data: object): T
}
