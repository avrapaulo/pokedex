import { Type } from './type'

export interface Pokemon {
  pokemon: {
    id: number
    name: string
    specy: { color: { name: string } }
    types: Type[]
  }[]
}
