import Image from 'next/image'
import { DEFAULT_LIMIT, POKE_TYPES } from 'constant'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { inputName, isLastPokemon, selectedTypes } from 'lib/recoil'
import { PokeFetchVariables } from 'utils'

export const Filters = ({ fetchMore }: { fetchMore: any }) => {
  const [pokeTypes, setPokeTypes] = useRecoilState<string[]>(selectedTypes)
  const [pokeName, setPokeName] = useRecoilState<string>(inputName)
  const setLastItem = useSetRecoilState(isLastPokemon)

  const fetchPoke = ({ types, name }: { types: string[]; name: string }) => {
    fetchMore({
      variables: PokeFetchVariables({
        types,
        pokeName: name
      }),
      updateQuery: (_, { fetchMoreResult: { pokemon } }) => {
        setLastItem(pokemon.length < DEFAULT_LIMIT)
        return Object.assign({}, { pokemon })
      }
    })
  }

  return (
    <>
      <div className="flex justify-between">
        {Object.values(POKE_TYPES).map(({ name, image }) => (
          <div
            key={name}
            className={`${pokeTypes.some(type => type === name) ? 'ring-4' : ''} h-9 rounded-2xl`}
          >
            <Image
              className="cursor-pointer"
              width="36"
              height="36"
              alt={name}
              src={image}
              onClick={() => {
                let _types: string[]
                if (pokeTypes.some(type => type === name)) {
                  _types = pokeTypes.filter(type => type !== name)
                } else {
                  _types = [...pokeTypes, name]
                }

                setPokeTypes(_types)
                fetchPoke({ types: _types, name: pokeName })
              }}
            />
          </div>
        ))}
      </div>
      <div>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            className="focus:ring-black focus:border-black block w-full pl-1 sm:text-sm border-gray-300 rounded-md"
            type="text"
            name="name"
            id="name"
            placeholder="Type pokemon name..."
            onChange={e => {
              setPokeName(e.currentTarget.value)
              fetchPoke({ types: pokeTypes, name: e.currentTarget.value })
            }}
          />
        </div>
      </div>
    </>
  )
}
