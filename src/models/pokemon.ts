import { IType } from './type'

export interface IPokemon {
  id: number
  name: string
  image: string
  color: string
  types: IType[]
}
