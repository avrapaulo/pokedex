import { atom } from 'recoil'

export const selectedTypes = atom({
  key: 'selectedTypes',
  default: []
})

export const inputName = atom({
  key: 'inputName',
  default: ''
})

export const isLastPokemon = atom({
  key: 'isLastPokemon',
  default: false
})

export const displayFilters = atom({
  key: 'displayFilters',
  default: false
})
