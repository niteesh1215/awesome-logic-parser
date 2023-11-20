
export interface IPipe {
  name: string
  input: string
}
export interface IVariable {
  key: string
  pipes: IPipe[]
}
