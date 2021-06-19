import Image from 'next/image'
import { POKE_TYPES } from 'constant'
import { atom, useRecoilState } from 'recoil'
import { PokeFetchVariables } from 'utils/poke-fetch-helper'

export const selectedTypes = atom({
  key: 'selectedTypes',
  default: []
})

export const Filters = ({ fetchMore }: { fetchMore: any }) => {
  const [filters, setFilters] = useRecoilState(selectedTypes)

  return (
    <div className="flex justify-between">
      {Object.values(POKE_TYPES).map(({ name, image }) => (
        <div
          key={name}
          className={`${filters.some(type => type === name) ? 'ring-4' : ''} h-9 rounded-2xl`}
        >
          <Image
            className="cursor-pointer"
            width="36"
            height="36"
            alt={name}
            src={image}
            onClick={() => {
              let _filters: string[]
              if (filters.some(type => type === name)) {
                _filters = filters.filter(type => type !== name)
              } else {
                _filters = [...filters, name]
              }
              setFilters(_filters)

              fetchMore({
                variables: PokeFetchVariables({
                  types: _filters
                }),
                updateQuery: (_, { fetchMoreResult }) => {
                  if (!fetchMoreResult) {
                    return []
                  }
                  return Object.assign(
                    {},
                    {
                      pokemon: fetchMoreResult.pokemon
                    }
                  )
                }
              })
            }}
          />
        </div>
      ))}
    </div>
  )
}
