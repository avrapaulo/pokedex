import { DEFAULT_LIMIT } from 'constant'

export const PokeFetchVariables = ({
  limit = DEFAULT_LIMIT,
  offset = 0,
  pokeName = '',
  types
}: {
  limit?: number
  offset?: number
  pokeName?: string
  types?: string[]
}):
  | {
      limit: number
      offset: number
      pokeName: string
      types: string[]
    }
  | {
      limit: number
      offset: number
      pokeName: string
    } =>
  types.length > 0
    ? {
        limit,
        offset,
        types,
        pokeName
      }
    : {
        limit,
        offset,
        pokeName
      }
