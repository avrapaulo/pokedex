import { DEFAULT_LIMIT } from 'constant'

export const PokeFetchVariables = ({
  limit = DEFAULT_LIMIT,
  offset = 0,
  types
}: {
  limit?: number
  offset?: number
  types?: string[]
}):
  | {
      limit: number
      offset: number
      types: string[]
    }
  | {
      limit: number
      offset: number
    } =>
  types.length > 0
    ? {
        limit,
        offset,
        types
      }
    : {
        limit,
        offset
      }
